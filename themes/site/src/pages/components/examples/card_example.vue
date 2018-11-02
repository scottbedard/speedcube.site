<template>
    <v-example title="<v-card>">
        <p>A basic card container for content.</p>

        <v-button
            class="mb-8"
            size="sm"
            @click="padded = !padded">
            Padded: {{ padded }}
        </v-button>

        <v-card :padded="padded">
            Hello from the card component!
        </v-card>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            padded: true,
        };
    },
    components: {
        'v-example': exampleComponent,
    },
};
</script>
