<template>
    <v-example title="<v-button>">
        <p>A basic button</p>

        <v-button
            :danger="danger"
            :ghost="ghost"
            :primary="primary"
            @click="onClick">
            Watch Replay
        </v-button>

        <div class="flex flex-wrap" slot="options">
            <v-checkbox v-model="danger" class="mr-8">Danger</v-checkbox>
            <v-checkbox v-model="primary" class="mr-8">Primary</v-checkbox>
            <v-checkbox v-model="ghost" class="mr-8">Ghost</v-checkbox>
        </div>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            danger: false,
            ghost: false,
            primary: false,
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
