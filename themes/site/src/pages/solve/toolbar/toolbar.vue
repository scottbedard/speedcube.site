<template>
    <div>
        <!-- scramble -->
        <div class="mb-8">
            <v-button primary @click="$emit('scramble')">
                Scramble
            </v-button>
        </div>

        <div>
            <v-button icon="fa-sliders" ghost size="sm" @click="$emit('appearance')">
                Customize Puzzle
            </v-button>
            <v-button icon="fa-code" ghost size="sm" @click="$emit('controls')">
                Edit Key Bindings
            </v-button>
        </div>

        <!-- other puzzles -->
        <div>
            <v-button
                v-for="key in puzzleKeys"
                ghost
                :key="key"
                :to="{
                    name: 'solve',
                    params: {
                        puzzle: puzzles[key].slug,
                    },
                }"
                :uppercase="false">
                {{ puzzles[key].title }}
            </v-button>
        </div>
    </div>
</template>

<script>
import { puzzles } from '@/app/constants';

export default {
    computed: {
        puzzleKeys() {
            return Object.keys(this.puzzles);
        },
        puzzles() {
            return puzzles;
        },
    },
};
</script>
