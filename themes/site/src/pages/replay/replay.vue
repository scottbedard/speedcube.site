<template>
    <v-page padded>
        <v-margin padded>
            <!-- puzzle -->
            <v-puzzle
                ref="puzzle"
                :puzzle="puzzle"
            />

            <v-fade-transition>

                <!-- loading -->
                <div
                    v-if="loading"
                    class="text-center"
                    key="loading">
                    <v-spinner />
                </div>

                <!-- ready -->
                <div
                    v-else
                    key="ready">

                    <div class="text-center">
                        <v-button @click="replay">
                            Replay
                        </v-button>
                    </div>
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import { getSolve } from '@/app/repositories/solves';
import { cleanTimeout } from '@/app/utils/component';
import { get } from 'lodash-es';

export default {
    created() {
        this.fetchSolve();
    },
    data() {
        return {
            // loading state for the initial fetch
            loading: false,

            // the solve being replayed
            solve: {},
        };
    },
    computed: {
        puzzle() {
            // get the puzzle from our scramble
            return get(this.solve, 'scramble.puzzle', '');
        },
        solution() {
            return get(this.solve, 'solution', '').split(' ').map(move => {
                const [offset, turnOrEvent] = move.split(/[:#]/);

                const turn = move.includes(':') && turnOrEvent;
                const event = move.includes('#') && turnOrEvent;
                
                return {
                    event,
                    offset: parseInt(offset, 10),
                    turn,
                };
            });
        },
    },
    methods: {
        fetchSolve() {
            this.loading = true;

            getSolve(this.$route.params.id).then((response) => {
                // success
                const { solve } = response.data;

                this.solve = solve;
            }, () => {
                // failed
            }).finally(() => {
                // complete
                this.loading = false;
                this.$refs.puzzle.applyState(this.solve.scramble.scrambledState);
            });
        },
        replay() {
            this.solution.forEach(({ offset, turn, event }) => {
                // ...
            });
        },
    },
};
</script>
