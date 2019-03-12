<template>
    <div>
        <div class="max-w-sm mx-auto">
            <v-card>
                <!-- desktop -->
                <v-table
                    :data="formattedData"
                    :headers="false"
                    :schema="schema"
                    @row-click="onRowClick">
                    <!-- user -->
                    <template v-slot:user="{ row, value }">
                        <div class="mb-2 text-lg">
                            {{ value.username }}
                        </div>
                        <div class="font-thin text-grey-7 text-xs">
                            <div class="xs:hidden">
                                Rank: #{{ row.rank }}
                            </div>
                            <div>
                                <span class="hidden xs:inline">#{{ row.rank }},</span> {{ row.solve.createdAt | datestamp }}
                            </div>
                            <div class="xs:hidden">
                                {{ row.moves }} turns at {{ tps(row) }} tps
                            </div>
                        </div>
                    </template>

                    <!-- time -->
                    <template v-slot:time="{ row, value }">
                        <div class="mb-2 text-lg">{{ value | shortTimer }}</div>
                        <div class="font-thin hidden text-grey-7 text-xs xs:block">{{ row.moves }} turns at {{ tps(row) }} tps</div>
                    </template>
                </v-table>
            </v-card>
        </div>
    </div>
</template>

<script>
import { round } from 'lodash-es';

export default {
    computed: {
        formattedData() {
            const startRow = ((this.pagination.currentPage - 1) * this.pagination.pageSize) + 1;

            return this.records.map((record, index) => ({
                id: record.id,
                moves: record.solve.moves,
                rank: startRow + index,
                solve: record.solve,
                time: record.solve.time,
                user: record.user,
            }));
        },
        schema() {
            return [
                {
                    align: 'left',
                    header: 'User',
                    key: 'user',
                },
                {
                    align: 'right',
                    header: 'Time',
                    key: 'time',
                },
            ];
        },
        tps() {
            return row => round((row.time / row.moves) / 1000, 1);
        },
    },
    methods: {
        onRowClick({ row }) {
            this.$router.push({
                name: 'replay',
                params: {
                    id: row.solve.id,
                },
            });
        },
    },
    props: [
        'records',
        'pagination',
    ],
};
</script>
