<template>
    <v-page padded>
        <v-margin padded>
            <h1 class="font-thin mb-4 text-3xl">Submit an algorithm</h1>
            <p class="mb-6 max-w-3xl">Use this form to build up algorithms sets to practice with, and share your algorithms with the world.</p>

            <!-- puzzle select -->
            <v-select
                v-model="puzzle"
                class="max-w-xs mb-6"
                placeholder="Select a puzzle"
                :options="puzzleIds"
            />

            <!-- puzzle input -->
            <v-cube-input
                v-if="isCube"
                :config="puzzleConfig"
                :puzzle="puzzle"
            />
        </v-margin>
    </v-page>
</template>

<script>
import cubeInputComponent from './inputs/cube.vue';
import { get } from 'lodash-es';
import { isCube } from '@/app/utils/puzzle';
import { puzzles } from '@/app/constants';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            puzzle: this.$route.query.puzzle || '3x3',
        };
    },
    components: {
        'v-cube-input': cubeInputComponent,
    },
    computed: {
        ...mapGetters('user', [
            'configForPuzzle',
        ]),
        isCube() {
            return isCube(this.puzzle);
        },
        puzzleConfig() {
            return this.configForPuzzle(this.puzzle);
        },
        puzzleIds() {
            return Object.keys(puzzles);
        },
    },
};
</script>
