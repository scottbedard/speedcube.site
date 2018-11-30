<template>
    <v-example title="<v-button>">
        <p>A basic button</p>

        <v-button
            :loading="loading"
            @click="onClick">
            Click me
        </v-button>

        <div slot="options">
            <v-checkbox v-model="loading">Loading</v-checkbox>
        </div>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            loading: false,
        };
    },
    components: {
        'v-example': exampleComponent,
    },
    methods: {
        onClick() {
            console.log('im hit!');
        },
    },
};
</script>
