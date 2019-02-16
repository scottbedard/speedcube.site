<template>
    <v-margin class="text-center py-20" padded>
        <h1 class="font-thin mb-4 text-grey-8 text-4xl">Welcome to the speedcube site!</h1>

        <p class="font-thin mb-8 text-grey-6 text-lg">
            A free and open source place for speed cubing.
        </p>

        <p class="leading-normal max-w-lg mx-auto text-grey-6 text-sm">
            Please be aware, we're currently in an open beta. If you encounter a problem, <a href="https://github.com/scottbedard/speedcube.site/issues" target="_blank">please report it on GitHub</a>.<br class="hidden lg:inline" />
            Until beta ends stats may be reset at any time, so don't get too attached to your records.
        </p>

        <v-highlighted />
    </v-margin>
</template>

<script>
import highlightedComponent from './highlighted/highlighted';
import { getHighlightedSolve } from '@/app/repositories/solves';

export default {
    components: {
        'v-highlighted': highlightedComponent,
    },
};
</script>
