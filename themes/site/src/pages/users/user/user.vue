<template>
    <v-page padded>
        <v-margin padded>
            <!-- overview -->
            <v-overview />
        </v-margin>
    </v-page>
</template>

<script>
import overviewComponent from './overview/overview.vue';

export default {
    components: {
        'v-overview': overviewComponent,
    },
};
</script>
