<template>
    <v-section :loading="isLoading">
        <v-table
            :data="tableData"
            :schema="schema"
        />
    </v-section>
</template>

<script>
import sectionComponent from '../shared/section.vue';
import timeCellComponent from './time_cell/time_cell.vue';
import userCellComponent from '../shared/user_cell.vue';
import { getSolves } from '@/app/repositories/solves';

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
                cubeSize: 3,
                orderBy: 'time',
            }).then((response) => {
                // success
                this.solves = response.data.solves;
            }).finally(() => {
                // complete
                this.isLoading = false;
            });
        },
    },
    components: {
        'v-section': sectionComponent,
    },
};
</script>