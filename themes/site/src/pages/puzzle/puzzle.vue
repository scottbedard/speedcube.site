<template>
    <v-page>
        <v-margin class="relative" padded>
            <!-- sidebar -->
            <aside class="absolute hidden pin-l pin-t px-4 md:block">
                <v-sidebar :config-key="configKey" />
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
import { mapState, mapGetters } from 'vuex';
import { postCreateSolve } from '@/app/repositories/solves';
import sidebarComponent from './sidebar/sidebar.vue';

export default {
    created() {
        this.setConfigForPuzzle();
    },
    data() {
        return {
            isLoading: false,
            turnDuration: 100,
        };
    },
    components: {
        'v-sidebar': sidebarComponent,
    },
    computed: {
        ...mapState('user', {
            colors: state => state.config.colors,
            stickerElevation: state => state.config.stickerElevation,
            stickerInnerOpacity: state => state.config.stickerInnerOpacity,
            stickerRadius: state => state.config.stickerRadius,
            stickerScale: state => state.config.stickerScale,
        }),
        ...mapGetters('user', [
            'isAuthenticated',
            'puzzleConfig',
        ]),
        configKey() {
            return `cube${this.size}`;
        },
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
        setConfigForPuzzle() {
            const puzzleConfig = this.$store.getters['user/puzzleConfig'];

            this.$store.commit('user/setConfig', puzzleConfig(this.configKey));
        },
        scramble() {
            const request = postCreateSolve({ size: this.size });
            
            request.then((response) => {
                console.log('hello', response.data);
            });
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
