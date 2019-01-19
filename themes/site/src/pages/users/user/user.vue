<template>
    <v-page padded>
        <v-margin padded>
            <v-fade-transition>
                <!-- loading -->
                <div
                    v-if="isLoading"
                    class="text-center"
                    key="loading">
                    <v-spinner color="grey" />
                </div>

                <!-- ready -->
                <div v-else key="user">

                    <!-- user -->
                    <template v-if="user">
                        <h1 class="mb-4 text-grey-8">
                            {{ user.name || user.username }}
                        </h1>

                        <v-solves :solves="solves" />
                    </template>

                    <!-- not found -->
                    <template v-else>
                        <h1 class="mb-4 text-grey-8">
                            User not found
                        </h1>
                        <p class="text-sm text-grey-6">
                            There is no user with a username of "{{ $route.params.username }}".
                        </p>
                    </template>
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import { getOverview } from '@/app/repositories/user';
import recordsComponent from './records/records.vue';
import solvesComponent from './solves/solves.vue';

export default {
    created() {
        this.fetchOverview();
    },
    data() {
        return {
            overviewIsLoading: false,
            records: [],
            solves: [],
            user: null,
        };
    },
    components: {
        'v-records': recordsComponent,
        'v-solves': solvesComponent,
    },
    computed: {
        isLoading() {
            return this.overviewIsLoading;
        },
    },
    methods: {
        fetchOverview() {
            this.overviewIsLoading = true;

            getOverview(this.$route.params.username).then((response) => {
                // success
                const { records, solves, user } = response.data;

                this.user = user;
                this.solves = solves;
                this.records = records;
            }).finally(() => {
                // complete
                this.overviewIsLoading = false;
            });
        },
    },
};
</script>
