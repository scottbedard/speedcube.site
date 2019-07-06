<template>
    <v-example title="<v-puzzle>">
        <p>Our base component to manipulate and render puzzles.</p>

        <div class="max-w-sm mx-auto">
            <div class="border-4 border-dotted border-grey-4 pb-full relative">
                <v-puzzle :turn-progress="turnProgress" />
            </div>
        </div>

        <div class="max-w-sm mx-auto">
            <div class="mb-4">
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Turn Progress</label>
                <v-range-input v-model="turnProgress" :min="-100" :max="100" />
            </div>
        </div>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';
import puzzleComponent from '@/components/puzzle/puzzle.vue';

export default {
    data() {
        return {
            turnProgress: 0,
        };
    },
    components: {
        'v-example': exampleComponent,
        'v-puzzle': puzzleComponent,
    },
    methods: {
        go() {
            console.log('go')
        },
    },
};
</script>
