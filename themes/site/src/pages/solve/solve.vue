<template>
    <v-page padded>
        <v-margin padded>

            <!-- puzzle -->
            <v-puzzle
                ref="puzzle"
                :puzzle="puzzle"
                :turnable="turnable"
                @solved="completeSolve"
                @turn="recordTurn"
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
                    </div>

                    <!-- solving -->
                    <div v-else-if="solving || solved" key="solving">
                        <v-timer
                            :running="solving"
                            :display-time="solveCompletedTime"
                            :started-at="solveStartedAt"
                        />
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
import { postCreateScramble } from '@/app/repositories/scrambles';

export default {
    data() {
        return {
            // log of all turns and solve events
            history: [],

            // inspection phase
            inspecting: false,

            // inspection duration in milliseconds
            inspectionDuration: 0,

            // inspection start time
            inspectionStartedAt: 0,

            // scrambling phase
            scrambling: false,

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

            // puzzle turnability
            turnable: 2,
        };
    },
    computed: {
        puzzle() {
            return this.$route.params.puzzle;
        },
    },
    methods: {
        beginInspection() {
            // allow partial turns
            this.scrambling = false;
            this.turnable = 1;

            // begin an inspection for however long our puzzle allows
            this.inspecting = true;
            this.inspectionDuration = this.$refs.puzzle.getInspectionDuration();
            this.inspectionStartedAt = Date.now();

            console.log('inspect');
        },
        beginSolve() {
            // transition to solving state and allow all turns
            this.inspecting = false;
            this.solveStartedAt = Date.now();
            this.solving = true;
            this.turnable = 2;

            console.log('start');
        },
        completeSolve() {
            this.solveCompletedAt = Date.now();
            this.solveCompletedTime = this.solveCompletedAt - this.solveStartedAt;
            this.solved = true;
            this.solving = false;
            this.turnable = 0;

            console.log('completed', this.solveCompletedTime);
        },
        recordTurn(turn) {
            if (this.inspecting || this.solving) {
                const offset = Date.now() - this.inspectionStartedAt;

                this.history.push(`${offset}:${turn}`);
            }
        },
        scramble() {
            // reset the state
            this.inspecting = false;
            this.scrambling = true;
            this.solveCompletedAt = null;
            this.solveStaretdAt = 0;
            this.solved = false;
            this.solving = false;
            this.turnable = 0;

            // get a scramble from the server, and use an animating
            // pseudo-scramble as the loading state
            const scrambleRequest = postCreateScramble(this.puzzle);
            const pseudoScramble = this.$refs.puzzle.pseudoScramble();
            
            // update the puzzle's state and begin the inspection
            Promise.all([scrambleRequest, pseudoScramble]).then(([response]) => {
                this.$refs.puzzle.applyState(response.data.scrambledState);
                
                this.beginInspection();
            });
        },
    },
};
</script>
