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
import { timestampFormat } from '@/app/constants';

export default {
    computed: {
        chartData() {
            return {
                datasets: [
                    {
                        label: '3x3',
                        fill: false,
                        backgroundColor: '#ff0000',
                        data: this.solves.map(solve => {
                            return {
                                x: moment(solve.createdAt, timestampFormat).unix(),
                                y: solve.time,
                            }
                        }),
                    },
                ],
            };
        },
        chartOptions() {
            return {
                maintainAspectRatio: false,
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
                        label: ({ index }) => {
                            const solve = this.solves[index];
                            
                            return formatSolveTime(solve.time);
                        },
                    },
                },
            };
        },
    },
    props: [
        'solves',
    ],
};
</script>
