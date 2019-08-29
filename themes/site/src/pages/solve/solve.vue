<template>
    <v-page padded>
        <v-margin padded>
            <!-- modals -->
            <v-puzzles-modal
                v-if="puzzlesModalIsVisible"
                @close="hidePuzzlesModal"
            />

            <!-- keyboard controller -->
            <v-puzzle-controller
                v-if="!keyboard"
                :config="keyboardConfig"
                @space="onSpacebar"
                @turn="queueTurn"
                @escape="onEscape"
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
                        class="font-thin text-center text-grey-6 text-4xl"
                        data-default
                        key="default">
                        <v-fade-transition>
                            <!-- inspecting -->
                            <div v-if="inspecting" key="inspecting">
                                <v-countdown
                                    :from="inspectionDuration"
                                    :start-time="inspectionStartTime"
                                    @end="startSolve"
                                />
                            </div>

                            <!-- solving -->
                            <div v-else-if="solving || solved" key="solving">
                                <div class="mb-6">
                                    <v-stopwatch
                                        :start-time="solveStartTime"
                                        :stop-time="solveEndTime"
                                    />
                                </div>

                                <!-- solved -->
                                <v-fade-transition>
                                    <div v-if="solved" key="solved">
                                        <v-recent-solves
                                            :record-average="recordAverage"
                                            :solves="recentSolves"
                                        />
                                    </div>
                                </v-fade-transition>
                            </div>

                            <!-- dnf -->
                            <div v-else-if="dnf" key="dnf">
                                <div class="mb-6">DNF</div>
                                <v-recent-solves
                                    :record-average="recordAverage"
                                    :solves="recentSolves"
                                />
                            </div>

                            <!-- idle -->
                            <div v-else-if="!scrambling" key="idle">
                                <div class="mb-12">
                                    <v-button primary @click="scramble">Scramble</v-button>
                                </div>
                                <div>
                                    <v-button
                                        class="mx-4 my-2"
                                        icon="fa-sliders"
                                        ghost
                                        title="Click to customize appearance"
                                        :to="{ query: { edit: 'appearance' }}">
                                        Puzzle Settings
                                    </v-button>
                                    <v-button
                                        class="mx-4 my-2"
                                        icon="fa-code"
                                        ghost
                                        title="Click to edit key bindings"
                                        :to="{ query: { edit: 'keyboard' }}">
                                        Key Bindings
                                    </v-button>
                                    <v-button
                                        class="mx-4 my-2"
                                        icon="fa-cubes"
                                        ghost
                                        title="Click to change puzzles"
                                        @click="showPuzzlesModal">
                                        Other Puzzles
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
/* eslint-disable prefer-destructuring */
import Cube from 'bedard-cube';
import { componentTimeout } from 'spyfu-vue-utils';
import { get } from 'lodash-es';
import { mapGetters, mapState } from 'vuex';
import inspectionMoves from './inspection_moves';
import puzzleComponent from '@/components/puzzle/puzzle.vue';
import puzzleControllerComponent from '@/components/puzzle/controller/controller.vue';
import { componentRafEase } from '@/app/utils/component';
import { isCube } from '@/app/utils/puzzle';
import { puzzles } from '@/app/constants';
import { postCreateScramble } from '@/app/repositories/scrambles';
import { postSolve } from '@/app/repositories/solves';

