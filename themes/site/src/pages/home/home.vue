<template>
    <v-margin class="text-center py-20" padded>
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
