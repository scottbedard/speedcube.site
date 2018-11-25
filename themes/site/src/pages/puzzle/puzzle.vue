<template>
    <v-page>
        <v-margin class="relative" padded>
            <!-- sidebar -->
            <aside class="absolute hidden pin-l pin-t px-4 md:block">
                <v-sidebar />
            </aside>

            <!-- puzzle -->
            <v-puzzle
                :colors="colors"
                :size="size"
                :sticker-elevation="stickerElevation"
                :sticker-radius="stickerRadius"
                :sticker-scale="stickerScale"
                :sticker-inner-opacity="stickerInnerOpacity"
                :turn-duration="turnDuration"
                ref="puzzle"
            />

            <!-- controller -->
            <v-puzzle-controller
                :size="size"
                @abort="reset"
                @turn="turn"
            />

            <!-- scramble -->
            <div class="text-center">
                <v-button primary @click="scramble">
                    Scramble
                </v-button>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import { mapGetters } from 'vuex';
import sidebarComponent from './sidebar/sidebar.vue';

export default {
    data() {
        return {
            colors: [
                '#ffeb3b', // U -> yellow
                '#ff9800', // L -> orange
                '#03a9f4', // F -> blue
                '#f44336', // R -> red
                '#4caf50', // B -> green
                '#eeeeee', // D -> white
            ],
            stickerInnerOpacity: 0.3,
            stickerElevation: 0.03,
            stickerRadius: 0.1,
            stickerScale: 0.9,
            isLoading: false,
            turnDuration: 100,
        };
    },
    components: {
        'v-sidebar': sidebarComponent,
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
        size() {
            return this.$route.meta.cubeSize;
        },
    },
    methods: {
        executeTurn() {
            this.$refs.puzzle.turn(this.turn);
        },
        reset() {
            this.isLoading = true;

            this.$nextTick(() => {
                this.isLoading = false;
            });
        },
        scramble() {
            this.$refs.puzzle.scramble();
        },
        turn(turn) {
            this.$refs.puzzle.turn(turn);
        },
    },
    watch: {
        $route: 'reset',
    },
};
</script>
