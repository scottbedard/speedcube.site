<template>
    <v-example title="<v-select>">
        <p>A stylized select box.</p>

        <v-select
            v-model="value"
            label="Puzzle"
            placeholder="Please select a puzzle"
            :options="options"
        />
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            value: '',
        };
    },
    components: {
        'v-example': exampleComponent,
    },
    computed: {
        options() {
            return [];
        },
    },
};
</script>
