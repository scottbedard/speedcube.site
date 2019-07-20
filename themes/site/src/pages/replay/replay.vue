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
                    class="text-center"
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

                        <!-- puzzle -->
                        <div class="flex flex-wrap justify-center">
                            <div
                                v-for="n in 3"
                                class="border-2 border-primary-5 m-4 relative w-full"
                                style="max-width: 320px"
                                :key="n">
                                <div class="pb-full">
                                    <v-puzzle v-bind="puzzleParams" />
                                </div>
                            </div>
                        </div>

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
                                <!-- controls -->
                                <div class="mb-12">
                                    <v-button @click="play(lastMove.time)">Watch Replay</v-button>
                                </div>

                                <!-- scramble and solution -->
                                <div class="leading-normal max-w-md mb-8 mx-auto text-left tracking-wide">
                                    <div class="mb-8">
                                        <div class="font-bold text-grey-4 text-xs uppercase">Scramble</div>
                                        <div class="text-grey-7">{{ scramble }}</div>
                                    </div>
                                    <div class="">
                                        <div class="font-bold text-grey-4 text-xs uppercase">Solution</div>
                                        <div class="text-grey-7">{{ cleanedSolution }}</div>
                                    </div>
                                </div>
                            </div>
                        </v-fade-transition>
                    </v-replay>
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import { bindExternalEvent, componentTimeout } from 'spyfu-vue-utils';
import { get, noop } from 'lodash-es';
import { animate } from '@/app/utils/function';
import { getSolve } from '@/app/repositories/solves';
import puzzleComponent from '@/components/puzzle/puzzle.vue';

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
    },
    computed: {
        cleanedSolution() {
            return this.moves
                .filter(move => move.type === 'turn')
                .map(move => move.value)
                .join(' ');
        },
        config() {
            return get(this.solve, 'config');
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
        puzzleType() {
            return get(this.solve, 'scramble.puzzle');
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
