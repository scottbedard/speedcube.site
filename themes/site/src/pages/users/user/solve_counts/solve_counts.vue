<template>
    <div class="flex justify-center relative">
        <div class="w-full" style="max-width: 60px">
            <v-doughnut-chart
                :chart-data="chartData"
                :options="chartOptions"
            />
        </div>
    </div>
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
                cutoutPercentage: 80,
                legend: {
                    display: false,
                },
                tooltips: {
                    enabled: false,
                },
            };
        },
        puzzles() {
            return this.totals.map(obj => puzzles[obj.puzzle]);
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
