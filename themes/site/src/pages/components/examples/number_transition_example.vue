<template>
    <v-example title="<v-number-transition>">
        <p>Display a numeric string with easing transitions.</p>

        <a
            class="font-thin text-2xl"
            href="#"
            @click.prevent="update">
            <v-number-transition
                v-slot="{ value }"
                :duration="1000"
                :value="val">
                {{ Math.round(value) | locale }}
            </v-number-transition>
        </a>
    </v-example>
</template>

<script>
import { random } from 'lodash-es';
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            val: random(0, 10000),
        };
    },
    components: {
        'v-example': exampleComponent,
    },
    methods: {
        update() {
            this.val = random(0, 100000);
        },
    },
};
</script>
