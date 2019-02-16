<template>
    <div>
        <v-fade-transition :enter-duration="500">
            <div v-if="!loading">
                <v-puzzle
                    :config="puzzleConfig"
                    :puzzle="puzzle"
                    :turn-duration="scramblingTurnDuration"
                    @ready="onReady"
                />

                <div class="font-light text-grey-7">
                    <p class="font-thin mb-8 mt-8 text-grey-6 text-sm">
                        <template v-if="username">
                            <router-link :to="{ name: 'users', params: { username }}">{{ username }}</router-link>
                        </template>
                        <template v-else>
                            A guest
                        </template>
                        holds the current {{ puzzleTitle }} single record with this {{ time }} solve!
                    </p>
                    <v-button
                        primary
                        :to="{ name: 'replay', params: { id: solve.id }}">
                        Click to watch replay
                    </v-button>
                </div>
            </div>
        </v-fade-transition>
    </div>
</template>

<script>
import { jsonToObject } from '@/app/utils/object';
import { get } from 'lodash-es';
import { getHighlightedSolve } from '@/app/repositories/solves';
import { componentTimeout } from 'spyfu-vue-utils';
import { puzzles } from '@/app/constants';
import { formatShortTimeSentence } from '@/app/utils/string';

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
        }
    },
};
</script>
