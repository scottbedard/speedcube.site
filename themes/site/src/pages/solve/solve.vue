<template>
    <v-page padded>
        <v-margin padded>
            <!-- puzzle / controller -->
            <v-puzzle
                ref="puzzle"
                :config="puzzleConfig"
                :keyboard-config="keyboardConfig"
                :puzzle="puzzle"
                @default-config="setDefaultConfig"
                @turn-start="recordTurn"
                @turn-end="completeIfSolved"
            />

            <!-- controls -->
            <div class="text-center">
                <v-fade-transition>
                    <!-- appearance -->
                    <div
                        v-if="appearanceIsVisible"
                        key="appearance">
                        <v-appearance
                            :config="puzzleConfig"
                            :options="puzzleOptions"
                            :puzzle="puzzle"
                            @close="hideOptions"
                            @guest-config="setGuestConfig"
                            @pending="setPendingConfig"
                        />
                    </div>

                    <!-- controls -->
                    <div
                        v-else-if="controlsAreVisible"
                        key="controls">
                        <v-controls
                            :keyboard-config="keyboardConfig"
                            :puzzle="puzzle"
                            @close="hideControls"
                        />
                    </div>

                    <!-- scrambling -->
                    <div
                        v-else-if="scrambling"
                        key="scrambling"
                    />

                    <!-- inspecting -->
                    <div
                        v-else-if="inspecting"
                        key="inspecting">
                        <v-countdown
                            :duration="inspectionDuration"
                            :started-at="inspectionStartedAt"
                            @complete="beginSolve"
                        />
                        <p class="font-thin mt-4 text-grey-6">press space to start</p>
                    </div>

                    <!-- solving / solved -->
                    <div v-else-if="solving || solved" key="solving">
                        <div
                            class="font-thin text-center text-4xl trans-color"
                            :class="{
                                'text-grey-6': !solved,
                                'text-grey-7': solved,
                            }">
                            <v-timer
                                :running="solving"
                                :display-time="solveCompletedTime"
                                :started-at="solveStartedAt"
                            />
                        </div>
                        <p class="font-thin mt-4 mb-8 text-grey-6">press space to scramble</p>
                    </div>

                    <!-- dnf -->
                    <div v-else-if="dnf" key="dnf">
                        <div class="font-thin text-center text-grey-6 text-4xl">DNF</div>
                        <p class="font-thin mt-4 mb-8 text-grey-6">press space to scramble</p>
                    </div>

                    <!-- idle -->
                    <div
                        v-else
                        key="idle">
                        <div class="mb-8">
                            <v-button class="mb-8" @click="scramble">
                                Scramble
                            </v-button>

                            <div class="flex flex-wrap items-center justify-center text-xs tracking-wide uppercase">
                                <div class="p-4 w-full md:w-auto">
                                    <a
                                        class="text-grey-6"
                                        href="#"
                                        @click.prevent="onAppearanceClick">
                                        Appearance
                                    </a>
                                </div>
                                <div class="border-grey-4 border-b w-3" />
                                <div class="p-4 w-full md:w-auto">
                                    <a
                                        class="text-grey-6"
                                        href="#"
                                        @click.prevent="onControlsClick">
                                        Controls
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-fade-transition>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import { bindExternalEvent } from '@/app/utils/component';
import { get } from 'lodash-es';
import { mapGetters, mapState } from 'vuex';
import { postCreateScramble } from '@/app/repositories/scrambles';
import { postSolve } from '@/app/repositories/solves';
import appearanceOptions from './appearance_options';
import defaultKeyboardConfigs from './default_keyboard_configs';

