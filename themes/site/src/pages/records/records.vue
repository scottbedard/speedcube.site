<template>
    <v-page padded>
        <!-- title -->
        <div class="mb-12 text-center">
            <h1 class="font-thin mb-4 tracking-wide">
                All Time Records
            </h1> 

            <p class="font-thin text-grey text-xl">
                These are the fastest solves ever performed.
            </p>
        </div>

        <!-- fastest -->
        <div class="max-w-sm mx-auto">
            <v-fastest />
        </div>
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