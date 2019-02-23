<template>
    <div>
        <v-fade-transition>
            <div v-if="!loading">
                <v-puzzle
                    :config="puzzleConfig"
                    :puzzle="puzzle"
                    :turn-duration="scramblingTurnDuration"
                    @ready="onReady">
                </v-puzzle>
                <router-link
                    class="font-thin leading-normal text-lg"
                    :to="{
                        name: 'replay',
                        params: {
                            id: solve.id,
                        },
                    }">
                    Click to see {{ username ? `${username}'s` : 'the' }} record {{ time }} solve
                </router-link>
            </div>
        </v-fade-transition>
    </div>
</template>

<script>
import { formatShortTimeSentence } from '@/app/utils/string';
import { getHighlightedSolve } from '@/app/repositories/solves';
import { jsonToObject } from '@/app/utils/object';
import { puzzles } from '@/app/constants';
import { get } from 'lodash-es';

export default {
    created() {
        this.fetchHighlightedSolve();
    },
    data() {
        return {
            loading: false,
            scrambling: false,
            solve: {},
        };
    },
    computed: {
        puzzle() {
            return get(this.solve, 'scramble.puzzle', '3x3');
        },
        puzzleConfig() {
            return jsonToObject(get(this.solve, 'config'));
        },
        puzzleTitle() {
            const puzzleId = get(this.solve, 'scramble.puzzle');

            return get(puzzles, `${puzzleId}.title`);
        },
        scrambleLength() {
            return this.scrambleTurns.length;
        },
        scrambleTurns() {
            return get(this.solve, 'scramble.scramble', '').split(' ');
        },
        scramblingTurnDuration() {
            return 100;
        },
        scrambledState() {
            return jsonToObject(get(this.solve, 'scramble.scrambledState'));
        },
        solveTime() {
            return get(this.solve, 'time', 0);
        },
        time() {
            return formatShortTimeSentence(this.solveTime);
        },
        username() {
            return get(this.solve, 'user.username');
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
            this.$options.puzzle.applyState(this.scrambledState);
        },
    },
};
</script>
