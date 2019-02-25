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
                    <div class="mb-8">
                        <v-solves-scatter-chart
                            :grouped-solves="groupedSolves"
                            :is-hidden="isHidden"
                            :solved-puzzles="solvedPuzzles"
                            :solves="solves"
                        />
                    </div>

                    <!-- doughnut chart / legend -->
                    <div>
                        <v-solves-doughnut-chart
                            :grouped-solves="groupedSolves"
                            :is-hidden="isHidden"
                            @toggle="toggle"
                        />
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
import { get, sortBy } from 'lodash-es';
import { puzzles } from '@/app/constants';
import solvesDoughnutChartComponent from './solves_doughnut_chart/solves_doughnut_chart.vue';
import solvesScatterChartComponent from './solves_scatter_chart/solves_scatter_chart.vue';

export default {
    data() {
        return {
            // array of puzzle ids not to display in the scatter plot
            hidden: [],
        };
    },
    components: {
        'v-solves-doughnut-chart': solvesDoughnutChartComponent,
        'v-solves-scatter-chart': solvesScatterChartComponent,
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
