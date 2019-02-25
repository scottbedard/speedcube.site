<template>
    <div>
        <v-scatter-chart
            :chart-data="chartData"
            :height="240"
            :options="chartOptions"
        />
    </div>
</template>

<script>
import { get, sortBy } from 'lodash-es';
import moment from 'moment';
import { formatShortTime, formatShortTimeSentence } from '@/app/utils/string';
import { puzzles, timestampFormat } from '@/app/constants';

export default {
    computed: {
        chartData() {
            return {
                datasets: [
                    // solve points
                    ...this.solvedPuzzles.map(puzzle => {
                        return {
                            backgroundColor: puzzles[puzzle].color,
                            data: this.groupedSolves[puzzle]
                                .filter(solve => !this.isHidden(solve.scramble.puzzle))
                                .map(solve => ({
                                    solve,
                                    x: moment(solve.createdAt, timestampFormat).unix(),
                                    y: solve.time,
                                })),
                            fill: false,
                            label: puzzles[puzzle].title,
                            pointHoverRadius: 5,
                            pointRadius: 4,
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
        'groupedSolves',
        'isHidden',
        'solves',
        'solvedPuzzles',
    ],
};
</script>
