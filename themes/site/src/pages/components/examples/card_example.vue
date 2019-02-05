<template>
    <v-example title="<v-card>">
        <p>A basic card container for content.</p>

        <div class="my-12">
            <v-card :padded="padded">
                Hello from the card component!
            </v-card>
        </div>

        <v-checkbox v-model="padded">Padded</v-checkbox>
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
