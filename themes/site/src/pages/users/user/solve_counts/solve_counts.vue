<template>
    <v-card padded>
        <div class="relative">
            <v-doughnut-chart
                :chart-data="chartData"
                :options="chartOptions"
            />
            <div class="absolute font-thin pin-center text-xl text-grey-6">
                {{ totalSolves }} solves
            </div>
        </div>
    </v-card>
</template>

<script>
import { puzzles } from '@/app/constants';

export default {
    computed: {
        chartData() {
            return {
                datasets: [
                    {
                        backgroundColor: this.totals.map(obj => puzzles[obj.puzzle].color),
                        borderWidth: 0,
                        data: this.totals.map(obj => obj.total),
                    },
                ],
                labels: this.totals.map(obj => puzzles[obj.puzzle].title),
            };
        },
        chartOptions() {
            return {
                cutoutPercentage: 90,
                legend: {
                    display: false,
                },
            };
        },
        totalSolves() {
            return this.totals.reduce((acc, obj) => obj.total + acc, 0);
        },
    },
    props: [
        'totals',
    ],
};
</script>