export default {
    created() {
        bindExternalEvent(this, document.body, 'keyup', this.onKeyup);
    },
    data() {
        return {
            // visilbility of keyboard controls editor
            controlsAreVisible: false,

            // default puzzle configuration
            defaultConfig: {},

            // did not finish
            dnf: false,

            // guest puzzle config
            guestConfig: {},

            // log of all turns and solve events
            history: [],

            // inspection phase
            inspecting: false,

            // inspection duration in milliseconds
            inspectionDuration: 0,

            // inspection start time
            inspectionStartedAt: 0,

            // visibility of puzzle appearance controls
            appearanceIsVisible: false,

            // pending puzzle config
            pendingConfig: null,

            // id of the scramble model
            scrambleId: 0,

            // scrambling phase
            scrambling: false,

            // session of recent solves
            solves: [],

            // solve completion time
            solveCompletedAt: 0,

            // the final time of the solve
            solveCompletedTime: null,

            // solve start time
            solveStartedAt: 0,

            // solving phase
            solving: false,

            // solved phase
            solved: false,
        };
    },
    components: {
        'v-appearance': () => import('./appearance/appearance.vue'),
        'v-controls': () => import('./controls/controls.vue'),
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
        ...mapState('user', [
            'user',
        ]),
        hasOptions() {
            return Array.isArray(this.puzzleOptions);
        },
        keyboardConfig() {
            return this.user.keyboardConfigs.find(kc => kc.puzzle === this.puzzle) || defaultKeyboardConfigs[this.puzzle];
        },
        puzzle() {
            return this.$route.params.puzzle;
        },
        puzzleConfig() {
            if (this.pendingConfig) {
                return { ...this.defaultConfig, ...this.pendingConfig };
            }

            if (this.isAuthenticated) {
                const savedConfig = this.user.configs.find(config => config.puzzle === this.puzzle);

                if (savedConfig) {
                    return { ...this.defaultConfig, ...savedConfig.config };
                }
            }

            return { ...this.defaultConfig, ...this.guestConfig };
        },
        puzzleOptions() {
            return appearanceOptions[this.puzzle];
        },
        solution() {
            return this.history.join(' ');
        },
    },
    methods: {
        abortSolve() {
            if (!this.inspecting && !this.solving) {
                return;
            }

            this.inspecting = false;
            this.solving = false;
            this.dnf = true;

            this.recordEvent('END');

            postSolve({
                abort: true,
                config: this.puzzleConfig,
                scrambleId: this.scrambleId,
                solution: this.solution,
            }).then((response) => {
                const { solve } = response.data;

                this.solves.push(solve);
            });
        },
        beginInspection() {
            // allow partial turns
            this.scrambling = false;

            // begin an inspection for however long our puzzle allows
            this.inspecting = true;
            this.inspectionDuration = this.$refs.puzzle.getInspectionDuration();
            this.inspectionStartedAt = Date.now();
        },
        beginSolve() {
            if (!this.inspecting) {
                return;
            }

            const now = Date.now();

            // transition to solving state and allow all turns
            this.inspecting = false;
            this.solveStartedAt = now;
            this.solving = true;

            this.recordEvent('START', now);
        },
        completeIfSolved(isSolved) {
            if (isSolved) {
                this.completeSolve();
            }
        },
        completeSolve() {
            if (!this.solving) {
                return;
            }

            // transition to solved state
            const now = Date.now();
            this.solveCompletedAt = now;
            this.solveCompletedTime = this.solveCompletedAt - this.solveStartedAt;
            this.solved = true;
            this.solving = false;

            this.recordEvent('END', now);

            postSolve({
                config: this.puzzleConfig,
                scrambleId: this.scrambleId,
                solution: this.solution,
            }).then((response) => {
                // success
                const { solve } = response.data;

                this.solves.push(solve);
            });
        },
        hideControls() {
            this.controlsAreVisible = false;
        },
        hideOptions() {
            this.appearanceIsVisible = false;
            this.pendingConfig = null;
        },
        onAppearanceClick() {
            this.appearanceIsVisible = true;
        },
        onControlsClick() {
            this.controlsAreVisible = true;
        },
        onEscapeUp() {
            // abort the current solve if one is running
            if (this.inspecting || this.solving) {
                this.abortSolve();
            }
        },
        onKeyup(e) {
            if (e.key === ' ') {
                this.onSpaceUp();
            } else if (e.key === 'Escape') {
                this.onEscapeUp();
            } else {
                const turn = this.$refs.puzzle.getTurnFromKeyboardEvent(e);

                if (turn) {
                    this.turn(turn);
                }
            }
        },
        onSpaceUp() {
            // do nothing if we're modifying cube options
            if (this.appearanceIsVisible) {
                return;
            }

            // start a new solve if we're not doing anything
            if (!this.inspecting && !this.solving) {
                this.scramble();
            }

            // if we're inspecting, transition to solving
            // doing this removes our countdown from the dom, and this
            // cancels the timeout from triggering a redundant start
            if (this.inspecting) {
                this.beginSolve();
            }
        },
        recordEvent(event) {
            const offset = Date.now() - this.inspectionStartedAt;

            this.history.push(`${offset}#${event}`);
        },
        recordTurn(turn, now = null) {
            const offset = (now || Date.now()) - this.inspectionStartedAt;

            this.history.push(`${offset}:${turn}`);
        },
        setDefaultConfig(defaultConfig) {
            this.defaultConfig = defaultConfig;
        },
        setGuestConfig(guestConfig) {
            this.guestConfig = guestConfig;
        },
        setPendingConfig(pendingConfig) {
            this.pendingConfig = pendingConfig;
        },
        scramble() {
            // reset the state
            this.dnf = false;
            this.history = [];
            this.inspecting = false;
            this.appearanceIsVisible = false;
            this.scrambling = true;
            this.solveCompletedAt = 0;
            this.solveCompletedTime = null;
            this.solveStaretdAt = 0;
            this.solved = false;
            this.solving = false;

            // get a scramble from the server, and use an animating
            // pseudo-scramble as the loading state
            const scrambleRequest = postCreateScramble(this.puzzle);
            const pseudoScramble = this.$refs.puzzle.pseudoScramble();

            // update the puzzle's state and begin the inspection
            Promise.all([scrambleRequest, pseudoScramble]).then(([response]) => {
                this.scrambleId = response.data.id;
                this.$refs.puzzle.applyState(response.data.scrambledState);

                this.beginInspection();
            });
        },
        turn(turn) {
            if (!this.inspecting || this.$refs.puzzle.isInspectionTurn(turn)) {
                this.$refs.puzzle.turn(turn);
            }
        },
    },
};
</script>
