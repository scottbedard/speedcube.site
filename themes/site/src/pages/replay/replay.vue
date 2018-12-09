<template>
    <v-page padded>
        <v-fade-transition>
            <!-- loading -->
            <div v-if="isLoading" key="loading">
                <v-spinner />
            </div>

            <!-- replay -->
            <div v-else key="replay">
                <!-- title -->
                <div class="text-center">
                    <h1 class="font-thin mb-4">
                        {{ user.name }}'s <strong class="font-bold">{{ (solve.time / 1000).toFixed(2) }}</strong> solve
                    </h1>
                    <div class="font-thin text-grey-dark">
                        {{ solve.createdAt | datestamp }}
                    </div>
                </div>
            </div>
        </v-fade-transition>
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
                user: {},
            },
        };
    },
    computed: {
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
                this.isLoading = false;
            });
        },
    },
};
</script>