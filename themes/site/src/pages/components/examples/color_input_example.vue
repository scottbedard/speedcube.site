<template>
    <v-example title="<v-color-input>">
        <p>A cross browser color selector used in puzzle configurations</p>

        <div class="pt-8">
            <v-color-input v-model="color" />
        </div>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            color: '#bada55',
        };
    },
    components: {
        'v-example': exampleComponent,
    },
};
</script>
