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
                        Nobody has completed a {{ event }} solve yet.
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
        cubeSize() {
            switch (this.event) {
            case '2x2': return 2;
            case '3x3': return 3;
            case '4x4': return 4;
            case '5x5': return 5;
            default: return 0;
            }
        },
        event() {
            return this.$route.query.event || '3x3';
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
                cubeSize: this.cubeSize,
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
