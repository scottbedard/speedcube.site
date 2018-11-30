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
                :masked="isLoading"
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
                <v-button
                    primary
                    :loading="isLoading"
                    @click="scramble">
                    Scramble
                </v-button>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import sidebarComponent from './sidebar/sidebar.vue';
import { inspectionDuration } from './config';
import { mapState, mapGetters } from 'vuex';
import { postCreateSolve } from '@/app/repositories/solves';

export default {
    created() {
        this.setConfigForPuzzle();
    },
    data() {
        return {
            isTurnable: false,
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
        beginInspection() {
            // begin the solve's inspection time
            console.log('inspecting');

            setTimeout(() => this.beginSolve(), inspectionDuration * 1000);
        },
        beginSolve() {
            console.log('solve');
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
            this.isLoading = true;

            // request a new solve from the server, and set the
            // cube state to the scrambled state of our solve
            const request = postCreateSolve({ size: this.size });

            // animate the cube being scrambled. we're only using
            // this as a loading state, this isn't the real scramble
            const scramble = new Promise((resolve) => {
                this.$refs.puzzle.$once('idle', resolve);
            });

            this.$refs.puzzle.scramble();

            // begin the inspection when we're ready to go
            Promise.all([request, scramble]).then(([response]) => {
                // set the state of our scrambled puzzle
                this.$refs.puzzle.setCubeState(response.data.state);

                // give the cube a sec to render, and away we go
                setTimeout(() => {
                    this.isLoading = false;
                }, 100);
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
