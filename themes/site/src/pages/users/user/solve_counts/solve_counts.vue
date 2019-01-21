<template>
    <div class="flex flex-col h-full">
        <h3 class="mb-4 text-grey-6 text-xl">Total Solves</h3>
        <v-card class="flex-1" padded>
            <div class="flex justify-center relative">
                <div class="w-full z-10" style="max-width: 240px">
                    <v-doughnut-chart
                        :chart-data="chartData"
                        :options="chartOptions"
                    />
                </div>
                <div class="absolute pin-center text-center text-grey-6 text-xl md:font-thin md:text-4xl">
                    {{ totalSolves | locale }}
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
import pluralize from 'pluralize';
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
                displayColors: false,
                layout: {
                    padding: 0,
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    backgroundColor: '#1F2933',
                    bodyFontColor: '#CBD2D9',
                    bodyFontFamily: "'Open Sans', 'system-ui', 'BlinkMacSystemFont', '-apple-system', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
                    bodyFontSize: 14,
                    callbacks: {
                        label: (obj) => {
                            const puzzle = this.puzzles[obj.index];
                            const puzzleTotal = this.totals.find(obj => obj.puzzle === puzzle.slug).total;
                            const puzzlePct = Math.round((puzzleTotal / this.totalSolves) * 100);

                            return `${puzzlePct}% - ${puzzleTotal} ${pluralize('solve', puzzleTotal)}`;
                        },
                        title: (obj) => {
                            const { puzzle } = this.totals.find(total => total.puzzle === this.puzzles[obj[0].index].slug);
                            const puzzleObj = puzzles[puzzle];

                            return puzzleObj.title;
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
