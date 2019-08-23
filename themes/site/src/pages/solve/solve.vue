<template>
    <v-page padded>
        <v-margin padded>
            <!-- puzzle -->
            <div v-if="model !== null" class="max-w-xs mb-8 mx-auto">
                <div
                    class="border-2 border-dashed trans-border pb-full relative rounded"
                    :class="{
                        'border-transparent': edit !== 'appearance',
                        'border-grey-2': edit === 'appearance'
                    }">
                    <v-puzzle
                        :config="config"
                        :current-turn="currentTurn"
                        :masked="scrambling"
                        :model="model"
                        :turn-progress="turnProgress"
                        :type="puzzle"
                    />
                </div>
            </div>

            <!-- content -->
            <div class="flex justify-center">
                <v-fade-transition>

                    <!-- appearance -->
                    <div
                        v-if="appearance"
                        data-appearance
                        class="max-w-4xl w-full"
                        key="appearance">
                        <v-appearance
                            :initial-config="config"
                            @apply="applyConfig"
                            @clear="clearPreviewConfig"
                            @set="setPreviewConfig"
                        />
                    </div>

                    <!-- keyboard -->
                    <div
                        v-else-if="keyboard"
                        class="w-full"
                        data-keyboard
                        key="keyboard">
                        <v-keyboard
                            :initial-config="keyboardConfig"
                        />
                    </div>

                    <!-- default -->
                    <div
                        v-else
                        class="text-center"
                        data-default
                        key="default">
                        <v-fade-transition>
                            <!-- inspecting -->
                            <div v-if="inspecting" key="inspecting">
                                Inspecting!
                            </div>

                            <!-- idle -->
                            <div v-else key="idle">
                                <div class="mb-6">
                                    <v-button primary @click="scramble">Scramble</v-button>
                                </div>
                                <div>
                                    <v-button
                                        class="mx-3"
                                        icon="fa-sliders"
                                        ghost
                                        title="Click to customize appearance"
                                        :to="{ query: { edit: 'appearance' }}">
                                        Customize Puzzle
                                    </v-button>
                                    <v-button
                                        class="mx-3"
                                        icon="fa-code"
                                        ghost
                                        title="Click to edit key bindings"
                                        :to="{ query: { edit: 'keyboard' }}">
                                        Edit Key Bindings
                                    </v-button>
                                </div>
                            </div>
                        </v-fade-transition>
                    </div>
                </v-fade-transition>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import Cube from 'bedard-cube';
import puzzleComponent from '@/components/puzzle/puzzle.vue';
import { componentTimeout } from 'spyfu-vue-utils';
import { get } from 'lodash-es';
import { isCube } from '@/app/utils/puzzle';
import { mapGetters, mapState } from 'vuex';
import { postCreateScramble } from '@/app/repositories/scrambles';
import { linear, puzzles } from '@/app/constants';
import { rafEase } from '@/app/utils/function';
// import { postSolve } from '@/app/repositories/solves';

