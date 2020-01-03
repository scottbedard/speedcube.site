<template>
    <v-page padded>
        <v-margin padded>
            <h1 class="font-thin mb-4 text-3xl">Algorithm Training</h1>
            <p class="max-w-3xl mb-6">Solving with a keyboard can feel a bit different until you get used to it. Use this area to work on algorithms, learn new solutions, and improve your virtual speedcubing skills.</p>
        
            <div class="flex">
                <v-select
                    v-model="selectedPuzzleId"
                    class="max-w-xs mr-6 w-full"
                    label="Puzzle"
                    placeholder="Select a puzzle"
                    :options="puzzleIds"
                />
                <v-button ghost :to="{ name: 'trainingAdd', query: { puzzle: selectedPuzzleId } }">
                    Add Algorithm
                </v-button>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import { puzzles } from '@/app/constants';

export default {
    computed: {
        puzzleIds() {
            return Object.keys(puzzles);
        },
        selectedPuzzleId: {
            get() {
                return this.$route.query.puzzle || '3x3';
            },
            set(puzzle) {
                this.$router.replace({ query: { ...this.$route.query, puzzle } });
            },
        },
    },
};
</script>