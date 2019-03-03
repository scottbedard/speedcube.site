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
                @ready="onReady"
                @turn-end="completeIfSolved"
                @turn-start="recordTurn"
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
                            @disable-turning="disableTurning"
                            @enable-turning="enableTurning"
                            @update-pending="setPendingKeyboardConfig"
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
                            <v-button primary @click="scramble">
                                Scramble
                            </v-button>

                            <div class="flex flex-wrap items-center justify-center mt-4 text-xs tracking-wide uppercase">
                                <div class="p-4 w-full sm:w-auto">
                                    <a
                                        class="text-grey-6"
                                        href="#"
                                        @click.prevent="onAppearanceClick">
                                        Customize Puzzle
                                    </a>
                                </div>
                                <div class="border-grey-6 border-b w-2" />
                                <div class="p-4 w-full sm:w-auto">
                                    <a
                                        class="text-grey-6"
                                        href="#"
                                        @click.prevent="onControlsClick">
                                        Edit Key Bindings
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
import { get } from 'lodash-es';
import { mapGetters, mapState } from 'vuex';
import { bindExternalEvent } from 'spyfu-vue-utils';
import { jsonToObject } from '@/app/utils/object';
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

            // pending keyboard config
            pendingKeyboardConfig: null,

            // enables key listeners
            puzzleIsTurnable: true,

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
            if (this.pendingKeyboardConfig) {
                return this.pendingKeyboardConfig;
            }

            const userConfig = get(this.user, 'keyboardConfigs', []).find(kc => kc.puzzle === this.puzzle);

            return userConfig
                ? jsonToObject(userConfig.config)
                : defaultKeyboardConfigs[this.puzzle];
        },
        puzzle() {
            return this.$route.params.puzzle;
        },
        puzzleConfig() {
            if (this.pendingConfig) {
                return { ...this.defaultConfig, ...this.pendingConfig };
            }

            if (this.isAuthenticated) {
                const savedConfig = get(this.user, 'configs', []).find(config => config.puzzle === this.puzzle);

                if (savedConfig) {
                    return { ...this.defaultConfig, ...jsonToObject(savedConfig.config) };
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
            this.inspectionDuration = this.$options.puzzle.getInspectionDuration();
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
                config: JSON.stringify(this.puzzleConfig),
                scrambleId: this.scrambleId,
                solution: this.solution,
            }).then((response) => {
                // success
                const { solve } = response.data;

                this.solves.push(solve);
            });
        },
        disableTurning() {
            this.puzzleIsTurnable = false;
        },
        enableTurning() {
            this.puzzleIsTurnable = true;
        },
        hideControls() {
            this.controlsAreVisible = false;
            this.pendingKeyboardConfig = null;
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
            // do nothing if the puzzle is not turnable
            if (!this.puzzleIsTurnable) {
                return;
            }

            if (e.key === ' ') {
                this.onSpaceUp();
            } else if (e.key === 'Escape') {
                this.onEscapeUp();
            } else {
                const turn = this.$options.puzzle.getTurnFromKeyboardEvent(e);

                if (turn) {
                    this.turn(turn);
                }
            }
        },
        onReady(puzzle) {
            this.$options.puzzle = puzzle;
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
        setPendingKeyboardConfig(pendingKeyboardConfig) {
            this.pendingKeyboardConfig = pendingKeyboardConfig;
        },
        scramble() {
            // reset the state
            this.appearanceIsVisible = false;
            this.dnf = false;
            this.history = [];
            this.inspecting = false;
            this.puzzleIsTurnable = true;
            this.scrambling = true;
            this.solveCompletedAt = 0;
            this.solveCompletedTime = null;
            this.solveStaretdAt = 0;
            this.solved = false;
            this.solving = false;

            // get a scramble from the server, and use an animating
            // pseudo-scramble as the loading state
            const scrambleRequest = postCreateScramble(this.puzzle);
            const pseudoScramble = this.$options.puzzle.pseudoScramble();

            // update the puzzle's state and begin the inspection
            Promise.all([scrambleRequest, pseudoScramble]).then(([response]) => {
                this.scrambleId = response.data.id;
                this.$options.puzzle.applyState(response.data.scrambledState);

                this.beginInspection();
            });
        },
        turn(turn) {
            if (!this.inspecting || this.$options.puzzle.isInspectionTurn(turn)) {
                this.$options.puzzle.turn(turn);
            }
        },
    },
};
</script>
