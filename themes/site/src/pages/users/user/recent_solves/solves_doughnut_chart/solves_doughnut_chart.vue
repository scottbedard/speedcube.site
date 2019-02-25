<template>
    <div class="flex flex-wrap justify-center -m-4 overflow-hidden text-xs xs:justify-start">
        <div class="m-4 relative h-32 w-32">
            <v-doughnut-chart
                :chart-data="chartData"
                :options="chartOptions"
            />
            <div class="absolute text-center pin-center">
                <div class="font-bold mb-2 text-xl">
                    <v-number-transition
                        v-slot="{ value }"
                        :duration="600"
                        :value="totalSolves">
                        {{ Math.round(value) | locale }}
                    </v-number-transition>
                </div>
                <div class="text-grey-6">{{ 'solve' | pluralize(totalSolves) }}</div>
            </div>
        </div>
        <div class="flex items-center justify-center m-4 w-full xs:items-start xs:w-auto">
            <div>
                <a
                    v-for="(puzzle, index) in solvedPuzzles"
                    class="flex items-center w-full"
                    href="#"
                    :class="{
                        'mt-2': index > 0,
                    }"
                    :key="puzzle"
                    @click.prevent="toggle(puzzle)">
                    <i
                        class="fa fa-circle mr-2 text-grey-6"
                        :style="{
                            color: isHidden(puzzle) ? 'inherit' : puzzles[puzzle].color,
                        }"
                    />
                    <div class="font-bold">{{ puzzle }}</div>
                    <div class="px-2">-</div>
                    <div>
                        {{ solvesByPuzzle(puzzle).length | locale }} {{ 'solve' | pluralize(solvesByPuzzle(puzzle).length) }}
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { get } from 'lodash-es';
import { puzzles } from '@/app/constants';

export default {
    computed: {
        chartData() {
            return {
                datasets: [
                    {
                        backgroundColor: this.visiblePuzzles.map(puzzle => get(puzzles, `${puzzle}.color`)),
                        borderWidth: 0,
                        data: this.visiblePuzzles.reduce((acc, puzzle) => acc.concat(this.groupedSolves[puzzle].length), []),
                    },
                ],
                labels: this.visiblePuzzles,
            };
        },
        chartOptions() {
            return {
                cutoutPercentage: 90,
                legend: {
                    display: false,
                },
                tooltips: {
                    enabled: false,
                },
            };
        },
        puzzles() {
            return puzzles;
        },
        solvedPuzzles() {
            return Object.keys(this.groupedSolves);
        },
        solvesByPuzzle() {
            return puzzle => this.groupedSolves[puzzle];
        },
        totalSolves() {
            return this.visiblePuzzles.reduce((acc, puzzle) => acc + this.groupedSolves[puzzle].length, 0);
        },
        visiblePuzzles() {
            return this.solvedPuzzles.filter(puzzle => !this.isHidden(puzzle));
        },
    },
    methods: {
        toggle(puzzle) {
            this.$emit('toggle', puzzle);
        },
    },
    props: [
        'groupedSolves',
        'isHidden',
    ],
};
</script>
