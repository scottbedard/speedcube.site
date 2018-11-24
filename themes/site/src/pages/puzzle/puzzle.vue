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
                        :sticker-elevation="stickerElevation"
                        :sticker-radius="stickerRadius"
                        :sticker-scale="stickerScale"
                        :sticker-inner-darkness="stickerInnerDarkness"
                        ref="puzzle"
                    />

                    <div class="text-center">
                        <v-button primary @click="turn">Scramble</v-button>

                        <!-- customization -->
                        <v-form class="max-w-sm mx-auto mt-8">
                            <!-- sticker radius -->
                            <v-form-field
                                name="stickerRadius"
                                label="Sticker radius"
                                :value="stickerRadius">
                                <v-input 
                                    v-model.number="stickerRadius"
                                    type="range" 
                                    min="0" 
                                    max="0.5" 
                                    step="0.005"
                                />
                            </v-form-field>

                            <!-- sticker elevation -->
                            <v-form-field
                                name="stickerElevation"
                                label="Sticker elevation"
                                :value="stickerElevation">
                                <v-input 
                                    v-model.number="stickerElevation"
                                    type="range" 
                                    min="0" 
                                    max="1" 
                                    step="0.005"
                                />
                            </v-form-field>

                            <!-- sticker scale -->
                            <v-form-field
                                name="stickerScale"
                                label="Sticker scaling"
                                :value="stickerScale">
                                <v-input 
                                    v-model.number="stickerScale"
                                    type="range" 
                                    min="0.1" 
                                    max="1" 
                                    step="0.005"
                                />
                            </v-form-field>

                            <!-- sticker inner darkness -->
                            <v-form-field
                                name="stickerScale"
                                label="Inner darkness"
                                :value="stickerScale">
                                <v-input 
                                    v-model.number="stickerInnerDarkness"
                                    type="range" 
                                    min="0" 
                                    max="1" 
                                    step="0.005"
                                />
                            </v-form-field>
                        </v-form>
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
            stickerInnerDarkness: 0.2,
            stickerElevation: 0.03,
            stickerRadius: 0.25,
            stickerScale: 0.9,
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
