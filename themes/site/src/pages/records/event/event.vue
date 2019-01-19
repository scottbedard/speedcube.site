<template>
    <div>
        <v-fade-transition>
            <!-- loading -->
            <div
                v-if="isLoading"
                class="text-center"
                key="loading">
                <v-spinner />
            </div>

            <!-- table -->
            <div
                v-else
                key="table">
                <v-table
                    :data="tableData"
                    :headers="false"
                    :schema="schema"
                    @row-click="onRowClick">
                    <div
                        class="text-center text-grey-darker"
                        slot="empty">
                        Nobody has completed a {{ puzzle }} solve yet.
                    </div>
                </v-table>
            </div>
        </v-fade-transition>
    </div>
</template>

<script>
import { getSolves } from '@/app/repositories/solves';
import sectionComponent from '../shared/section.vue';
import timeCellComponent from './time_cell/time_cell.vue';
import userCellComponent from '../shared/user_cell.vue';

export default {
    created() {
        this.fetchSolves();
    },
    data() {
        return {
            isLoading: false,
            solves: [],
        };
    },
    computed: {
        puzzle() {
            return this.$route.params.puzzle;
        },
        schema() {
            return [
                {
                    cell: userCellComponent,
                    header: 'User',
                    key: 'user',
                },
                {
                    align: 'right',
                    cell: timeCellComponent,
                    header: 'Time',
                    key: 'time',
                },
            ];
        },
        tableData() {
            return this.solves;
        },
    },
    methods: {
        fetchSolves() {
            this.isLoading = true;

            getSolves({
                puzzle: this.puzzle,
                orderBy: 'time',
            }).then((response) => {
                // success
                this.solves = response.data.solves;
            }).finally(() => {
                // complete
                this.isLoading = false;
            });
        },
        onRowClick({ row }) {
            this.$router.push({
                name: 'replay',
                params: {
                    id: row.id,
                },
            });
        },
    },
    components: {
        'v-section': sectionComponent,
    },
    watch: {
        $route: 'fetchSolves',
    },
};
</script>
