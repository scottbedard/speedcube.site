<template>
    <v-page padded>
        
        <!-- loading -->
        <div v-if="isLoading" key="loading">
            <v-spinner />
        </div>

        <!-- replay -->
        <div
            class="trans-opacity"
            :class="{
                'opacity-0': isLoading,
                'opacity-100': !isLoading,
            }">
            <!-- title -->
            <div class="text-center">
                <h1 class="font-thin mb-4">
                    {{ user.name }}'s <strong class="font-bold">{{ (solve.time / 1000).toFixed(2) }}</strong> solve
                </h1>
                <div class="font-thin text-grey-dark">
                    {{ solve.createdAt | datestamp }}
                </div>
            </div>

            <!-- <pre class="text-xs">{{ solution }}</pre> -->

            <!-- puzzle -->
            <div class="max-w-md mx-auto">
                <v-puzzle
                    ref="puzzle"
                    :size="solve.cubeSize"
                />
            </div>

            <div class="text-center">
                <v-button @click="replay">
                    Replay
                </v-button>
            </div>
        </div>
    </v-page>
</template>

<script>
import { getSolve } from '@/app/repositories/solves';

export default {
    created() {
        this.fetchSolve();
    },
    data() {
        return {
            isLoading: false,
            solve: {
                cubeSize: 2,
                scramble: {
                    createdAt: '',
                },
                user: {
                    id: 0,
                    name: 'Anonymous',
                },
            },
        };
    },
    computed: {
        solution() {
            if (!this.solve) {
                return [];
            }
            
            return this.solve.solution.split(' ')
                .map(turn => turn.trim())
                .filter(turn => !turn.match(/\d+\#[a-zA-Z]+/))
                .map(rawTurn => {
                    const [ time, turn ] = rawTurn.split(':');
                    return {
                        time: parseInt(time, 10),
                        turn,
                    };
                });
        },
        user() {
            return this.solve.user;
        },
    },
    methods: {
        fetchSolve() {
            this.isLoading = true;

            getSolve(this.$route.params.id).then((response) => {
                // success
                this.solve = response.data.solve;
            }).finally(() => {
                // complete
                const state = JSON.parse(this.solve.scramble.scrambledState);

                this.isLoading = false;
                this.$refs.puzzle.setCubeState(state);
            });
        },
        replay() {
            this.solution.forEach(({ time, turn }) => {
                setTimeout(() => this.$refs.puzzle.turn(turn), time);
            });
        },
    },
};
</script>