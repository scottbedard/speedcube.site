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
                    <div class="max-w-sm mb-8 mx-auto">
                        <div class="border-4 border-dotted border-grey-4 pb-full relative">
                            <v-puzzle
                                :config="puzzleConfig"
                                :initial-state="scrambledState"
                                :model="model"
                                :type="puzzleType"
                                @ready="storePuzzle"
                            />
                        </div>
                    </div>

                    <div>
                        <v-button>Watch Replay</v-button>
                    </div>
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import Cube from 'bedard-cube';
import puzzleComponent from '@/components/puzzle/puzzle.vue';
import { applyCubeState, isCube } from '@/app/utils/puzzle';
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
            // puzzle model
            model: null,

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
        createModel() {
            // create a model to represent our puzzle
            let model = null;

            // cube
            if (isCube(this.puzzleType)) {
                const size = parseInt(this.puzzleType);

                model = new Cube(size, { useObjects: true });

                if (this.scrambledState) {
                    applyCubeState(model, this.scrambledState);
                }
            }

            this.model = model;
        },
        fetchSolve() {
            this.solveLoading = true;

            getSolve(this.$route.params.id).then((response) => {
                // success
                const { solve } = response.data;

                this.solve = solve;
                this.createModel();
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
        storePuzzle(puzzle) {
            // store a reference to our puzzle so we can manipulate it
            this.$options.puzzle = puzzle;
        },
    },
};
</script>
