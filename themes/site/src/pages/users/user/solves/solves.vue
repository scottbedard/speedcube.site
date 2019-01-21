<template>
    <div>
        <h3 class="mb-4 text-grey-6 text-xl">Recent solves</h3>
        <v-card padded>
            <v-scatter-chart
                :chart-data="chartData"
                :height="240"
                :options="chartOptions"
            />
        </v-card>
    </div>
</template>

<script>
import moment from 'moment';
import { formatShortTimeSentence } from '@/app/utils/string';
import { puzzles, timestampFormat } from '@/app/constants';
import { get } from 'lodash-es';

export default {
    computed: {
        chartData() {
            return {
                datasets: this.solvedPuzzles.map(puzzle => ({
                    label: puzzle,
                    fill: false,
                    backgroundColor: puzzles[puzzle].color,
                    pointRadius: 5,
                    pointHoverRadius: 6,
                    data: this.groupedSolves[puzzle].map(solve => ({
                        solve,
                        x: moment(solve.createdAt, timestampFormat).unix(),
                        y: solve.time,
                    })),
                })),
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
                    labels: {
                        boxWidth: 16,
                        fontColor: '#7B8794',
                        fontSize: 14,
                        padding: 20,
                    },
                    position: 'bottom',
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
                                fontColor: '#7B8794',
                                callback: val => (val > 0 ? `${(val / 1000)}s` : ''),
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
        solvedPuzzles() {
            return Object.keys(this.groupedSolves);
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
    },
    props: [
        'solves',
    ],
};
</script>
