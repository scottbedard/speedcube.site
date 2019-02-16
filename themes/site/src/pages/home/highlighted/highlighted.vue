<template>
    <div>
        <v-fade-transition>
            <div v-if="loading" key="loading">
                <v-spinner />
            </div>

            <div v-else key="puzzle">
                <v-puzzle
                    :config="puzzleConfig"
                    :puzzle="puzzle"
                    :turn-duration="scramblingTurnDuration"
                    @ready="onReady"
                />
            </div>
        </v-fade-transition>
    </div>
</template>

<script>
import { jsonToObject } from '@/app/utils/object';
import { get } from 'lodash-es';
import { getHighlightedSolve } from '@/app/repositories/solves';
import { componentTimeout } from 'spyfu-vue-utils';

export default {
    created() {
        this.fetchHighlightedSolve();
    },
    data() {
        return {
            scrambling: false,
            solve: {},
            loading: false,
        };
    },
    computed: {
        puzzle() {
            return get(this.solve, 'scramble.puzzle', '3x3');
        },
        puzzleConfig() {
            return jsonToObject(get(this.solve, 'config'));
        },
        scrambleLength() {
            return this.scrambleTurns.length;
        },
        scrambleTurns() {
            return get(this.solve, 'scramble.scramble', '').split(' ');
        },
        scramblingTurnDuration() {
            return 200;
        },
        scrambledState() {
            return jsonToObject(get(this.solve, 'scramble.scrambledState'));
        },
    },
    methods: {
        fetchHighlightedSolve() {
            this.loading = true;

            getHighlightedSolve().then((response) => {
                // success
                this.solve = response.data.solve;
            }).finally(() => {
                this.loading = false;
            });
        },
        onReady(puzzle) {
            this.$options.puzzle = puzzle;
            
            // begin scrambling the puzzle
            this.scrambling = true;

            this.scrambleTurns.forEach((turn, index) => {
                const delay = this.scramblingTurnDuration * index;

                componentTimeout(this, () => {
                    this.$options.puzzle.turn(turn);
                }, delay);

                if (index === this.scrambleLength - 1) {
                    componentTimeout(this, () => {
                        this.scrambling = false;
                    }, delay);
                }
            });
        },
    },
};
</script>
