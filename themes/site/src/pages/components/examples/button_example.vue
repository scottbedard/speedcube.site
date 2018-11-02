<template>
    <v-example title="<v-button>">
        <p>A basic button</p>

        <v-button @click="onClick">
            Click me
        </v-button>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
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
