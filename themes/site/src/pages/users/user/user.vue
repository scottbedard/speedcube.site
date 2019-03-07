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
                        <div class="flex items-center mb-8">
                            <!-- avatar -->
                            <div v-if="avatarPath" class="flex items-center mr-4">
                                <v-avatar size="lg" :user="user" />
                            </div>

                            <!-- user -->
                            <div>
                                <h1 class="mb-1 text-grey-8">
                                    {{ user.username }}
                                </h1>
                                <div class="text-grey-5 text-sm">
                                    Member since <time :datetime="user.createdAt">{{ user.createdAt | datestamp }}</time>
                                </div>
                            </div>
                        </div>

                        <v-grid padded>
                            <v-grid-cell md="4" lg="3">
                                <v-records :records="records" />
                            </v-grid-cell>
                            <v-grid-cell md="8" lg="9">
                                <v-recent-solves :solves="solves" />
                            </v-grid-cell>
                        </v-grid>
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
import { get } from 'lodash-es';
import { getOverview } from '@/app/repositories/user';
import recentSolvesComponent from './recent_solves/recent_solves.vue';
import recordsComponent from './records/records.vue';

export default {
    created() {
        this.fetchOverview();
    },
    data() {
        return {
            overviewIsLoading: false,
            records: [],
            totals: [],
            solves: [],
            user: {},
        };
    },
    components: {
        'v-records': recordsComponent,
        'v-recent-solves': recentSolvesComponent,
    },
    computed: {
        avatarPath() {
            return get(this.user, 'avatar.path');
        },
        isLoading() {
            return this.overviewIsLoading;
        },
        totalSolves() {
            return this.totals.reduce((acc, obj) => acc + obj.total, 0);
        },
    },
    methods: {
        fetchOverview() {
            this.overviewIsLoading = true;

            getOverview(this.$route.params.username).then((response) => {
                // success
                const { records, solves, totals, user } = response.data;

                this.user = user;
                this.solves = solves;
                this.records = records;
                this.totals = totals;
            }).finally(() => {
                // complete
                this.overviewIsLoading = false;
            });
        },
    },
    watch: {
        '$route': {
            deep: true,
            method: 'fetchOverview',
        },
    }
};
</script>
