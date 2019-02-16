<template>
    <v-page padded>
        <v-margin padded>
            <template v-if="!loading">
                <!-- header -->
                <h1 class="font-thin mb-4 text-center text-grey-6">
                    <template v-if="username">
                        <router-link class="text-grey-6" :to="{ name: 'users', params: { username }}">{{ username }}'s</router-link>
                    </template>
                    <template v-else>
                        A guest's
                    </template>
                    {{ solveTitle }} solve
                </h1>

                <div class="text-center text-grey-6">
                    <time :datetime="solve.createdAt">{{ createdAt | datestamp }}</time>
                </div>
            </template>

            <!-- puzzle -->
            <div class="mb-4">
                <v-puzzle
                    :config="puzzleConfig"
                    :puzzle="puzzle"
                    @ready="onReady"
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
                    <div
                        class="font-thin text-center text-4xl trans-color"
                        :class="{
                            'text-grey-6': playing,
                            'text-grey-7': !playing,
                        }">
                        <v-timer
                            :started-at="startedAt"
                            :display-time="time"
                        />
                    </div>

                    <v-fade-transition>
                        <div
                            v-if="solved"
                            class="font-thin mt-4 text-center text-grey-6">
                            press space to watch again
                        </div>
                    </v-fade-transition>
                </div>

                <!-- ready -->
                <div
                    v-else
                    class="text-center"
                    key="ready">
                    <div
                        v-text="scrambleText"
                        class="font-mono font-thin leading-loose max-w-md mx-auto leading-normal mb-12 text-grey-6 text-sm"
                    />
                    <v-button @click="replay">
                        Watch
                    </v-button>
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import { bindExternalEvent, cleanTimeout, clearCleanTimeouts } from '@/app/utils/component';
import { formatShortTimeSentence } from '@/app/utils/string';
import { getSolve } from '@/app/repositories/solves';
import { jsonToObject } from '@/app/utils/object';
import { get } from 'lodash-es';

export default {
    created() {
        this.fetchSolve();

        bindExternalEvent(this, document.body, 'keyup', this.onKeyup);


        if (typeof this.$route.query.autoplay !== 'undefined') {
            this.inspecting = true;
        }
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
        };
    },
    computed: {
        createdAt() {
            return get(this.solve, 'createdAt', '');
        },
        puzzle() {
            return get(this.solve, 'scramble.puzzle', '');
        },
        puzzleConfig() {
            return jsonToObject(get(this.solve, 'config', '{}'));
        },
        scrambleText() {
            return get(this.solve, 'scramble.scramble', '');
        },
        solveTitle() {
            const time = get(this.solve, 'time', 0);

            return formatShortTimeSentence(time);
        },
        solution() {
            return get(this.solve, 'solution', '').split(' ').map((move) => {
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
        username() {
            return get(this.solve, 'user.username', '');
        },
    },
    methods: {
        applyScrambledState() {
            if (this.$options.puzzle) {
                this.$options.puzzle.applyState(this.solve.scramble.scrambledState);
            }
        },
        beginInspection() {
            this.inspecting = true;

            for (let i = 0, end = this.solution.length; i < end; i += 1) {
                const { event, offset, turn } = this.solution[i];

                // turn the puzzle
                if (turn) {
                    cleanTimeout(this, () => {
                        this.$options.puzzle.turn(turn);
                    }, offset);
                }

                // transition to the solving phase
                else if (event === 'START') {
                    cleanTimeout(this, () => {
                        this.beginSolve(offset, this.solution.slice(i + 1));
                    }, offset);

                    // return here to short-circuit the loop, remaining
                    // turns will be queued in the beginSolve method.
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
                const { offset, turn } = move;

                if (turn) {
                    cleanTimeout(this, () => {
                        this.$options.puzzle.turn(turn);
                    }, offset - startTime);
                }
            });

            // add a ticking clock for the duration of the solve
            cleanTimeout(this, () => {
                this.completedSolve();
            }, this.solve.time);
        },
        completedSolve() {
            if (!this.solving) {
                return;
            }

            this.playing = false;
            this.solved = true;
            this.solving = false;
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
                this.$router.push({
                    name: 'solve',
                    params: {
                        puzzle: '3x3',
                    },
                });
            }).finally(() => {
                // complete
                this.loading = false;
            });
        },
        onKeyup(e) {
            // replay the solve on space when not already playing
            if (e.key === ' ') {
                this.replay();
            }
        },
        onReady(puzzle) {
            this.$options.puzzle = puzzle;

            this.applyScrambledState();

            if (typeof this.$route.query.autoplay !== 'undefined') {
                this.$router.replace({ query: { autoplay: undefined } });

                this.replay();
            }
        },
        replay() {
            clearCleanTimeouts(this);

            this.applyScrambledState();

            this.inspecting = false;
            this.playing = true;
            this.solved = false;
            this.solving = false;
            this.startedAt = 0;
            this.time = null;

            this.beginInspection();
        },
    },
};
</script>
