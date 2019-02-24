<template>
    <v-page padded>
        <v-margin padded>
            <!-- about -->
            <div class="mb-20 md:mb-32">
                <v-about />
            </div>

            <!-- stats -->
            <div class="mb-20 md:mb-32">
                <v-customize />
            </div>

            <!-- customize -->
            <!-- <div>
                <v-stats />
            </div> -->
        </v-margin>
    </v-page>
</template>

<script>
import aboutComponent from './about/about.vue';
import customizeComponent from './customize/customize.vue';
import statsComponent from './stats/stats.vue';
import highlightedComponent from './highlighted/highlighted.vue';

export default {
    components: {
        'v-about': aboutComponent,
        'v-customize': customizeComponent,
        'v-highlighted': highlightedComponent,
        'v-stats': statsComponent,
    },
};
</script>
