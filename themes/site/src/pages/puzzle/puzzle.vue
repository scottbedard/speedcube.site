<template>
    <v-margin padded>
        <div class="">
            <router-link :to="{ name: 'puzzle:2' }">2x2</router-link> -
            <router-link :to="{ name: 'puzzle:3' }">3x3</router-link> -
            <router-link :to="{ name: 'puzzle:4' }">4x4</router-link> -
            <router-link :to="{ name: 'puzzle:5' }">5x5</router-link> -
            <router-link :to="{ name: 'puzzle:10' }">10x10</router-link> -
            <router-link :to="{ name: 'puzzle:max' }">max</router-link>
        </div>

        <div>
            <v-fade-transition>
                <div v-if="isLoading" key="loading">
                    <v-spinner />
                </div>
                <div v-else key="puzzle">

                    <v-puzzle
                        :size="size"
                        ref="puzzle"
                    />

                    <div class="text-center">
                        <v-button primary @click="turn">Scramble</v-button>
                    </div>
                </div>
            </v-fade-transition>
        </div>
    </v-margin>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
        };
    },
    computed: {
        size() {
            return this.$route.meta.cubeSize;
        },
    },
    methods: {
        executeTurn() {
            this.$refs.puzzle.turn(this.turn);
            this.turn = '';
        },
        scramble() {
            this.$refs.puzzle.scramble();
        },
        turn() {
            this.$refs.puzzle.scramble('F');
        },
    },
    watch: {
        $route() {
            this.isLoading = true;

            this.$nextTick(() => {
                this.isLoading = false;
            });
        },
    },
};
</script>
