<style lang="scss" scoped>
    .empty {
        @screen lg {
            min-height: 240px;
        }
    }
</style>

<template>
    <div>
        <h3 class="mb-4 text-grey-6 text-xl">Recent Solves</h3>
        <v-card padded>
            <div class="flex items-center justify-center">
                <div
                    v-if="solves.length > 0"
                    key="chart"
                    class="w-full">
                    <!-- scatter chart -->
                    <v-solves-scatter-chart
                        :grouped-solves="groupedSolves"
                        :is-hidden="isHidden"
                        :solved-puzzles="solvedPuzzles"
                        :solves="solves"
                    />

                    <!-- legend -->
                    <div class="flex leading-normal mt-8">
                        <a
                            v-for="puzzle in solvedPuzzles"
                            class="flex items-center mr-6 text-grey-6 text-xs tracking-wide hover:text-grey-7"
                            href="#"
                            :key="puzzle"
                            @click.prevent="toggle(puzzle)">
                            <i
                                class="fa fa-circle mr-2"
                                :style="{
                                    color: isHidden(puzzle) ? undefined : puzzles[puzzle].color,
                                }"
                            />
                            <span
                                v-text="puzzles[puzzle].title"
                                :class="{
                                    'text-grey-7': !isHidden(puzzle),   
                                }"
                            />
                        </a>
                    </div>
                </div>
                <div
                    v-else
                    class="empty flex items-center justify-center leading-normal text-center text-grey-6 w-full"
                    key="empty">
                    There have been no recent solves.
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
import moment from 'moment';
import solvesScatterChart from './solves_scatter_chart/solves_scatter_chart.vue';
import { formatShortTime, formatShortTimeSentence } from '@/app/utils/string';
import { puzzles, timestampFormat } from '@/app/constants';
import { get, sortBy } from 'lodash-es';

export default {
    data() {
        return {
            // array of puzzle ids not to display in the scatter plot
            hidden: [],
        };
    },
    components: {
        'v-solves-scatter-chart': solvesScatterChart,
    },
    computed: {
        groupedSolves() {
            return this.solves.reduce((acc, solve) => {
                const puzzle = get(solve, 'scramble.puzzle', 'unknown');

                if (!Array.isArray(acc[puzzle])) {
                    acc[puzzle] = [];
                }

                acc[puzzle].push(solve);

                return acc;
            }, {});
        },
        isHidden() {
            return puzzle => this.hidden.includes(puzzle);
        },
        puzzles() {
            return puzzles;
        },
        solvedPuzzles() {
            return sortBy(Object.keys(this.groupedSolves));
        },
    },
    methods: {
        toggle(puzzle) {
            if (this.isHidden(puzzle)) {
                this.hidden = this.hidden.filter(hiddenPuzzle => hiddenPuzzle !== puzzle);
            } else {
                this.hidden.push(puzzle);
            }
        },
    },
    props: [
        'solves',
    ],
};
</script>
