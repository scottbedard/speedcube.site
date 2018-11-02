<template>
    <v-example title="<v-input>">
        <p>A basic input component.</p>

        <v-input
            v-model="name"
            class="mb-2"
            placeholder="Enter your name"
        />

        <div class="text-grey-dark text-xs">
            Your name is {{ name }}
        </div>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            name: '',
        };
    },
    components: {
        'v-example': exampleComponent,
    },
};
</script>
