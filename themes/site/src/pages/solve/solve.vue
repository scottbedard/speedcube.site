<template>
    <v-page padded>
        <v-margin padded>

            <!-- puzzle / controller -->
            <v-puzzle
                ref="puzzle"
                :puzzle="puzzle"
                @solved="completeSolve"
            />

            <!-- controls -->
            <div class="text-center">
                <v-fade-transition>
                    <!-- scrambling -->
                    <div
                        v-if="scrambling"
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
                        <p class="font-thin mt-4 text-grey-5">press space to start</p>
                    </div>

                    <!-- solving / solved -->
                    <div v-else-if="solving || solved" key="solving">
                        <v-timer
                            :running="solving"
                            :display-time="solveCompletedTime"
                            :started-at="solveStartedAt"
                        />
                        <p class="font-thin mt-4 mb-8 text-grey-5">press space to scramble</p>
                    </div>

                    <!-- idle -->
                    <div
                        v-else
                        key="idle">
                        <v-button @click="scramble">
                            Scramble
                        </v-button>
                    </div>
                </v-fade-transition>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import controllerComponent from './controller/controller.vue';
import { postCreateScramble } from '@/app/repositories/scrambles';
import { postSolve } from '@/app/repositories/solves';
import { bindExternalEvent } from '@/app/utils/component';

export default {
    created() {
        bindExternalEvent(this, document.body, 'keyup', this.onKeyup);
    },
    data() {
        return {
            // did not finish
            dnf: false,

            // log of all turns and solve events
            history: [],

            // inspection phase
            inspecting: false,

            // inspection duration in milliseconds
            inspectionDuration: 0,

            // inspection start time
            inspectionStartedAt: 0,

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
    computed: {
        puzzle() {
            return this.$route.params.puzzle;
        },
        puzzleConfig() {
            return {};
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

            // transition to solving state and allow all turns
            this.inspecting = false;
            this.solveStartedAt = Date.now();
            this.solving = true;

            const offset = this.solveStartedAt - this.inspectionStartedAt;

            this.recordEvent('START');
        },
        completeSolve() {
            if (!this.solving) {
                return;
            }

            // transition to solved state
            this.solveCompletedAt = Date.now();
            this.solveCompletedTime = this.solveCompletedAt - this.solveStartedAt;
            this.solved = true;
            this.solving = false;

            this.history.push(`${this.solveCompletedTime}#END`);

            postSolve({
                config: this.puzzleConfig,
                scrambleId: this.scrambleId,
                solution: this.solution,
            }).then((response) => {
                // success
                const { solve } = response.data;

                this.solves.push(solve);
            }, (err) => {
                // failed
            });
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
        recordTurn(turn) {
            const offset = Date.now() - this.inspectionStartedAt;

            this.history.push(`${offset}:${turn}`);
        },
        scramble() {
            // reset the state
            this.dnf = false;
            this.history = [];
            this.inspecting = false;
            this.scrambling = true;
            this.solveCompletedAt = null;
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

                this.recordTurn(turn);
            }
        },
    },
};
</script>
