<template>
    <v-example title="<v-puzzle>">
        <p>Our base component to manipulate and render puzzles.</p>

        <div class="max-w-xs mx-auto">
            <div class="border-4 border-dotted border-grey-4 pb-full relative">
                <v-puzzle />
            </div>
        </div>
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
