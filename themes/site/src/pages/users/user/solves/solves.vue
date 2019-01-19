<template>
    <v-card padded>
        <v-scatter-chart
            :chart-data="chartData"
            :height="240"
            :options="chartOptions"
        />
    </v-card>
</template>

<script>
import moment from 'moment';
import { formatSolveTime } from '@/app/utils/number';
import { puzzles, timestampFormat } from '@/app/constants';
import { get } from 'lodash-es';

export default {
    computed: {
        chartData() {
            return {
                datasets: this.solvedPuzzles.map(puzzle => {
                    return {
                        label: puzzle,
                        fill: false,
                        backgroundColor: puzzles[puzzle].color,
                        pointRadius: 4,
                        pointHoverRadius: 5,
                        data: this.groupedSolves[puzzle].map(solve => {
                            return {
                                solve,
                                x: moment(solve.createdAt, timestampFormat).unix(),
                                y: solve.time,
                            };
                        }),
                    }
                }),
            }
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
                                callback: val => val > 0 ? `${(val / 1000)}s` : '',
                            },
                        },
                    ],
                },
                tooltips: {
                    enabled: true,
                    callbacks: {
                        label: (obj) => {
                            const { datasetIndex, index } = obj;
                            const solve = this.findSolveInChartData(datasetIndex, index);
                            
                            return solve
                                ? formatSolveTime(solve.time)
                                : 'Error';
                        },
                        title: (obj) => {
                            const { datasetIndex, index } = obj[0];
                            const solve = this.findSolveInChartData(datasetIndex, index);

                            return solve
                                ? `${moment(solve.createdAt, timestampFormat).format('MMM Do YYYY')}`
                                : '';
                        }
                    },
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
