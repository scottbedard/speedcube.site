<template>
    <v-example title="<v-countdown>">
        <p>Count down from some number of seconds.</p>

        <v-fade-transition>
            <div v-if="!startTime" key="button">
                <v-button ghost @click="start">Click to start</v-button>
            </div>
            <div v-else key="countdown">
                <v-countdown :from="5" :start-time="startTime" />
            </div>
        </v-fade-transition>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            startTime: null,
        };
    },
    components: {
        'v-example': exampleComponent,
    },
    methods: {
        start() {
            this.startTime = Date.now();
        },
    },
};
</script>
