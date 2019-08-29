<template>
    <v-example title="<v-select>">
        <p>A stylized select box.</p>

        <div class="max-w-sm mb-4">
            <v-select
                v-model="value"
                label="Puzzle"
                placeholder="Please select a puzzle"
                :options="options"
            />
        </div>

        <p class="text-xs">The value is: {{ value }}</p>
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
            return [
                'foo',
                'bar',
                'baz',
                { display: 'Display text', value: 'qux' },
            ];
        },
    },
};
</script>
