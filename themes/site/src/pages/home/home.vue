<template>
    <v-margin class="text-center py-20" padded>
        <pre>{{ highlightedSolve }}</pre>
    </v-margin>
</template>

<script>
import { getHighlightedSolve } from '@/app/repositories/solves';

export default {
    created() {
        this.fetchHighlightedSolve();
    },
    data() {
        return {
            highlightedSolve: null,
            highlightedSolveIsLoading: false,
        };
    },
    methods: {
        fetchHighlightedSolve() {
            this.highlightedSolveIsLoading = true;

            getHighlightedSolve().then((response) => {
                // success
                this.highlightedSolve = response.data.solve;
            }).finally(() => {
                this.highlightedSolveIsLoading = false;
            });
        },
    },
};
</script>
