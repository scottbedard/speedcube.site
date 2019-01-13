<template>
    <v-page padded>
        <v-margin padded>

            <!-- puzzle -->
            <v-puzzle
                ref="puzzle"
                :puzzle="puzzle"
                :turnable="turnable"
            />

            <!-- controls -->
            <div class="text-center">
                <v-fade-transition>
                    <!-- scramble -->
                    <div>
                        <v-button @click="scramble">
                            Scramble
                        </v-button>
                    </div>
                </v-fade-transition>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import { postCreateScramble } from '@/app/repositories/scrambles';

export default {
    data() {
        return {
            isScrambling: false,

            turnable: true,
        }
    },
    computed: {
        puzzle() {
            return this.$route.params.puzzle;
        },
    },
    methods: {
        scramble() {
            this.isScrambling = true;

            // generate a scramble while animating a fake scramble
            const scrambleRequest = postCreateScramble(this.puzzle);
            const pseudoScramble = this.$refs.puzzle.pseudoScramble();

            // once the request is complete, and our pseudo-scramble is done
            // animating update our puzzle state and begin the countdown
            Promise.all([scrambleRequest, pseudoScramble]).then(([response]) => {
                // success
                const { scrambledState } = response.data;

                console.log('ready!', scrambledState);
            }).finally(() => {
                // complete
                this.isScrambling = false;
            });
        },
    },
};
</script>
