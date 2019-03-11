<template>
    <div>
        <div class="max-w-md mx-auto">
            <v-card>
                <v-table
                    :data="formattedData"
                    :headers="true"
                    :schema="schema"
                    @row-click="onRowClick">
                    <!-- user -->
                    <template v-slot:user="{ value }">
                        <router-link
                            :title="`View ${value.username}'s stats`"
                            :to="{ name: 'users:show', params: { username: value.username }}">
                            {{ value.username }}
                        </router-link>
                    </template>

                    <!-- time -->
                    <template v-slot:time="{ value }">
                        {{ value | shortTimer }}
                    </template>

                    <!-- replay -->
                    <template v-slot:replay="{ row, value }">
                        <div class="text-center">
                            <router-link
                                title="Watch Replay"
                                :to="{
                                    name: 'replay',
                                    params: {
                                        id: row.solveId,
                                    },
                                }">
                                <i class="fa fa-film"></i>
                            </router-link>
                        </div>
                    </template>
                </v-table>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        formattedData() {
            const startRow = ((this.pagination.currentPage - 1) * this.pagination.pageSize) + 1;

            return this.records.map((record, index) => ({
                id: record.id,
                moves: record.solve.moves,
                rank: startRow + index,
                time: record.solve.time,
                solveId: record.solve.id,
                user: record.user,
            }));
        },
        schema() {
            return [
                {
                    align: 'left',
                    header: 'Rank',
                    headerClass: 'w-20',
                    key: 'rank',
                },
                {
                    align: 'left',
                    header: 'User',
                    key: 'user',
                },
                {
                    align: 'right',
                    header: 'Turns',
                    key: 'moves',
                },
                {
                    align: 'right',
                    header: 'Final Time',
                    key: 'time',
                },
                {
                    headerClass: 'w-16',
                    key: 'replay',
                },
            ];
        },
    },
    methods: {
        onRowClick({ row }) {
            this.$router.push({
                name: 'replay',
                params: {
                    id: row.solveId,
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
