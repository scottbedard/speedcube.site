<template>
    <v-example title="<v-stopwatch>">
        <p>
            Similar to the <span class="font-mono">&lt;v-countdown&gt;</span>
            component, but for timing in the other direction.
        </p>

        <v-fade-transition>
            <div v-if="!startTime" key="button">
                <v-button ghost @click="start">Click to start</v-button>
            </div>
            <div
                v-else
                class="flex items-center"
                key="stopwatch">
                <v-stopwatch :start-time="startTime" :stop-time="stopTime" />
                <div class="ml-6">
                    <v-fade-transition>
                        <div v-if="!stopTime" key="stop">
                            <v-button ghost @click="stop">Stop</v-button>
                        </div>
                        <div v-else key="start">
                            <v-button ghost @click="start">Restart</v-button>
                        </div>
                    </v-fade-transition>
                </div>
            </div>
        </v-fade-transition>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            startTime: 0,
            stopTime: 0,
        };
    },
    components: {
        'v-example': exampleComponent,
    },
    methods: {
        start() {
            this.startTime = Date.now();
            this.stopTime = 0;
        },
        stop() {
            this.stopTime = Date.now();
        },
    },
};
</script>
