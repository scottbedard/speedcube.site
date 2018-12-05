<template>
    <v-page>
        <v-margin class="relative" padded>
            <!-- sidebar -->
            <aside class="absolute hidden pin-l pin-t px-4 md:block">
                <v-sidebar :config-key="puzzleId" />
            </aside>

            <!-- puzzle -->
            <v-puzzle
                :colors="colors"
                :masked="scrambleIsLoading"
                :size="size"
                :sticker-elevation="stickerElevation"
                :sticker-radius="stickerRadius"
                :sticker-scale="stickerScale"
                :sticker-inner-opacity="stickerInnerOpacity"
                :turn-duration="turnDuration"
                ref="puzzle"
                @solved="onSolved"
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
                    :loading="scrambleIsLoading"
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
import { postCreateScramble } from '@/app/repositories/scrambles';
import { postCreateSolve } from '@/app/repositories/solves';

export default {
    created() {
        this.setConfigForPuzzle();
    },
    data() {
        return {
            history: [],
            isTurnable: false,
            scrambleId: 0,
            scrambleIsLoading: false,
            solveIsLoading: false,
            startedAd: 0,
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
        puzzleId() {
            return `cube${this.size}`;
        },
        size() {
            return this.$route.meta.cubeSize;
        },
    },
    methods: {
        beginInspection() {
            // reset history, we'll be recording from here
            // through the end of the solve
            this.history = [];
            this.startedAt = Date.now();

            // begin the solve's inspection time
            console.log('inspecting');

            setTimeout(() => this.beginSolve(), inspectionDuration * 1000);
        },
        beginSolve() {
            this.history.push('!!');
            
            console.log('solve');
        },
        getTimeOffset() {
            return Date.now() - this.startedAt;
        },
        onSolved() {
            this.completeIsLoading = true;

            postCreateSolve({
                scrambleId: this.scrambleId,
                solution: this.history.join(' '),
            });
        },
        reset() {
            this.isLoading = true;

            this.$nextTick(() => {
                this.scrambleIsLoading = false;
            });
        },
        setConfigForPuzzle() {
            const puzzleConfig = this.$store.getters['user/puzzleConfig'];

            this.$store.commit('user/setConfig', puzzleConfig(this.puzzleId));
        },
        scramble() {
            this.scrambleIsLoading = true;

            // request a new solve from the server, and set the
            // cube state to the scrambled state of our solve
            const request = postCreateScramble(this.puzzleId);

            // // animate the cube being scrambled. we're only using
            // // this as a loading state, this isn't the real scramble
            // const scramble = new Promise((resolve) => {
            //     this.$refs.puzzle.$once('idle', resolve);
            // });

            // // this.$refs.puzzle.scramble();

            // begin the inspection when we're ready to go
            Promise.all([request]).then(([response]) => {
                // set the state of our scrambled puzzle
                this.scrambleId = response.data.id;
                this.$refs.puzzle.setCubeState(response.data.scrambledState);

                // give the cube a sec to render, and away we go
                setTimeout(() => {
                    this.scrambleIsLoading = false;
                    this.beginInspection();
                }, 100);
            });
        },
        turn(turn) {
            const offset = this.getTimeOffset();

            this.history.push(`${offset}:${turn}`);

            this.$refs.puzzle.turn(turn);
        },
    },
    watch: {
        $route: 'reset',
    },
};
</script>
