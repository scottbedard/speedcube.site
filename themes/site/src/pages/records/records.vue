<template>
    <v-page padded>
        <v-margin padded>
            <h1 class="font-thin mb-4 text-center text-4xl">
                All Time Records
            </h1>

            <div class="font-thin mb-8 text-center text-grey-7 text-lg">
                These are the fastest solves ever performed on the site.
            </div>

            <div class="leading-normal mb-8 text-center tracking-widest">
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
                <div v-else class="max-w-xl mx-auto md:table" key="records">
                    <router-link
                        v-for="(record, index) in records"
                        class="flex flex-wrap group justify-center no-underline md:table-row"
                        href="#"
                        :title="`Click to see ${record.user.username}'s ${solveTime(record)} solve`"
                        :key="record.id"
                        :to="{ name: 'replay', params: { id: record.solve.id }}">
                        <div
                            :class="{ 'pt-8': index > 0 }"
                            class="flex justify-center w-full md:align-middle md:table-cell md:w-auto">
                            <div class="w-32">
                                <div class="pb-full relative">
                                    <v-puzzle
                                        :config="record.solve.config"
                                        :initial-state="record.solve.scramble.scrambledState"
                                        :type="record.solve.scramble.puzzle"
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            :class="{ 'pt-2 md:pt-8': index > 0 }"
                            class="flex items-center justify-center max-w-md text-center w-full md:align-middle md:pl-8 md:table-cell md:text-left md:w-auto">
                            <div class="overflow-hidden">
                                <div class="text-2xl truncate">
                                    #{{ rank(record) }} {{ record.user.username }}
                                </div>
                                <div class="font-bold text-xs tracking-widest">
                                    <div>{{ solveTime(record) }}, {{ 'turn' | pluralize(record.solve.moves, true) }}</div>
                                    <time :datetime="record.solve.createdAt">{{ record.solve.createdAt | datestamp }}</time>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import { get, uniqueId } from 'lodash-es';
import { puzzles } from '@/app/constants';
import { formatShortTime } from '@/app/utils/string';
import { getPersonalRecords } from '@/app/repositories/personal_records';
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
        rank() {
            return record => (this.pagination.pageSize * (this.pagination.currentPage - 1)) + this.records.indexOf(record) + 1;
        },
        solveTime() {
            return record => formatShortTime(record.solve.time);
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
