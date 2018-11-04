<template>
    <v-example title="<v-checkbox>">
        <p>A simple checkbox component.</p>

        <!-- example -->
        <v-checkbox
            v-model="checked"
            :disabled="disabled">
            Use the default slot for a label
        </v-checkbox>

        <div class="mt-4">
            <v-checkbox v-model="disabled">Disabled</v-checkbox>
        </div>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    components: {
        'v-example': exampleComponent,
    },
    data() {
        return {
            checked: false,
            disabled: false,
        };
    },
};
</script>
