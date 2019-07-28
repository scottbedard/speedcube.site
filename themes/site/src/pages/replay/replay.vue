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

                    <!-- puzzle -->
                    <v-replay
                        v-slot="{ inspection, lastMove, puzzleParams }"
                        :config="config"
                        :progress="progress"
                        :scrambled-state="scrambledState"
                        :solution="solution"
                        :type="puzzleType">

                        <v-grid padded>

                            <!-- puzzle -->
                            <v-grid-cell md="8" lg="9">
                                <h1 class="text-center text-4xl">
                                    <router-link
                                        v-text="solve.user.username"
                                        class="text-grey-8 hover:text-grey-10"
                                        :to="{ name: 'users:show', params: { username }}"
                                    /> &bull; {{ solve.time | shortTimer }}
                                </h1>
                                <div class="mb-12 text-grey-7 text-lg text-center">
                                    <strong>{{ 'turn' | pluralize(solve.moves, true) }}</strong> at <strong>{{ turnsPerSec }}</strong> {{ turnsPerSec === 1 ? 'turn' : 'turns' }} per second
                                </div>

                                <div class="flex justify-center">
                                    <div class="max-w-sm mb-12 relative w-full">
                                        <div class="pb-full">
                                            <v-puzzle v-bind="puzzleParams" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="text-center">
                                    <v-fade-transition>
                                        <!-- inspection -->
                                        <div v-if="playing && inspection" key="inspection">
                                            inspection
                                        </div>

                                        <!-- solve -->
                                        <div v-else-if="playing" key="solve">
                                            <!-- <v-timer :max="24000" /> -->
                                            {{ Date.now() }}
                                        </div>

                                        <!-- idle -->
                                        <div v-else key="idle">
                                            <v-button @click="play(lastMove.time)">Watch Replay</v-button>
                                        </div>
                                    </v-fade-transition>
                                </div>
                            </v-grid-cell>

                            <!-- sidebar -->
                            <v-grid-cell md="4" lg="3">
                                <div class="leading-normal mb-8">
                                    <div class="mb-2 tracking-widest text-grey-6 text-xs uppercase">Scramble</div>
                                    <div class="tracking-widest">{{ solve.scramble.scramble }}</div>
                                </div>

                                <div class="leading-normal mb-8">
                                    <div class="mb-2 tracking-widest text-grey-6 text-xs uppercase">Inspection</div>
                                    <div class="tracking-widest">{{ readableInspection }}</div>
                                </div>

                                <div class="leading-normal">
                                    <div class="mb-2 tracking-widest text-grey-6 text-xs uppercase">Solution</div>
                                    <div class="tracking-widest">{{ readableSolution }}</div>
                                </div>
                            </v-grid-cell>
                        </v-grid>
                    </v-replay>
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import { bindExternalEvent, componentTimeout } from 'spyfu-vue-utils';
import { get, noop, round } from 'lodash-es';
import { animate } from '@/app/utils/function';
import { getSolve } from '@/app/repositories/solves';
import puzzleComponent from '@/components/puzzle/puzzle.vue';
import replayComponent from '@/components/ui/replay.vue';

export default {
    created() {
        this.fetchSolve();

        bindExternalEvent(this, document.body, 'keyup', this.onKeyup);
    },
    data() {
        return {
            // the current animation
            animation: { cancel: noop },

            // determine if the replay is playing or not
            playing: false,

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
    },
    computed: {
        config() {
            return get(this.solve, 'config');
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
        turnsPerSec() {
            return round(this.solve.averageSpeed / 1000, 1);
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
        onKeyup() {
            // ...
        },
        play(duration) {
            if (this.playing) {
                return;
            }

            this.playing = true;

            this.animation = animate((progress) => {
                this.progress = progress;
            }, duration);

            componentTimeout(this, () => {
                this.playing = false;
            }, duration);
        },
    },
};
</script>
