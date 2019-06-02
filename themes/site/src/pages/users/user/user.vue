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
                                <v-records
                                    :record-averages="recordAverages"
                                    :records="records"
                                />
                            </v-grid-cell>
                            <v-grid-cell md="8" lg="9">
                                <v-recent-solves :days="days" :solves="solves" @days="setDays" />
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
            recordAverages: [],
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
        days() {
            return this.$route.query.days || 365;
        },
        isLoading() {
            return this.overviewIsLoading;
        },
    },
    methods: {
        fetchOverview() {
            this.overviewIsLoading = true;

            getOverview(this.$route.params.username, this.days).then((response) => {
                // success
                const { recordAverages, records, solves, totals, user } = response.data;

                this.recordAverages = recordAverages;
                this.records = records;
                this.solves = solves;
                this.totals = totals;
                this.user = user;
            }).finally(() => {
                // complete
                this.overviewIsLoading = false;
            });
        },
        setDays(days) {
            this.days = days;
        },
    },
    watch: {
        days: 'fetchOverview',
        $route: {
            deep: true,
            handler() {
                this.fetchOverview();
            },
        },
    },
};
</script>
