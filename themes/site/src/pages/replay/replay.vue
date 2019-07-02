<template>
    <v-page padded>
        <v-margin padded>
            <template v-if="!loading">
                <h1 class="mb-8 text-center">
                    <router-link
                        v-if="username"
                        class="text-grey-8 hover:text-grey-10"
                        :to="{
                            name: 'users:show',
                            params: {
                                username
                            },
                        }">
                        {{ username }}
                    </router-link>
                    <span v-else>Guest</span>
                </h1>

                <div class="flex flex-wrap -mx-8 -my-4 justify-center overflow-hidden text-center">
                    <!-- date -->
                    <div class="px-8 py-4">
                        <div class="font-bold leading-normal mb-1 text-xs text-grey-6 tracking-wide uppercase">Date</div>
                        <time class="text-lg text-grey-8" :datetime="solve.createdAt">{{ createdAt | datestamp }}</time>
                    </div>

                    <!-- time -->
                    <div class="px-8 py-4">
                        <div class="font-bold leading-normal mb-1 text-xs text-grey-6 tracking-wide uppercase">Time</div>
                        <div class="text-lg text-grey-8">{{ solve.time | shortTimer }}</div>
                    </div>

                    <!-- total turns -->
                    <div class="px-8 py-4">
                        <div class="font-bold leading-normal mb-1 text-xs text-grey-6 tracking-wide uppercase">Turns</div>
                        <div class="text-lg text-grey-8">{{ solve.moves }}</div>
                    </div>

                    <!-- turns per sec -->
                    <div class="px-8 py-4">
                        <div class="font-bold leading-normal mb-1 text-xs text-grey-6 tracking-wide uppercase">Turns Per Second</div>
                        <div class="text-lg text-grey-8">{{ turnsPerSecond }}</div>
                    </div>
                </div>

                <div class="flex justify-center my-8">
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
                            <div v-if="solved">
                                <div class="font-thin mt-4 text-center text-grey-6">
                                    press space to watch again
                                </div>
                                <div class="max-w-sm mt-12 mx-auto">
                                    <v-comments
                                        type="solve"
                                        :id="solve.id"
                                        @blur="commentFocus = false"
                                        @focus="commentFocus = true"
                                    />
                                </div>
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
                            class="leading-loose max-w-md mb-8 mx-auto text-grey-7 text-grey-6 tracking-wide"
                        />
                        <div class="flex flex-wrap justify-center overflow-hidden">
                            <div class="mb-8 px-4">
                                <v-button primary @click="replay">Watch Replay</v-button>
                            </div>
                            <div class="px-4">
                                <v-button :to="{ name: 'users:show', params: { username }}">View Stats</v-button>
                            </div>
                        </div>

                        <!-- comments -->
                        <div class="max-w-sm mt-12 mx-auto">
                            <v-comments
                                type="solve"
                                :id="solve.id"
                                @blur="commentFocus = false"
                                @focus="commentFocus = true"
                            />
                        </div>
                    </div>
                </v-fade-transition>
            </template>
        </v-margin>
    </v-page>
</template>

<script>
import { bindExternalEvent, componentTimeout } from 'spyfu-vue-utils';
import { formatShortTimeSentence } from '@/app/utils/string';
import { getSolve, getRandomSolve, postReplay } from '@/app/repositories/solves';
import { jsonToObject } from '@/app/utils/object';
import { get, round } from 'lodash-es';

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
            // if the comments field is focused
            commentFocus: false,

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
        turnsPerSecond() {
            return round(1000 / this.solve.averageSpeed, 2);
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
                    componentTimeout(this, () => {
                        this.$options.puzzle.turn(turn);
                    }, offset);
                }

                // transition to the solving phase
                else if (event === 'START') {
                    componentTimeout(this, () => {
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
                    componentTimeout(this, () => {
                        this.$options.puzzle.turn(turn);
                    }, offset - startTime);
                }
            });

            // add a ticking clock for the duration of the solve
            componentTimeout(this, () => {
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

            if (this.$route.query.mode === 'theater') {
                componentTimeout(this, () => {
                    this.loading = true;

                    getRandomSolve().then((response) => {
                        // success
                        const solve = get(response, 'data.solve', {});
                        const id = get(solve, 'id', 0);

                        this.$router.replace({
                            name: 'replay',
                            params: { id },
                            query: {
                                mode: 'theater',
                            },
                        });

                        this.solve = solve;

                        this.replay();
                    }, () => {
                        // complete
                        this.loading = false;
                    });
                }, 2000);
            }
        },
        fetchSolve() {
            this.loading = true;

            getSolve(this.$route.params.id).then((response) => {
                // success
                const { solve } = response.data;

                this.solve = solve;

                if (this.$route.query.mode === 'theater') {
                    this.replay();
                }
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
            // do nothing if the comment field is focused
            if (this.commentFocus) {
                return;
            }

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
            postReplay(this.solve.id);

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
