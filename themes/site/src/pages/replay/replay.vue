<template>
    <v-page padded>
        <v-margin padded>
            <v-fade-transition>
                <!-- loading -->
                <div
                    v-if="solveLoading"
                    class="text-center"
                    data-solve-loading
                    key="solveLoading">
                    <v-spinner />
                </div>

                <!-- ready -->
                <div
                    v-else
                    data-solve-ready
                    key="solveReady">

                    <!-- puzzle -->
                    <v-replay
                        v-slot="{ inspection, lastMove, puzzleParams }"
                        :config="config"
                        :progress="progress"
                        :scrambled-state="scrambledState"
                        :solution="solution"
                        :type="puzzleType">

                        <v-grid padded>

                            <!-- puzzle -->
                            <v-grid-cell md="8" lg="9">
                                <h1 class="flex justify-center text-center text-4xl">
                                    <router-link
                                        v-text="solve.user.username"
                                        class="text-grey-8 hover:text-grey-10"
                                        :to="{ name: 'users:show', params: { username }}"
                                    />
                                    <span class="mx-3 text-grey-4">-</span>
                                    <span>{{ solve.time | shortTimer }}</span>
                                </h1>
                                <div class="mb-12 text-grey-7 text-lg text-center">
                                    <strong>{{ 'turn' | pluralize(solve.moves, true) }}</strong> at <strong>{{ turnsPerSec }}</strong> {{ turnsPerSec === 1 ? 'turn' : 'turns' }} per second
                                </div>

                                <div class="flex justify-center">
                                    <div class="max-w-sm mb-8 relative w-full">
                                        <div class="pb-full">
                                            <v-puzzle v-bind="puzzleParams" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="text-center">
                                    <!-- inspection -->
                                    <div v-if="playing && inspection" key="inspection">
                                        <v-counter
                                            v-slot="{ value }"
                                            class="font-mono text-grey-6 tracking-wide text-2xl"
                                            :interval="1000">
                                            {{ round(15000 - value, -3) / 1000 }}
                                        </v-counter>
                                    </div>

                                    <!-- playing / complete -->
                                    <div v-else key="solve">
                                        <div v-if="plays > 0" class="mb-8">
                                            <v-counter
                                                v-slot="{ value }"
                                                class="font-mono text-grey-8 tracking-wide text-2xl"
                                                :class="{
                                                    'text-grey-6': !complete,
                                                    'text-grey-8': complete,   
                                                }"
                                                :max="solve.time">
                                                {{ value | shortTimer }}
                                            </v-counter>
                                        </div>

                                        <v-fade-transition>
                                            <div v-if="!playing">
                                                <v-button @click="play(lastMove.time)">Watch {{ plays > 0 ? 'Again' : 'Replay' }}</v-button>
                                            </div>
                                        </v-fade-transition>
                                    </div>
                                </div>
                            </v-grid-cell>

                            <!-- sidebar -->
                            <v-grid-cell md="4" lg="3">
                                <div class="leading-normal mb-8">
                                    <div class="mb-2 tracking-widest text-grey-6 text-xs uppercase">Scramble</div>
                                    <div class="tracking-widest">{{ solve.scramble.scramble }}</div>
                                </div>

                                <div class="leading-normal mb-8">
                                    <div class="mb-2 tracking-widest text-grey-6 text-xs uppercase">Inspection</div>
                                    <div class="tracking-widest">{{ readableInspection }}</div>
                                </div>

                                <div class="leading-normal">
                                    <div class="mb-2 tracking-widest text-grey-6 text-xs uppercase">Solution</div>
                                    <div class="tracking-widest">{{ readableSolution }}</div>
                                </div>
                            </v-grid-cell>
                        </v-grid>
                    </v-replay>
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import { bindExternalEvent, componentTimeout } from 'spyfu-vue-utils';
import { get, noop, round } from 'lodash-es';
import { animate } from '@/app/utils/function';
import { getSolve } from '@/app/repositories/solves';
import puzzleComponent from '@/components/puzzle/puzzle.vue';
import replayComponent from '@/components/ui/replay.vue';
import Counter from '@/components/ui/counter.vue';

export default {
    created() {
        this.fetchSolve();

        bindExternalEvent(this, document.body, 'keyup', this.onKeyup);
    },
    data() {
        return {
            // the current animation
            animation: { cancel: noop },

            // set to true when the replay is complete
            complete: false,

            // determine if the replay is playing or not
            playing: false,

            // number of times the replay was played
            plays: 0,

            // progress of the replay, 0 to 1
            progress: 0,

            // the solve being replayed
            solve: null,

            // loading state for initial solve request
            solveLoading: false,
        };
    },
    destroyed() {
        this.animation.cancel();
    },
    components: {
        'v-counter': Counter,
        'v-puzzle': puzzleComponent,
        'v-replay': replayComponent,
    },
    computed: {
        config() {
            return get(this.solve, 'config');
        },
        inspectionMoves() {
            const startIndex = this.moves.findIndex(event => event.value === 'START');

            return this.moves.slice(0, startIndex);
        },
        moves() {
            return this.solution.split(' ').map((move) => {
                const time = parseInt(move, 10);
                const value = move.slice(Math.floor(Math.log10(time)) + 2);

                let type = 'unknown';

                if (move.indexOf(':') > -1) {
                    type = 'turn';
                } else if (move.indexOf('#') > -1) {
                    type = 'event';
                }

                return { time, type, value };
            });
        },
        postInspectionMoves() {
            const startIndex = this.moves.findIndex(event => event.value === 'START');

            return this.moves.slice(startIndex + 1);
        },
        puzzleType() {
            return get(this.solve, 'scramble.puzzle');
        },
        readableInspection() {
            return this.inspectionMoves
                .filter(move => move.type === 'turn')
                .map(turn => turn.value)
                .join(' ');
        },
        readableSolution() {
            return this.postInspectionMoves
                .filter(move => move.type === 'turn')
                .map(move => move.value)
                .join(' ');
        },
        round() {
            return round;
        },
        scramble() {
            return get(this.solve, 'scramble.scramble');
        },
        scrambledState() {
            return get(this.solve, 'scramble.scrambledState');
        },
        solution() {
            return get(this.solve, 'solution', '');
        },
        turnsPerSec() {
            return round(1000 / this.solve.averageSpeed, 1);
        },
        username() {
            return get(this.solve, 'user.username', '');
        },
    },
    methods: {
        fetchSolve() {
            this.solveLoading = true;

            getSolve(this.$route.params.id).then((response) => {
                // success
                const { solve } = response.data;

                this.solve = solve;
            }, () => {
                // failed
                this.$router.replace({ name: 'records' });
            }).finally(() => {
                // complete
                this.solveLoading = false;
            });
        },
        play(duration) {
            if (this.playing) {
                return;
            }

            this.complete = false;
            this.playing = true;
            this.plays += 1;

            this.animation = animate((progress) => {
                this.progress = progress;
            }, duration);

            componentTimeout(this, () => {
                this.complete = true;
                this.playing = false;
            }, duration);
        },
    },
};
</script>