export default {
    created() {
        this.reset();
    },
    data() {
        return {
            // applied guest config
            appliedConfig: null,

            // did not finish state
            dnf: false,

            // current turn applied to the puzzle
            currentTurn: '',

            // inspection phase
            inspecting: false,

            // inspection timestamp
            inspectionStartTime: 0,

            // model to represent the state of the puzzle
            model: null,

            // visual config being previewed
            previewConfig: null,

            // determine if puzzles modal should be visible
            puzzlesModalIsVisible: false,

            // recent solves from this user
            recentSolves: [],

            // record average of 5
            recordAverage: null,

            // id of scramble being solved
            scrambleId: 0,

            // scrambline phase
            scrambling: false,

            // solution to scramble
            solution: [],

            // solve end time
            solveEndTime: 0,

            // solve start time
            solveStartTime: 0,

            // solved successfully phase
            solved: false,

            // solving phase
            solving: false,

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
        'v-puzzles-modal': () => import('./puzzles_modal/puzzles_modal.vue'),
        'v-recent-solves': () => import('./recent_solves/recent_solves.vue'),
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
            'configForPuzzle',
        ]),
        ...mapState('user', [
            'user',
        ]),
        appearance() {
            // determine if the appearance editor should be visible
            return this.edit === 'appearance';
        },
        config() {
            // fully normalized config being fed into the puzzle
            return {
                ...this.defaultConfig,
                ...this.userConfig,
                ...(this.previewConfig || {}),
            };
        },
        defaultConfig() {
            // default config for the puzzle
            return get(puzzles, `${this.puzzle}.defaultConfig`, {});
        },
        edit() {
            // normalize the currently open tab
            return get(this.$route, 'query.edit', '').toLowerCase().trim();
        },
        idle() {
            // determine if we're in an idle state and no timers are running
            return !this.scrambling && !this.inspecting && !this.solving;
        },
        inspectionDuration() {
            // inspection duration in seconds
            return 15;
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
        solutionOffset() {
            // function to return number of ms elapsed since solution started
            return () => Date.now() - this.inspectionStartTime;
        },
        userConfig() {
            // return the users config for the current puzzle
            return this.configForPuzzle(this.puzzle);
        },
    },
    methods: {
        abortSolve() {
            if (!this.scrambleId) {
                return;
            }

            this.dnf = true;
            this.inspecting = false;
            this.solveEndTime = Date.now();
            this.solving = false;

            postSolve({
                abort: true,
                config: JSON.stringify(this.config),
                scrambleId: this.scrambleId,
                solution: this.solution.join(' '),
            }).then((response) => {
                // success
                this.recentSolves = response.data.recentSolves;
                this.recordAverage = response.data.recordAverage;
            });
        },
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
        beginInspection() {
            if (!this.scrambling) {
                return;
            }

            this.inspecting = true;
            this.inspectionStartTime = Date.now();
            this.scrambling = false;
            this.solution = [];
        },
        clearPreviewConfig() {
            this.previewConfig = null;
        },
        completeSolve() {
            this.solveEndTime = Date.now();
            this.solved = true;
            this.solving = false;

            this.recordEvent('END', this.solveEndTime);

            postSolve({
                config: JSON.stringify(this.config),
                scrambleId: this.scrambleId,
                solution: this.solution.join(' '),
            }).then((response) => {
                // success
                this.recentSolves = response.data.recentSolves;
                this.recordAverage = response.data.recordAverage;
            });
        },
        executeTurn(turn) {
            this.currentTurn = turn;
            this.turnProgress = 0;
            this.turning = true;

            return new Promise((resolve) => {
                componentRafEase(this, (progress) => {
                    this.turnProgress = progress;

                    if (progress === 1) {
                        this.$nextTick(() => {
                            this.model.turn(turn);

                            if (this.inspecting || this.solving) {
                                this.recordTurn(turn);
                            }

                            this.turnProgress = 0;
                            this.turning = false;

                            if (this.solving && this.model.isSolved()) {
                                this.completeSolve();
                            }

                            this.$nextTick(resolve);
                        });
                    }
                }, this.config.turnDuration);
            });
        },
        hidePuzzlesModal() {
            this.puzzlesModalIsVisible = false;
        },
        onEscape() {
            // abort the solve if solving
            if (this.inspecting || this.solving) {
                this.abortSolve();
            }

            // reset everything if we're idle
            else if (this.idle) {
                this.reset();
            }
        },
        onSpacebar(e) {
            // handle spacebar keypress events
            e.preventDefault();

            if (this.idle) {
                this.scramble();
            } else if (this.inspecting) {
                this.startSolve();
            }
        },
        queueTurn(turn) {
            if (this.inspecting) {
                const allowedMoves = inspectionMoves[this.puzzle];

                if (!allowedMoves.includes(turn)) {
                    return;
                }
            }

            this.turnQueue.push(turn);
        },
        recordEvent(event, currentTime) {
            const normalizedEvent = event.trim().toUpperCase();
            const offset = currentTime - this.inspectionStartTime;

            this.solution.push(`${offset}#${normalizedEvent}`);
        },
        recordTurn(turn) {
            const offset = this.solutionOffset();

            this.solution.push(`${offset}:${turn}`);
        },
        refreshModel() {
            // cube
            if (this.isCube) {
                const size = parseInt(this.puzzle, 10);

                this.model = new Cube(size, { useObjects: true });
                this.fooCube = new Cube(size, { useObjects: true });
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
            this.appliedConfig = null;
            this.dnf = false;
            this.inspecting = false;
            this.inspectionStartTime = 0;
            this.scrambleId = 0;
            this.scrambling = false;
            this.solution = [];
            this.solveEndTime = 0;
            this.solveStartTime = 0;
            this.solved = false;
            this.solving = false;

            this.refreshModel();
        },
        scramble() {
            this.reset();

            this.scrambling = true;

            // fetch and apply scrambled state and id
            let loading = true;
            let scrambledState = {};

            const scrambleXhr = postCreateScramble(this.puzzle).then((response) => {
                this.scrambleId = response.data.id;
                scrambledState = response.data.scrambledState;
            });

            // this sets the min amount of time our animation will run
            const delay = new Promise(resolve => componentTimeout(this, resolve, 1500));

            // set loading to false when xhr and delay are done
            Promise.all([scrambleXhr, delay]).then(() => { loading = false; });

            // simulate the puzzle being scrambled. this will have
            // to be refactored to be puzzle-agnostic once shape
            // changing puzzles like square-1 are implemented.
            const pseudoScramble = new Promise((resolve) => {
                let scramble = this.model.generateScrambleString(50).split(' ');

                const turn = () => {
                    this.currentTurn = scramble.shift().replace(/2$/, '');

                    scramble = scramble.concat(this.currentTurn);

                    this.executeTurn(this.currentTurn).then(loading ? turn : resolve);
                };

                turn();
            });

            // when everything is complete. move on to inspection phase
            Promise.all([scrambleXhr, pseudoScramble]).then(() => {
                this.applyState(scrambledState);
                this.beginInspection();
            });
        },
        setPreviewConfig(config) {
            this.previewConfig = config;
        },
        showPuzzlesModal() {
            this.puzzlesModalIsVisible = true;
        },
        startSolve() {
            if (!this.inspecting) {
                return;
            }

            const inspectionEndTime = this.inspectionStartTime + (this.inspectionDuration * 1000);

            this.inspecting = false;
            this.solveStartTime = Date.now();
            this.solving = true;

            this.recordEvent('START', Math.min(inspectionEndTime, this.solveStartTime));
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
