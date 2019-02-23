<template>
    <v-page padded>
        <v-margin padded>
            <div class="mb-12 text-center md:mb-20">
                <!-- heading -->
                <h1 class="font-thin mb-8 text-grey-8 text-4xl">
                    Welcome to the speedcube site
                </h1>

                <p class="font-thin leading-normal max-w-md mb-8 mx-auto text-grey-7 text-lg">
                    A free and open source place for speed cubing. We are currently in an open beta,
                    please <a href="https://github.com/scottbedard/speedcube.site/issues">report any issues</a>
                    and know that stats may be reset at any time.
                </p>

                <!-- highlighted solve -->
                <v-highlighted />
            </div>

            <!-- about -->
            <div class="mb-12 md:mb-20">
                <v-about />
            </div>

            <!-- stats -->
            <div>
                <v-stats />
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import aboutComponent from './about/about.vue';
import statsComponent from './stats/stats.vue';
import highlightedComponent from './highlighted/highlighted.vue';

export default {
    components: {
        'v-about': aboutComponent,
        'v-highlighted': highlightedComponent,
        'v-stats': statsComponent,
    },
};
</script>
