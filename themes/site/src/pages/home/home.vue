<template>
    <v-page padded>
        <v-margin padded>
            <!-- about -->
            <div class="mb-8 md:mb-20">
                <v-about />
            </div>

            <!-- customize -->
            <div class="mb-8 md:mb-20">
                <v-customize />
            </div>

            <!-- stats -->
            <div class="mb-8 md:mb-20">
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
import aboutComponent from './about/about.vue';
import customizeComponent from './customize/customize.vue';
// import highlightedComponent from './highlighted/highlighted.vue';
import openSourceComponent from './open_source/open_source.vue';
import statsComponent from './stats/stats.vue';

export default {
    components: {
        'v-about': aboutComponent,
        'v-customize': customizeComponent,
        // 'v-highlighted': highlightedComponent,
        'v-open-source': openSourceComponent,
        'v-stats': statsComponent,
    },
};
</script>
