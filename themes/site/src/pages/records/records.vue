<template>
    <v-page padded>
        <!-- title -->
        <div class="mb-12 text-center">
            <h1 class="font-thin mb-4 tracking-wide">
                All Time Records
            </h1> 

            <p class="font-thin text-grey text-xl">
                The fastest and most efficient solves ever achieved.
            </p>
        </div>

        <v-grid padded>
            <!-- fastest -->
            <v-grid-cell md="6">
                <v-fastest />
            </v-grid-cell>

            <!-- fewest moves -->
            <v-grid-cell md="6">
                Fewest moves
            </v-grid-cell>
        </v-grid>
    </v-page>
</template>

<script>
import fastestComponent from './fastest/fastest.vue';

export default {
    components: {
        'v-fastest': fastestComponent,
    },
};
</script>