<template>
    <v-page padded>
        <v-margin padded>
            <v-fade-transition>
                <!-- loading -->
                <div
                    v-if="solveLoading"
                    class="text-center"
                    data-solve-loading
                    key="solveLoading">
                    <v-spinner />
                </div>

                <!-- ready -->
                <div
                    v-else
                    data-solve-ready
                    key="solveReady">
                    
                    <!-- title -->
                    <h1 class="flex justify-center text-center text-grey-8 text-4xl">
                        <router-link
                            v-if="solve.user"
                            v-text="solve.user.username"
                            class="no-underline hover:text-grey-9"
                            :to="{ name: 'users:show', params: { username }}"
                        />
                        <span v-else>Guest</span>
                        <span class="mx-4 text-grey-4">-</span>
                        <span>{{ solve.time | shortTimer }}</span>
                    </h1>

                    <!-- info -->
                    <div class="leading-normal mb-8 text-center text-grey-7 text-lg">
                        <div>
                            {{ 'turn' | pluralize(solve.moves, true) }} at {{ turnsPerSec }} {{ turnsPerSec === 1 ? 'turn' : 'turns' }} per second
                        </div>
                        <time class="font-bold text-grey-5 text-xs tracking-widest" :datetime="solveDate">{{ solve.createdAt | datestamp }}</time>
                    </div>

                    <!-- replay -->
                    <v-replay
                        v-slot="{ inspection, lastMove, puzzleParams }"
                        :config="config"
                        :progress="progress"
                        :scrambled-state="scrambledState"
                        :solution="solution"
                        :type="puzzleType">
                        <!-- puzzle -->
                        <div class="flex justify-center mb-8">
                            <div class="max-w-xs relative w-full">
                                <div class="pb-full">
                                    <v-puzzle v-bind="puzzleParams" />
                                </div>
                            </div>
                        </div>

                        <div class="text-center">
                            <v-fade-transition>
                                <div v-if="progress > 0 || playing">
                                    <v-fade-transition>
                                        <span
                                            v-if="inspecting"
                                            v-text="currentInspectionTime"
                                            class="text-grey-7 text-4xl"
                                            key="inspecting"
                                        />
                                        <span
                                            v-else
                                            v-text="currentSolveTime"
                                            class="text-grey-7 text-4xl"
                                            key="timer"
                                        />
                                    </v-fade-transition>
                                    <v-fade-transition>
                                        <div v-if="!playing" class="mt-8" key="idle">
                                            <v-button primary @click="play">
                                                Watch Again
                                            </v-button>
                                            <aside class="mt-16">
                                                <v-solve-details
                                                    :inspection="readableInspection"
                                                    :scramble="solve.scramble.scramble"
                                                    :solution="readableSolution"
                                                />
                                            </aside>
                                        </div>
                                    </v-fade-transition>
                                </div>
                                
                                <div v-else key="idle">
                                    <v-button primary @click="play">
                                        Watch Replay
                                    </v-button>
                                    <aside class="mt-16">
                                        <v-solve-details
                                            :inspection="readableInspection"
                                            :scramble="solve.scramble.scramble"
                                            :solution="readableSolution"
                                        />
                                    </aside>
                                </div>
                            </v-fade-transition>
                        </div>
                    </v-replay>
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import puzzleComponent from '@/components/puzzle/puzzle.vue';
import replayComponent from '@/components/ui/replay.vue';
import solveDetailsComponent from './solve_details/solve_details.vue';
import { bindExternalEvent, componentTimeout } from 'spyfu-vue-utils';
import { componentRafEase } from '@/app/utils/component';
import { formatShortTime } from '@/app/utils/string';
import { get, noop, round } from 'lodash-es';
import { getSolve, postReplay } from '@/app/repositories/solves';
import { linear } from '@/app/constants';

