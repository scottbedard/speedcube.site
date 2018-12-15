<template>
    <v-page>
        <v-margin class="relative" padded>
            <!-- sidebar -->
            <aside class="absolute hidden pin-l pin-t px-4 md:block">
                <v-sidebar :config-key="puzzleId" />
            </aside>

            <!-- puzzle -->
            <v-puzzle
                :colors="colors"
                :masked="scrambleIsLoading"
                :size="size"
                :sticker-elevation="stickerElevation"
                :sticker-radius="stickerRadius"
                :sticker-scale="stickerScale"
                :sticker-inner-opacity="stickerInnerOpacity"
                :turn-duration="turnDuration"
                ref="puzzle"
                @solved="onSolved"
            />

            <!-- controller -->
            <v-puzzle-controller
                :size="size"
                @escape="onEscape"
                @space-up="onSpaceUp"
                @turn="turn"
            />

            <div class="text-center">
                <v-collapse-transition>
                    <!-- timer -->
                    <div v-if="isSolving || isComplete" key="timer">
                        <v-timer :time="displayTime" />
                        <v-fade-transition>
                            <div v-if="isComplete" class="mt-4" key="loading">
                                <v-tip>press spacebar to scramble</v-tip>
                            </div>
                            <div v-else class="mt-4" key="solving">
                                <v-tip>press escape to end solve</v-tip>
                            </div>
                        </v-fade-transition>
                    </div>

                    <!-- countdown -->
                    <div v-else-if="isInspecting" key="countdown">
                        <v-countdown />
                        <v-tip>press spacebar to start</v-tip>
                    </div>

                    <!-- scramble button -->
                    <div v-else-if="!isComplete && !scrambleIsLoading" key="scramble">
                        <v-button @click="scramble">
                            Scramble
                        </v-button>
                    </div>
                </v-collapse-transition>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { postCreateScramble } from '@/app/repositories/scrambles';
import { postSolve } from '@/app/repositories/solves';
import { cleanTimeout } from '@/app/utils/component';
import sidebarComponent from './sidebar/sidebar.vue';
import tipComponent from './tip/tip.vue';

