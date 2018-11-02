<template>
    <v-example title="<v-grid> &amp; <v-grid-cell>">
        <p>
            A flexbox based 12 column grid. Notice that grid's padding prop spaces the
            cells apart from one another, but does not space cells from the grid's border.
            It is a better practice to style the elements inside of grids rather than
            the grid or cell itself.
        </p>

        <div class="mb-8">
            <v-button
                class="mr-4"
                size="sm"
                @click="padded = !padded">
                Padded: {{ padded }}
            </v-button>
        </div>

        <v-grid :padded="padded">
            <v-grid-cell md="6" xl="3">
                <div class="border-4 border-dashed p-4">A</div>
            </v-grid-cell>
            <v-grid-cell md="6" xl="3">
                <div class="border-4 border-dashed p-4">B</div>
            </v-grid-cell>
            <v-grid-cell md="6" xl="3">
                <div class="border-4 border-dashed p-4">C</div>
            </v-grid-cell>
            <v-grid-cell md="6" xl="3">
                <div class="border-4 border-dashed p-4">D</div>
            </v-grid-cell>
        </v-grid>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            padded: false,
        };
    },
    components: {
        'v-example': exampleComponent,
    },
};
</script>
