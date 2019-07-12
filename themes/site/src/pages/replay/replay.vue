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
                <div v-else data-solve-ready key="solveReady">

                    <!-- put our puzzle inside a responsive square -->
                    <div class="max-w-sm mx-auto">
                        <div class="border-4 border-dotted border-grey-4 pb-full relative">
                            <v-puzzle
                                :config="puzzleConfig"
                                :initial-state="scrambledState"
                                :type="puzzleType"
                            />
                        </div>
                    </div>
                    <pre class="text-xs">config: {{ puzzleConfig }}</pre>
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import puzzleComponent from '@/components/puzzle/puzzle.vue';
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
            // the solve being replayed
            solve: null,

            // loading state for initial solve request
            solveLoading: false,
        };
    },
    components: {
        'v-puzzle': puzzleComponent,
    },
    computed: {
        puzzleConfig() {
            const config = get(this.solve, 'config', '{}');

            if (config) {
                try {
                    return JSON.parse(config);
                } catch (e) {
                    console.warn('Malformed puzzle config', config)
                }
            }

            return {};
        },
        puzzleType() {
            return get(this.solve, 'scramble.puzzle', 'unknown');
        },
        scrambledState() {
            return get(this.solve, 'scramble.scrambledState');
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
        onKeyup(e) {
            // ...
        },
    },
};
</script>