export default {
    created() {
        this.setConfigForPuzzle();
    },
    data() {
        return {
            // final time property when completed
            completeTime: 0,

            // history of inspection and solve
            history: [],

            // time the inspection phase started
            inspectionStartedAt: 0,

            // this is true when the solve is complete
            isComplete: false,

            // this is true during the inspection phase
            isInspecting: false,

            // cleanTimeout id for inspection
            inspectionTimeout: 0,

            // this is true during the solving phase
            isSolving: false,

            // the current timestamp. this is updated when solving.
            now: Date.now(),

            // id of the Scramble model being solved
            scrambleId: 0,

            // loading state for fetching a scramble from the server
            scrambleIsLoading: false,

            // time value at the start of a solve
            solveStartTime: 0,

            // loading state for submitting a solve to the server
            solveIsLoading: false,

            // interval id for our timer
            tickInterval: 0,

            // the turn duration of the cube
            turnDuration: 95,
        };
    },
    components: {
        'v-sidebar': sidebarComponent,
        'v-tip': tipComponent,
    },
    computed: {
        ...mapState('user', [
            'config',
        ]),
        ...mapState('user', {
            colors: state => state.config.colors,
            stickerElevation: state => state.config.stickerElevation,
            stickerInnerOpacity: state => state.config.stickerInnerOpacity,
            stickerRadius: state => state.config.stickerRadius,
            stickerScale: state => state.config.stickerScale,
        }),
        ...mapGetters('user', [
            'isAuthenticated',
            'puzzleConfig',
        ]),
        displayTime() {
            return this.time - this.solveStartTime;
        },
        puzzleId() {
            return `cube${this.size}`;
        },
        size() {
            return this.$route.meta.cubeSize;
        },
        solution() {
            return this.history.join(' ');
        },
        time() {
            if (this.isInspecting || this.isSolving) {
                return this.now - this.inspectionStartedAt;
            }

            return this.completeTime;
        },
    },
    methods: {
        abortSolve() {
            // abort a solve
            postSolve({
                abort: true,
                config: this.config,
                scrambleId: this.scrambleId,
                solution: this.solution,
            });
        },
        beginInspection() {
            // reset history, we'll be recording from here
            // through the end of the solve
            this.history = [];
            this.isInspecting = true;
            this.inspectionStartedAt = Date.now();

            // start the solve for this scramble after 15
            const { scrambleId } = this;

            this.inspectionTimeout = cleanTimeout(this, () => {
                if (this.scrambleId === scrambleId) {
                    this.beginSolve();
                }
            }, 15000);
        },
        beginSolve() {
            // do nothing if the solve has already started
            if (this.isSolving) {
                return;
            }

            clearTimeout(this.inspectionTimeout);

            // log the start of the solve
            const solveStartTime = this.time;

            this.solveStartTime = solveStartTime;
            this.history.push(`${solveStartTime}#START`);

            // update our state
            this.isInspecting = false;
            this.isSolving = true;
        },
        onEscape() {
            // abort and solve that is currently in progress
            if (this.isInspecting || this.isSolving) {
                this.abortSolve();
            }

            this.reset();
        },
        onSolved() {
            // do nothing if we're not solving, meaning the
            // cube was simply reset.
            if (!this.isSolving) {
                return;
            }

            // attach an event completing the solve
            const completeTime = this.time;

            this.history.push(`${completeTime}#END`);

            // close our the state tracking the solve
            this.completeIsLoading = true;
            this.completeTime = completeTime;
            this.isComplete = true;
            this.isSolving = false;

            postSolve({
                config: this.config,
                scrambleId: this.scrambleId,
                solution: this.solution,
            }).finally(() => {
                // complete
                this.completeIsLoading = false;
            });
        },
        onSpaceUp() {
            if (this.isInspecting) {
                this.beginSolve(this.scrambleId);
            } else if (!this.isSolving) {
                this.scramble();
            }
        },
        setConfigForPuzzle() {
            const puzzleConfig = this.$store.getters['user/puzzleConfig'];

            this.$store.commit('user/setConfig', puzzleConfig(this.puzzleId));
        },
        reset() {
            this.stopTicking();

            this.inspectionStartedAt = 0;
            this.isComplete = false;
            this.isInspecting = false;
            this.isSolving = false;

            Object.assign(this.$data, this.$options.data.apply(this));

            this.$refs.puzzle.reset();
        },
        scramble() {
            this.reset();

            // request a new solve from the server, and set the
            // cube state to the scrambled state of our solve
            this.scrambleIsLoading = true;

            const request = postCreateScramble(this.size);

            // animate the cube being scrambled. we're only using
            // this as a loading state, this isn't the real scramble
            const scramble = new Promise((resolve) => {
                this.$refs.puzzle.$once('idle', resolve);
            });

            this.$refs.puzzle.fakeScramble();

            // begin the inspection when we're ready to go
            Promise.all([request, scramble]).then(([response]) => {
                // set the state of our scrambled puzzle
                this.scrambleId = response.data.id;
                this.$refs.puzzle.setCubeState(response.data.scrambledState);

                // give the cube a sec to render, and away we go
                cleanTimeout(this, () => {
                    this.scrambleIsLoading = false;
                    this.beginInspection();
                }, 100);
            });
        },
        startTicking() {
            this.tickInterval = setInterval(this.tick, 5);
        },
        stopTicking() {
            clearInterval(this.tickInterval);
        },
        tick() {
            if (this.isInspecting || this.isSolving) {
                this.now = Date.now();
            }
        },
        turn(turn) {
            const isPuzzleRotation = /[xyzXYZ]-?\d?$/g.test(turn);

            // disallow any moves that aren't whole-cube turns
            if (this.isInspecting && !isPuzzleRotation) {
                return;
            }

            this.history.push(`${this.time}:${turn}`);

            this.$refs.puzzle.turn(turn);
        },
    },
    watch: {
        isInspecting(isInspecting) {
            if (isInspecting) {
                this.startTicking();
            }
        },
        isSolving(isSolving) {
            if (!isSolving) {
                this.stopTicking();
            }
        },
    },
};
</script>
