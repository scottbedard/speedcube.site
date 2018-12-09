<template>
    <v-page padded>
        
        <!-- loading -->
        <div v-if="isLoading" key="loading">
            <v-spinner />
        </div>

        <!-- replay -->
        <div
            class="trans-opacity"
            :class="{
                'opacity-0': isLoading,
                'opacity-100': !isLoading,
            }">
            <!-- title -->
            <div class="text-center">
                <h1 class="font-thin mb-4">
                    {{ user.name }}'s <strong class="font-bold">{{ (solve.time / 1000).toFixed(2) }}</strong> solve
                </h1>
                <div class="font-thin text-grey-dark">
                    {{ solve.createdAt | datestamp }}
                </div>
            </div>

            <!-- puzzle -->
            <div class="max-w-md mx-auto">
                <v-puzzle
                    ref="puzzle"
                    :size="solve.cubeSize"
                />
            </div>

            <div class="text-center">
                <v-fade-transition>
                    <!-- timer -->
                    <div v-if="isSolving || isComplete" key="timer">
                        <div class="mb-8">
                            <v-timer :time="time" />
                        </div>

                        <v-fade-transition>
                            <div v-if="isComplete">
                                <v-button @click="replay">Replay</v-button>
                            </div>
                        </v-fade-transition>
                    </div>
                    
                    <!-- inspection -->
                    <div v-else-if="isInspecting" key="inspection">
                        <v-countdown />
                    </div>

                    <!-- replay -->
                    <div v-else key="replay">
                        <v-button @click="replay">Replay</v-button>
                    </div>
                </v-fade-transition>
            </div>
        </div>
    </v-page>
</template>

<script>
import { getSolve } from '@/app/repositories/solves';

export default {
    created() {
        this.fetchSolve();
    },
    data() {
        return {
            // this is set to true when the replay has finished
            isComplete: false,

            // this is set to true when inspection begins
            isInspecting: false,

            // loading state for xhr to fetch the solve
            isLoading: false,

            // this is set to true when the solve starts
            isSolving: false,

            // timestamp used to determine the time
            now: 0,

            // timestamp that the solve started at
            solveStartedAt: 0,

            // the solve being replayed
            solve: {
                cubeSize: 2,
                scramble: {
                    createdAt: '',
                },
                user: {
                    id: 0,
                    name: 'Anonymous',
                },
            },

            // tick interval
            tickInterval: 0,
        };
    },
    computed: {
        solution() {
            if (!this.solve) {
                return [];
            }
            
            return this.turns
                .filter(turn => !turn.match(/\d+\#[a-zA-Z]+/))
                .map(rawTurn => {
                    const [ time, turn ] = rawTurn.split(':');
                    return {
                        time: parseInt(time, 10),
                        turn,
                    };
                });
        },
        startTime() {
            const event = this.turns.find(turn => turn.match(/\d+\#START/));

            return event
                ? parseInt(event.split('#')[0], 10)
                : 0;
        },
        time() {
            if (this.isComplete) {
                return this.solve.time;
            }
            
            if (this.isSolving) {
                return this.now - this.solveStartedAt;
            }
            
            return 0;
        },
        turns() {
            return this.solve.solution.split(' ').map(turn => turn.trim());
        },
        user() {
            return this.solve.user;
        },
    },
    methods: {
        completeSolve() {
            this.stopTicking();

            this.isComplete = true;
        },
        fetchSolve() {
            this.isLoading = true;

            getSolve(this.$route.params.id).then((response) => {
                // success
                this.solve = response.data.solve;
            }).finally(() => {
                // complete
                this.isLoading = false;
                this.reset();
            });
        },
        replay() {
            // start the inspection
            this.reset();
            this.startInspection();

            // and queue each turn in the solve
            this.solution.forEach(({ time, turn }) => {
                setTimeout(() => this.$refs.puzzle.turn(turn), time);
            });
        },
        reset() {
            const state = JSON.parse(this.solve.scramble.scrambledState);

            this.$refs.puzzle.setCubeState(state);
        },
        startInspection() {
            this.isComplete = false;
            this.isInspecting = true;

            setTimeout(() => {
                this.isInspecting = false;

                this.startSolve();
            }, this.startTime);
        },
        startSolve() {
            this.isSolving = true;
            this.solveStartedAt = Date.now();

            this.startTicking();

            setTimeout(() => {
                this.isSolving = false;

                this.completeSolve();
            }, this.solve.time);
        },
        startTicking() {
            this.tickInterval = setInterval(this.tick, 5);
        },
        stopTicking() {
            clearInterval(this.tickInverval);
        },
        tick() {
            this.now = Date.now();
        },
    },
};
</script>