export default {
    created() {
        this.fetchSolve();

        bindExternalEvent(this, document.body, 'keyup', this.onKeyup);
    },
    data() {
        return {
            // the current animation
            animation: { cancel: noop },

            // set to true when the replay is complete
            complete: false,

            // playing state
            playing: false,

            // number of times the replay was played
            plays: 0,

            // progress of the replay, 0 to 1
            progress: 0,

            // the solve being replayed
            solve: null,

            // loading state for initial solve request
            solveLoading: false,
        };
    },
    destroyed() {
        this.animation.cancel();
    },
    components: {
        'v-puzzle': puzzleComponent,
        'v-replay': replayComponent,
        'v-solve-details': solveDetailsComponent,
    },
    computed: {
        config() {
            return get(this.solve, 'config', {});
        },
        currentInspectionTime() {
            return 15 - Math.round(this.currentTotalSolveTime / 1000);
        },
        currentSolveTime() {
            const startEvent = this.event('START');

            return startEvent
                ? formatShortTime(this.currentTotalSolveTime - startEvent.time)
                : 0;
        },
        currentTotalSolveTime() {
            return Math.round(this.totalSolveTime * this.progress);
        },
        event() {
            return eventName => this.moves.find(obj => obj.value === eventName);
        },
        inspecting() {
            const startEvent = this.event('START');

            return startEvent && this.currentTotalSolveTime < startEvent.time;
        },
        inspectionMoves() {
            const startIndex = this.moves.findIndex(event => event.value === 'START');

            return this.moves.slice(0, startIndex);
        },
        moves() {
            return this.solution.split(' ').map((move) => {
                const time = parseInt(move, 10);
                const value = move.slice(Math.floor(Math.log10(time)) + 2);

                let type = 'unknown';

                if (move.indexOf(':') > -1) {
                    type = 'turn';
                } else if (move.indexOf('#') > -1) {
                    type = 'event';
                }

                return { time, type, value };
            });
        },
        postInspectionMoves() {
            const startIndex = this.moves.findIndex(event => event.value === 'START');

            return this.moves.slice(startIndex + 1);
        },
        puzzleType() {
            return get(this.solve, 'scramble.puzzle');
        },
        readableInspection() {
            return this.inspectionMoves
                .filter(move => move.type === 'turn')
                .map(turn => turn.value)
                .join(' ');
        },
        readableSolution() {
            return this.postInspectionMoves
                .filter(move => move.type === 'turn')
                .map(move => move.value)
                .join(' ');
        },
        scramble() {
            return get(this.solve, 'scramble.scramble');
        },
        scrambledState() {
            return get(this.solve, 'scramble.scrambledState');
        },
        solution() {
            return get(this.solve, 'solution', '');
        },
        solveDate() {
            // '2019-01-01 00:00:00' => '2019-01-01'
            return get(this.solve, 'createdAt', '').split(' ').shift();
        },
        solving() {
            const startEvent = this.event('START');

            return startEvent && this.currentTotalSolveTime >= startEvent.time;
        },
        totalSolveTime() {
            // return the solve time, including inspection
            const end = this.moves.find(obj => obj.value === 'END');

            return end ? end.time : 0;
        },
        turnsPerSec() {
            return round(1000 / this.solve.averageSpeed, 1);
        },
        username() {
            return get(this.solve, 'user.username', '');
        },
    },
    methods: {
        fetchSolve() {
            this.solveLoading = true;

            getSolve(this.$route.params.id).then((response) => {
                // success
                const { solve } = response.data;

                this.solve = solve;
            }, () => {
                // failed
                this.$router.replace({ name: 'records' });
            }).finally(() => {
                // complete
                this.solveLoading = false;
            });
        },
        play() {
            if (!this.playing) {
                postReplay(this.solve.id);

                this.playing = true;

                componentRafEase(this, (progress) => {
                    this.progress = progress;

                    if (progress === 1) {
                        this.playing = false;
                    }
                }, this.totalSolveTime, linear);
            }
        },
    },
};
</script>
