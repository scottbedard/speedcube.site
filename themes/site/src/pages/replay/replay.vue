<template>
    <v-page padded>
        <v-margin padded>
            <!-- header -->
            <h1
                v-if="!loading"
                class="font-thin text-center">
                <div class="mb-4 text-grey-5">{{ solve.user.username }}</div>
                <div class="flex flex-wrap justify-center text-base text-grey-5">
                    <div class="w-full md:w-auto">{{ solve.time | shortTimer }} seconds</div>
                    <div class="w-full px-4 md:w-auto">&mdash;</div>
                    <div class="w-full md:w-auto">{{ solve.createdAt | datestamp }}</div>
                </div>
            </h1>

            <!-- puzzle -->
            <div class="mb-4">
                <v-puzzle
                    ref="puzzle"
                    :puzzle="puzzle"
                />
            </div>

            <v-fade-transition>
                <!-- inspecting -->
                <div
                    v-if="inspecting"
                    key="inspecting">
                    <!-- @todo: add countdown clock -->
                </div>

                <!-- solving -->
                <div
                    v-else-if="solving || solved"
                    key="solving">
                    <v-timer
                        :started-at="startedAt"
                        :display-time="time"
                    />

                    <v-fade-transition>
                        <div
                            v-if="solved"
                            class="font-thin mt-4 text-center text-grey-5">
                            <!-- press space to replay -->
                        </div>
                    </v-fade-transition>
                </div>

                <!-- ready -->
                <div
                    v-else
                    class="text-center"
                    key="ready">
                    <v-button @click="replay">
                        Replay
                    </v-button>
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import { getSolve } from '@/app/repositories/solves';
import { cleanTimeout } from '@/app/utils/component';
import { get } from 'lodash-es';

export default {
    created() {
        this.fetchSolve();
    },
    data() {
        return {
            // loading state for the initial fetch
            loading: false,

            // set to true when replaying inspection phase
            inspecting: false,

            // set to true when the replay is running
            playing: false,

            // time that the current replay started at
            startedAt: 0,

            // the solve being replayed
            solve: {},

            // set to true after after solved
            solved: false,

            // set to true when replaying solving phase
            solving: false,

            // clock time
            time: null,

            // settimeout ids to from current replay
            timeoutIds: [],
        };
    },
    computed: {
        puzzle() {
            // get the puzzle from our scramble
            return get(this.solve, 'scramble.puzzle', '');
        },
        solution() {
            return get(this.solve, 'solution', '').split(' ').map(move => {
                const [offset, turnOrEvent] = move.split(/[:#]/);

                const turn = move.includes(':') && turnOrEvent;
                const event = move.includes('#') && turnOrEvent;
                
                return {
                    event,
                    offset: parseInt(offset, 10),
                    turn,
                };
            });
        },
    },
    methods: {
        beginInspection() {
            this.inspecting = true;

            for (let i = 0, end = this.solution.length; i < end; i += 1) {
                const { event, offset, turn } = this.solution[i];

                // turn the puzzle
                if (turn) {
                    this.queueTimeout(() => {
                        this.$refs.puzzle.turn(turn);
                    }, offset);
                } 
                
                // transition to the solving phase
                else if (event === 'START') {
                    this.queueTimeout(() => {
                        this.beginSolve(offset, this.solution.slice(i + 1));
                    }, offset);

                    return;
                }
            }
        },
        beginSolve(startTime, remainingMoves) {
            if (!this.inspecting) {
                return;
            }

            this.startedAt = Date.now();
            this.inspecting = false;
            this.solving = true;

            // animate the remaining moves
            remainingMoves.forEach((move) => {
                const { event, offset, turn } = move;

                if (turn) {
                    this.queueTimeout(() => {
                        this.$refs.puzzle.turn(turn);
                    }, offset - startTime);
                }
            });

            // add a ticking clock for the duration of the solve
            this.queueTimeout(() => {
                console.log('done');
                this.completedSolve();
            }, this.solve.time);
        },
        clearTimeouts() {
            this.timeoutIds.forEach(id => window.clearTimeout(id));

            this.timeoutIds = [];
        },
        completedSolve() {
            if (!this.solving) {
                return;
            }

            this.solving = false;
            this.solved = true;
            this.time = this.solve.time;
        },
        fetchSolve() {
            this.loading = true;

            getSolve(this.$route.params.id).then((response) => {
                // success
                const { solve } = response.data;

                this.solve = solve;
            }, () => {
                // failed
            }).finally(() => {
                // complete
                this.loading = false;
                this.$refs.puzzle.applyState(this.solve.scramble.scrambledState);
            });
        },
        replay() {
            this.clearTimeouts();

            this.inspecting = false;
            this.playing = true;
            this.solved = false;
            this.solving = false;
            this.startedAt = 0;
            this.time = null;

            this.beginInspection();
        },
        queueTimeout(fn, delay) {
            this.timeoutIds.push(window.setTimeout(fn, delay));
        },
    },
};
</script>
