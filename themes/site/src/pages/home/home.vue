<template>
    <v-page padded>
        <v-margin padded>
            <!-- about -->
            <div class="mb-8 md:mb-16 lg:mb-24">
                <v-about />
            </div>

            <!-- customize -->
            <div class="mb-8 md:mb-16 lg:mb-32">
                <v-customize />
            </div>

            <!-- stats / open source -->
            <div class="pb-20">
                <v-grid padded>
                    <v-grid-cell md="6">
                        <v-stats />
                    </v-grid-cell>
                    <v-grid-cell md="6">
                        <v-open-source />
                    </v-grid-cell>
                </v-grid>
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
