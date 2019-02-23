<template>
    <v-page padded>
        <v-margin class="text-center" padded>
            <h1 class="font-thin mb-4 text-grey-8">
               Welcome to the speedcube site
            </h1>
            <p class="font-thin leading-normal max-w-md mb-8 mx-auto text-grey-7 text-lg">
                A free and open source place for speed cubing. We are currently in an open beta,
                please <a href="https://github.com/scottbedard/speedcube.site/issues">report any issues</a>
                and know that stats may be reset at any time.
            </p>
            <v-highlighted />
        </v-margin>
    </v-page>
</template>

<script>
import highlightedComponent from './highlighted/highlighted.vue';

export default {
    components: {
        'v-highlighted': highlightedComponent,
    },
};
</script>
