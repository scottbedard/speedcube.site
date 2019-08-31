<template>
    <v-page padded>
        <v-margin padded>
            <h1 class="font-thin mb-4 text-center text-4xl">
                All Time Records
            </h1>

            <div class="font-thin mb-8 text-center text-grey-7 text-lg">
                These are the fastest solves ever performed on the site.
            </div>

            <div class="mb-8 text-center">
                <router-link
                    v-for="puzzle in puzzles"
                    class="inline-block mx-4 text-base"
                    :class="
                        puzzleQuery !== puzzle.slug && 'text-grey-6'
                    "
                    :key="puzzle.slug"
                    :to="{
                        name: 'records',
                        query: query(puzzle.slug),
                    }">
                    {{ puzzle.title }}
                </router-link>
            </div>

            <v-fade-transition>
                <!-- loading -->
                <div v-if="loading" class="text-center" key="loading">
                    <v-spinner />
                </div>

                <!-- empty -->
                <div
                    class="text-grey-6 text-center"
                    v-else-if="empty"
                    key="empty">
                    There are no records to display.
                </div>

                <!-- records -->
                <div v-else class="max-w-lg mx-auto" key="records">
                    <router-link
                        v-for="(record, index) in records"
                        class="flex flex-wrap items-center justify-center no-underline"
                        title="Click to watch replay"
                        :class="{
                            'border-t border-grey-3 mt-8 pt-8': index > 0,   
                        }"
                        :key="record.id"
                        :to="{ name: 'replay', params: { id: record.solve.id }}">
                        <div class="mx-4 w-full" style="max-width: 150px">
                            <div class="pb-full relative">
                                <v-puzzle
                                    :config="record.solve.config"
                                    :initial-state="record.solve.scramble.scrambledState"
                                    :type="record.solve.scramble.puzzle"
                                />
                            </div>
                        </div>
                        <div class="mx-4 text-center">
                            <div class="text-2xl">{{ record.user.username }} - {{ record.solve.time | shortTimer }}</div>
                            <div class="opacity-75">
                                <div class="text-sm">{{ 'turn' | pluralize(record.solve.moves, true) }} at {{ turnsPerSec(record) }} {{ turnsPerSec(record) === 1 ? 'turn' : 'turns' }} per second</div>
                                <time class="text-sm" :datetime="record.solve.createdAt">{{ record.solve.createdAt | datestamp }}</time>
                            </div>
                        </div>
                    </router-link>
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import { get, round, uniqueId } from 'lodash-es';
import { puzzles } from '@/app/constants';
import { getPersonalRecords } from '@/app/repositories/personal_records';
import recordsTableComponent from './records_table/records_table.vue';
import puzzleComponent from '@/components/puzzle/puzzle.vue';

export default {
    created() {
        this.fetch();
    },
    data() {
        return {
            loading: false,
            pagination: {
                currentPage: 0,
                lastPage: 0,
                pageSize: 0,
                total: 0,
            },
            records: [],
            requestId: 0,
        };
    },
    components: {
        'v-records-table': recordsTableComponent,
        'v-puzzle': puzzleComponent,
    },
    computed: {
        empty() {
            return this.records.length === 0;
        },
        puzzles() {
            return puzzles;
        },
        puzzleQuery() {
            return get(this, '$route.query.puzzle', '3x3');
        },
        turnsPerSec() {
            return record => round(1000 / record.solve.averageSpeed, 1);
        },
        query() {
            return puzzle => ({ ...this.$route.query, puzzle });
        },
    },
    methods: {
        fetch() {
            this.loading = true;

            // keep track of the request id so we can abort data
            // updates if the user makes overlapping requests.
            const requestId = uniqueId();

            this.requestId = requestId;

            // fetch personal records
            const params = {
                page: get(this.$route, 'query.page', 1),
                puzzle: get(this.$route, 'query.puzzle', '3x3'),
            };

            getPersonalRecords(params).then((response) => {
                // success
                if (this.requestId === requestId) {
                    this.pagination = response.data.pagination;
                    this.records = response.data.records;
                }
            }).finally(() => {
                // complete
                if (this.requestId === requestId) {
                    this.loading = false;
                }
            });
        },
    },
    watch: {
        $route: {
            deep: true,
            handler: 'fetch',
        },
    },
};
</script>
