<template>
    <v-example title="<v-grid> &amp; <v-grid-cell>">
        <p class="leading-normal">
            A flexbox based 12 column grid. Notice that grid's padding prop spaces the
            cells apart from one another, but does not space cells from the grid's border.
            It is a better practice to style the elements inside of grids rather than
            the grid or cell itself.
        </p>

        <div class="pt-8 pb-12">
            <v-grid :padded="padded">
                <v-grid-cell md="6" xl="3">
                    <div class="border-2 border-dashed border-grey-5 font-bold p-8 text-center text-grey-5 text-xl">A</div>
                </v-grid-cell>
                <v-grid-cell md="6" xl="3">
                    <div class="border-2 border-dashed border-grey-5 font-bold p-8 text-center text-grey-5 text-xl">B</div>
                </v-grid-cell>
                <v-grid-cell md="6" xl="3">
                    <div class="border-2 border-dashed border-grey-5 font-bold p-8 text-center text-grey-5 text-xl">C</div>
                </v-grid-cell>
                <v-grid-cell md="6" xl="3">
                    <div class="border-2 border-dashed border-grey-5 font-bold p-8 text-center text-grey-5 text-xl">D</div>
                </v-grid-cell>
            </v-grid>
        </div>

        <div>
            <v-checkbox v-model="padded">Padded</v-checkbox>
        </div>
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
