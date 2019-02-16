<template>
    <div>
        <v-puzzle
            ref="puzzle"
            :config="puzzleConfig"
            :puzzle="puzzle"
            @ready="applyScrambledState"
        />
    </div>
</template>

<script>
import { get } from 'lodash-es';

export default {
    computed: {
        puzzle() {
            return this.solve
                ? get(this.solve, 'scramble.puzzle', '3x3')
                : '3x3';
        },
        puzzleConfig() {
            return this.solve
                ? get(this.solve, 'config', {})
                : {};
        },
        scrambledState() {
            return this.solve
                ? get(this.solve, 'scramble.scrambledState', {})
                : {};
        },
    },
    methods: {
        applyScrambledState(puzzle) {
            console.log('ok...', this.scrambledState, puzzle);
            puzzle.applyState(this.scrambledState);
        },
    },
    props: [
        'solve',
    ],
};
</script>
