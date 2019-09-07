<template>
    <v-page padded>
        <v-margin padded>
            <!-- hero -->
            <div class="mb-8 md:mb-16 lg:mb-24">
                <v-hero />
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
import customizeComponent from './customize/customize.vue';
import heroComponent from './hero/hero.vue';
// import highlightedComponent from './highlighted/highlighted.vue';
import openSourceComponent from './open_source/open_source.vue';
import statsComponent from './stats/stats.vue';

export default {
    components: {
        'v-customize': customizeComponent,
        'v-hero': heroComponent,
        // 'v-highlighted': highlightedComponent,
        'v-open-source': openSourceComponent,
        'v-stats': statsComponent,
    },
};
</script>
