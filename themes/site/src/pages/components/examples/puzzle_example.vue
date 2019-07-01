<template>
    <v-example title="<v-puzzle>">
        <p>Our base component to manipulate and render puzzles.</p>

        <v-puzzle />
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';
import puzzleComponent from '@/components/puzzle/puzzle.vue';

export default {
    components: {
        'v-example': exampleComponent,
        'v-puzzle': puzzleComponent,
    },
};
</script>
