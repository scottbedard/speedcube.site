<template>
    <v-page padded>
        <v-margin class="text-center" padded>
            <h1 class="font-thin mb-4 text-grey-8 text-4xl">Welcome to the speedcube site!</h1>

            <p class="font-thin mb-8 text-grey-6 text-lg">
                A free and open source place for speed cubing.
            </p>

            <p class="leading-normal max-w-lg mx-auto text-grey-6 text-sm">
                We are currently in an open beta. If you encounter a problem, <a href="https://github.com/scottbedard/speedcube.site/issues" target="_blank">please report it on GitHub</a>.<br class="hidden lg:inline" />
                Stats may be reset at any time, so try not to get too attached to your records.
            </p>

            <v-highlighted />
        </v-margin>
    </v-page>
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
