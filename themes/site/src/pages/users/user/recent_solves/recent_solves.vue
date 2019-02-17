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
                    <!-- chart -->
                    <v-scatter-chart
                        :chart-data="chartData"
                        :height="240"
                        :options="chartOptions"
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
    computed: {
        chartData() {
            return {
                datasets: [
                    // solve points
                    ...this.solvedPuzzles.map(puzzle => {
                        return {
                            label: puzzles[puzzle].title,
                            fill: false,
                            backgroundColor: puzzles[puzzle].color,
                            pointRadius: 5,
                            pointHoverRadius: 6,
                            data: this.groupedSolves[puzzle]
                                .filter(solve => !this.isHidden(solve.scramble.puzzle))
                                .map(solve => ({
                                    solve,
                                    x: moment(solve.createdAt, timestampFormat).unix(),
                                    y: solve.time,
                                }))
                        };
                    }),
                ],
            };
        },
        chartOptions() {
            const vm = this;

            return {
                hover: {
                    onHover(e) {
                        const point = this.getElementAtEvent(e);

                        if (point.length) {
                            e.target.style.cursor = 'pointer';
                        } else {
                            e.target.style.cursor = 'default';
                        }
                    },
                },
                legend: {
                    display: false,
                },
                maintainAspectRatio: false,
                onClick(e) {
                    const point = this.getElementAtEvent(e)[0];

                    if (point) {
                        const { _datasetIndex, _index } = point;
                        const solve = vm.findSolveInChartData(_datasetIndex, _index);

                        if (solve) {
                            vm.onSolveClick(solve);
                        }
                    }
                },
                responsive: true,
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: '#7B8794',
                                callback: val => moment.unix(val).format('MMM D'),
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                maxTicksLimit: 6,
                                fontColor: '#7B8794',
                                callback: val => {
                                    if (val === 0) {
                                        return '';
                                    }

                                    if (val < 60000) {
                                        const sec = Math.floor(val / 1000);

                                        return `0:${String(sec).padStart(2, '0')}`;
                                    }

                                    const min = Math.floor(val / 60000);
                                    const sec = Math.floor((val % 60000) / 1000);

                                    return `${min}:${String(sec).padStart(2, '0')}`;
                                },
                            },
                        },
                    ],
                },
                tooltips: {
                    backgroundColor: '#1F2933',
                    bodyFontColor: '#CBD2D9',
                    bodyFontFamily: "'Open Sans', 'system-ui', 'BlinkMacSystemFont', '-apple-system', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
                    bodyFontSize: 14,
                    callbacks: {
                        label: (obj) => {
                            const { datasetIndex, index } = obj;
                            const solve = this.findSolveInChartData(datasetIndex, index);

                            return solve
                                ? formatShortTimeSentence(solve.time)
                                : 'Error';
                        },
                        title: (obj) => {
                            const { datasetIndex, index } = obj[0];
                            const solve = this.findSolveInChartData(datasetIndex, index);

                            return solve
                                ? `${puzzles[solve.scramble.puzzle].title} - ${moment(solve.createdAt, timestampFormat).format('MMM Do YYYY')}`
                                : '';
                        },
                    },
                    caretSize: 12,
                    cornerRadius: 3,
                    displayColors: false,
                    titleFontColor: '#CBD2D9',
                    titleFontSize: 14,
                    titleMarginBottom: 8,
                    xPadding: 12,
                    yPadding: 12,
                },
            };
        },
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
        findSolveInChartData(datasetIndex, index) {
            return get(this.chartData, `datasets[${datasetIndex}].data[${index}].solve`);
        },
        onSolveClick(solve) {
            this.$router.push({
                name: 'replay',
                params: {
                    id: solve.id,
                },
            });
        },
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