export default {
    created() {
        this.refreshModel();
    },
    data() {
        return {
            // applied guest config
            appliedConfig: null,

            // current turn applied to the puzzle
            currentTurn: 'F',

            // inspection phase of the solve
            inspecting: false,

            // model to represent the state of the puzzle
            model: null,

            // visual config being previewed
            previewConfig: null,

            // determines if the puzzle's scrambling state is visible
            scrambling: false,

            // current turn progress
            turnProgress: 0,
        };
    },
    components: {
        'v-appearance': () => import('./appearance/appearance.vue'),
        'v-keyboard': () => import('./keyboard/keyboard.vue'),
        'v-puzzle': puzzleComponent,
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
        ...mapState('user', [
            'user',
        ]),
        activeConfig() {
            // return the users config for this puzzle
            let activeConfig = {};

            if (this.isAuthenticated) {
                const userConfig = this.user.configs.find(obj => obj.puzzle === this.puzzle);

                if (userConfig) {
                    /* eslint-disable-next-line no-empty */
                    try { activeConfig = JSON.parse(userConfig.config) } catch (e) {}
                }
            }

            return activeConfig;
        },
        appearance() {
            // determine if the appearance editor should be visible
            return this.edit === 'appearance';
        },
        config() {
            // fully normalized config being fed into the puzzle
            const defaultConfig = get(puzzles, `${this.puzzle}.defaultConfig`, {});
            const scrambleSpeed = 100;

            if (this.previewConfig) {
                return { 
                    ...defaultConfig, 
                    ...this.previewConfig,
                    turnDuration: this.scrambling ? scrambleSpeed : (this.previewConfig.turnDuration || defaultConfig.turnDuration)
                };
            }

            if (this.appliedConfig) {
                return { 
                    ...defaultConfig, 
                    ...this.appliedConfig,
                    turnDuration: this.scrambling ? scrambleSpeed : (this.appliedConfig.turnDuration || defaultConfig.turnDuration)
                };
            }

            return { 
                    ...defaultConfig, 
                    ...this.activeConfig,
                    turnDuration: this.scrambling ? scrambleSpeed : (this.activeConfig.turnDuration || defaultConfig.turnDuration)
                };
        },
        edit() {
            // normalize the currently open tab
            return get(this.$route, 'query.edit', '').toLowerCase().trim();
        },
        isCube() {
            // determine if the puzzle is a standard NxN cube
            return isCube(this.puzzle);
        },
        keyboard() {
            // determine if keyboard editor is open
            return this.edit === 'keyboard';
        },
        keyboardConfig() {
            // get the user's keyboard config for this puzzle
            return this.$store.getters['user/keyboardConfigForPuzzle'](this.puzzle);
        },
        puzzle() {
            // parse and normalize the puzzle id from current route
            return get(this.$route, 'params.puzzle', 'unknown').trim().toLowerCase();
        },
    },
    methods: {
        applyConfig(config) {
            this.appliedConfig = config;
        },
        applyState(stateJson) {
            const state = JSON.parse(stateJson);

            if (this.isCube) {
                Object.keys(this.model.state).forEach((face) => {
                    this.model.state[face].forEach((sticker, index) => {
                        sticker.value = state[face][index];
                    });
                });
            }
        },
        clearPreviewConfig() {
            this.previewConfig = null;
        },
        executeTurn(turn) {
            // ...
        },
        randomTurn() {
            let turn = '';

            if (this.isCube) {
                do {
                    turn = this.model.generateScrambleString(1).replace(/2$/, '');
                } while (turn === this.currentTurn);
            }

            return turn;
        },
        refreshModel() {
            // cube
            if (this.isCube) {
                const size = parseInt(this.puzzle, 10);

                this.model = new Cube(size, { useObjects: true });
            }
            
            // redirect to 3x3 for unknown puzzles
            else {
                this.$router.replace({
                    name: 'solve',
                    params: { puzzle: '3x3' },
                });
            }
        },
        reset() {
            this.scrambling = false;
            this.inspecting = false;
        },
        scramble() {

            // scramble the puzzle and start a new solve
            this.reset();
            this.scrambling = true;
            let loading = true;

            const delay = new Promise(resolve => componentTimeout(this, resolve, 2000));

            const xhr = postCreateScramble(this.puzzle).then((response) => {
                // success
                this.applyState(response.data.scrambledState);
            });

            Promise.all([xhr, delay]).then(() => { loading = false });

            const pseudoScramble = new Promise((resolve) => {
                const turn = () => {
                    this.currentTurn = this.randomTurn();

                    rafEase((val) => {
                        this.turnProgress = val;

                        val === 1 && (loading ? turn() : resolve());
                    }, this.config.turnDuration);

                };

                turn();
            });

            Promise.all([xhr, pseudoScramble]).then(() => {
                console.log('hooray');
                this.scrambling = false;
            });
        },
        setPreviewConfig(config) {
            this.previewConfig = config;
        },
    },
    watch: {
        puzzle: 'refreshModel',
    },
};
</script>
