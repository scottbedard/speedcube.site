<template>
    <v-example title="<v-range-input>">
        <p>Input to select a value between two numbers.</p>

        <div class="max-w-sm pt-12">
            <v-range-input
                v-model="value"
                :min="0"
                :max="100"
            />
        </div>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            value: 50,
        };
    },
    components: {
        'v-example': exampleComponent,
    },
};
</script>
