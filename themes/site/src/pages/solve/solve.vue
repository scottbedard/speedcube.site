<template>
    <v-page padded>
        <v-margin padded>
            <!-- keyboard controller -->
            <v-puzzle-controller
                v-if="!keyboard"
                :config="keyboardConfig"
                @turn="queueTurn"
            />

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
                            @turn="queueTurn"
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
                            <div v-else-if="!scrambling" key="idle">
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
import puzzleControllerComponent from '@/components/puzzle/controller/controller.vue';
import { componentRafEase } from '@/app/utils/component';
import { componentTimeout } from 'spyfu-vue-utils';
import { get } from 'lodash-es';
import { isCube } from '@/app/utils/puzzle';
import { linear, puzzles } from '@/app/constants';
import { mapGetters, mapState } from 'vuex';
import { postCreateScramble } from '@/app/repositories/scrambles';

export default {
    created() {
        this.refreshModel();
    },
    data() {
        return {
            // applied guest config
            appliedConfig: null,

            // current turn applied to the puzzle
            currentTurn: '',

            // inspection phase of the solve
            inspecting: false,

            // model to represent the state of the puzzle
            model: null,

            // visual config being previewed
            previewConfig: null,

            // determines if the puzzle's scrambling state is visible
            scrambling: false,

            // set to true when turning
            turning: false,

            // current turn progress
            turnProgress: 0,

            // turns waiting to be executed
            turnQueue: [],
        };
    },
    components: {
        'v-appearance': () => import('./appearance/appearance.vue'),
        'v-keyboard': () => import('./keyboard/keyboard.vue'),
        'v-puzzle': puzzleComponent,
        'v-puzzle-controller': puzzleControllerComponent,
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

            let turnDuration = defaultConfig.turnDuration;

            if (this.previewConfig && this.previewConfig.turnDuration) {
                turnDuration = this.previewConfig.turnDuration;
            } else if (this.activeConfig && this.activeConfig.turnDuration) {
                turnDuration = this.activeConfig.turnDuration;
            }

            return {
                ...defaultConfig,
                ...(this.activeConfig || {}),
                ...(this.previewConfig || {}),
                turnDuration,
            }
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
            this.currentTurn = turn;
            this.turnProgress = 0;
            this.turning = true;

            return new Promise(resolve => {
                componentRafEase(this, (progress) => {
                    this.turnProgress = progress;

                    if (progress === 1) {
                        this.$nextTick(() => {
                            this.model.turn(turn);
                            this.turnProgress = 0;
                            this.turning = false;
                            
                            this.$nextTick(resolve);
                        });
                    }
                }, this.config.turnDuration);
            });
        },
        queueTurn(turn) {
            this.turnQueue.push(turn);
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
            this.reset();

            this.scrambling = true;

            // fetch and apple our scrambled state
            let loading = true;

            const xhr = postCreateScramble(this.puzzle).then(({ data }) => {
                this.applyState(data.scrambledState);
            });

            // this sets the min time our animation will run
            const delay = new Promise(res => componentTimeout(this, res, 2000));

            // set loading to false when xhr and delay are done
            Promise.all([xhr, delay]).then(() => { loading = false });

            // simulate the puzzle being scrambled. this will have
            // to be refactored to be puzzle-agnostic once shape
            // changers like square-1 are implemented.
            const pseudoScramble = new Promise((resolve) => {
                let scramble = this.model.generateScrambleString(50).split(' ');

                const turnDuration = this.config.turnDuration;
                
                const turn = () => {
                    this.currentTurn = scramble.shift().replace(/2$/, '');

                    scramble = scramble.concat(this.currentTurn);

                    this.executeTurn(this.currentTurn).then(() => {
                        if (loading) {
                            turn();
                        } else {
                            resolve();
                        }
                    });
                };

                turn();
            });

            // when everything is complete. move on to inspection phase
            Promise.all([xhr, pseudoScramble]).then(() => {
                this.scrambling = false;
                this.inspecting = true;
            });
        },
        setPreviewConfig(config) {
            this.previewConfig = config;
        },
    },
    watch: {
        puzzle: 'refreshModel',
        turnQueue(queue) {
            // advance ot the next turn if there is one
            const nextTurn = queue.slice(0, 1).pop();

            if (nextTurn && !this.turning) {
                this.executeTurn(nextTurn).then(() => {
                    this.turnQueue.shift();
                });
            }
        },
    },
};
</script>
