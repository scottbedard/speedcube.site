<template>
    <v-page padded>
        <v-margin padded>
            <!-- hero -->
            <div class="md:mb-8 lg:mb-20">
                <v-hero />
            </div>

            <!-- customize -->
            <div class="mb-8 sm:mb-12 md:mb-24">
                <v-customize />
            </div>

            <!-- stats -->
            <div class="mb-8 sm:mb-12 md:mb-24">
                <v-stats />
            </div>

            <!-- open source -->
            <div>
                <v-open-source />
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import customizeComponent from './customize/customize.vue';
import heroComponent from './hero/hero.vue';
import openSourceComponent from './open_source/open_source.vue';
import statsComponent from './stats/stats.vue';

export default {
    components: {
        'v-customize': customizeComponent,
        'v-hero': heroComponent,
        'v-open-source': openSourceComponent,
        'v-stats': statsComponent,
    },
};
</script>
