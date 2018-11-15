<template>
    <v-margin padded>
        <form @submit.prevent="executeTurn" class="flex">
            <v-input v-model="turn" />
        </form>

        <div class="py-20 w-full">
            <v-puzzle
                :colors="colors"
                :size="size"
                ref="puzzle"
            />
        </div>
    </v-margin>
</template>

<script>
export default {
    data() {
        return {
            turn: 'F',
        };
    },
    computed: {
        colors() {
            return [
                'red',
                'green',
                'blue',
                'orange',
                'black',
                'yellow',
            ];
        },
        size() {
            return this.$route.meta.cubeSize;
        },
    },
    methods: {
        executeTurn() {
            this.$refs.puzzle.turn(this.turn);
        },
    },
};
</script>
