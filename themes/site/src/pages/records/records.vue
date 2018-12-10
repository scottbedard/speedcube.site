<template>
    <v-page padded>
        <!-- title -->
        <div class="mb-12 text-center">
            <h1 class="font-thin mb-2 tracking-wide">
                All Time Records
            </h1> 

            <p class="font-thin text-grey text-xl">
                These are the fastest solves ever performed.
            </p>
        </div>

        <!-- nav -->
        <div class="mb-12 text-center">
            <v-nav />
        </div>
        
        <div class="max-w-xs mx-auto">
            <v-event />
        </div>
    </v-page>
</template>

<script>
import navComponent from './nav/nav.vue';
import eventComponent from './event/event.vue';

export default {
    components: {
        'v-nav': navComponent,
        'v-event': eventComponent,
    },
};
</script>