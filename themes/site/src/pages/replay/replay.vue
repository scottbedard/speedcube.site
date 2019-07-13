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
                    <div class="max-w-sm mx-auto">
                        <v-replay
                            :config="config"
                            :progress="progress"
                            :scrambled-state="scrambledState"
                            :solution="solution"
                            :type="puzzleType"
                        />
                    </div>

                    <div class="py-4">
                        <v-range-input
                            class="max-w-lg w-full"
                            v-model="progress"
                            :min="0"
                            :max="1"
                            :step="0.000001"
                        /><br />

                        {{ progress }}
                    </div>

                    <!-- <pre class="text-xs text-left">{{ solve }}</pre> -->

                    <div>
                        <v-button>Watch Replay</v-button>
                    </div>
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import { bindExternalEvent } from 'spyfu-vue-utils';
import { get } from 'lodash-es';
import { getSolve } from '@/app/repositories/solves';

export default {
    created() {
        this.fetchSolve();

        bindExternalEvent(this, document.body, 'keyup', this.onKeyup);
    },
    data() {
        return {
            // progress of the replay, 0 to 1
            progress: 0,

            // the solve being replayed
            solve: null,

            // loading state for initial solve request
            solveLoading: false,
        };
    },
    computed: {
        config() {
            return get(this.solve, 'config');
        },
        puzzleType() {
            return get(this.solve, 'scramble.puzzle');
        },
        scrambledState() {
            return get(this.solve, 'scramble.scrambledState');
        },
        solution() {
            return get(this.solve, 'solution');
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
    },
};
</script>
