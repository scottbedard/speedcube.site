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
                @space-up="onSpaceUp"
                @turn="turn"
            />

            <div class="text-center">
                <!-- timer -->
                <div v-if="isSolving || isComplete" key="timer">
                    <v-timer :time="time" />
                </div>

                <!-- countdown -->
                <div v-else-if="isInspecting" key="countdown">
                    <v-countdown />
                </div>

                <!-- scramble -->
                <div v-else-if="!isComplete" key="scramble">
                    <v-button
                        primary
                        :loading="scrambleIsLoading"
                        @click="scramble">
                        Scramble
                    </v-button>
                </div>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { postCreateScramble } from '@/app/repositories/scrambles';
import { postCreateSolve } from '@/app/repositories/solves';
import countdownComponent from './countdown/countdown.vue';
import sidebarComponent from './sidebar/sidebar.vue';
import timerComponent from './timer/timer.vue';

export default {
    created() {
        this.setConfigForPuzzle();
    },
    data() {
        return {
            // history of inspection and solve
            history: [],

            // time the inspection phase started
            inspectionStartedAt: 0,

            // this is true when the solve is complete
            isComplete: false,

            // this is true during the inspection phase
            isInspecting: false,

            // this is true during the solving phase
            isSolving: false,

            // the current timestamp. this is updated when solving.
            now: Date.now(),

            // id of the Scramble model being solved
            scrambleId: 0,

            // loading state for fetching a scramble from the server
            scrambleIsLoading: false,

            // loading state for submitting a solve to the server
            solveIsLoading: false,

            // time the solving phase started
            solveStartedAt: 0,

            // interval id for our timer
            tickInterval: 0,

            // the turn duration of the cube
            turnDuration: 95,
        };
    },
    components: {
        'v-countdown': countdownComponent,
        'v-sidebar': sidebarComponent,
        'v-timer': timerComponent,
    },
    computed: {
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
        puzzleId() {
            return `cube${this.size}`;
        },
        size() {
            return this.$route.meta.cubeSize;
        },
        time() {
            if (this.isSolving) {
                return this.now - this.solveStartedAt;
            } else if (this.isComplete) {
                const lastTurn = this.history[this.history.length - 1];

                return parseInt(lastTurn.split(':'), 10);
            }

            return 0;
        },
    },
    methods: {
        beginInspection() {
            // reset history, we'll be recording from here
            // through the end of the solve
            this.history = [];
            this.isInspecting = true;
            this.inspectionStartedAt = Date.now();

            // start the solve after 15
            this.inspectionTimeoutId = setTimeout(this.beginSolve, 15000);
        },
        beginSolve() {
            // do nothing if the solve has already started
            if (this.isSolving) {
                return;
            }

            // update our state
            this.solveStartedAt = Date.now();
            this.isInspecting = false;
            this.isSolving = true;

            // push a history entry to indicate the solve started
            if (this.history.length > 0) {
                this.history.push('!!');
            }
        },
        onSolved() {
            this.completeIsLoading = true;
            this.isComplete = true;
            this.isSolving = false;

            postCreateSolve({
                scrambleId: this.scrambleId,
                solution: this.history.join(' '),
            });
        },
        onSpaceUp() {
            if (this.isInspecting) {
                this.beginSolve();
            } else {
                this.scramble();
            }
        },
        setConfigForPuzzle() {
            const puzzleConfig = this.$store.getters['user/puzzleConfig'];

            this.$store.commit('user/setConfig', puzzleConfig(this.puzzleId));
        },
        scramble() {
            this.inspectionStartedAt = 0;
            this.isComplete = false;
            this.isInspecting = false;
            this.isSolving = false;
            this.solveStartedAt = 0;

            // request a new solve from the server, and set the
            // cube state to the scrambled state of our solve
            this.scrambleIsLoading = true;

            const request = postCreateScramble(this.puzzleId);

            // animate the cube being scrambled. we're only using
            // this as a loading state, this isn't the real scramble
            const scramble = new Promise((resolve) => {
                this.$refs.puzzle.$once('idle', resolve);
            });

            this.$refs.puzzle.scramble();

            // begin the inspection when we're ready to go
            Promise.all([request, scramble]).then(([response]) => {
                // set the state of our scrambled puzzle
                this.scrambleId = response.data.id;
                this.$refs.puzzle.setCubeState(response.data.scrambledState);

                // give the cube a sec to render, and away we go
                setTimeout(() => {
                    this.scrambleIsLoading = false;
                    this.beginInspection();
                }, 100);
            });
        },
        tick() {
            if (this.isSolving) {
                this.now = Date.now();
            }
        },
        turn(turn) {
            // disallow any moves that aren't whole-cube turns
            if (this.isInspecting && !/\d*[xyzXYZ]-?\d?/g.test(turn)) {
                return;
            }

            this.history.push(`${this.time}:${turn}`);

            this.$refs.puzzle.turn(turn);
        },
    },
    watch: {
        isSolving(isSolving) {
            if (isSolving) {
                this.tickInterval = setInterval(this.tick, 10);
            } else {
                clearInterval(this.tickInterval);
            }
        },
    },
};
</script>
