<template>
    <v-page padded>
        <v-margin padded>
            <v-fade-transition>
                <!-- loading -->
                <div v-if="loading" class="text-center" key="loading">
                    <v-spinner />
                </div>

                <!-- empty -->
                <div v-else-if="empty" key="empty">
                    There are no records to display.
                </div>

                <!-- records -->
                <div v-else key="records">
                    <v-records-table
                        :pagination="pagination"
                        :records="records"
                    />
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import { getPersonalRecords } from '@/app/repositories/personal_records';
import { get, uniqueId } from 'lodash-es';
import recordsTableComponent from './records_table/records_table.vue';

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
    },
    computed: {
        empty() {
            return this.records.length === 0;
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

            console.log('params', params);

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
