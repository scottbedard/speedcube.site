<template>
    <div>
        <div class="max-w-md mx-auto">
            <v-card>
                <!-- mobile -->
                <div class="sm:hidden">
                    <router-link
                        v-for="row in formattedData"
                        class="block group px-6 py-4 hover:bg-grey-4"
                        :key="row.id"
                        :to="{
                            name: 'replay',
                            params: {
                                id: row.solveId,
                            },
                        }">
                        <div class="font-bold mb-2 text-lg">{{ row.user.username }}</div>
                        <div class="flex text-sm">
                            <div class="pr-2">
                                <div>Rank</div>
                                <div>Turns</div>
                                <div>Final Time</div>
                            </div>
                            <div>
                                <div>{{ row.rank }}</div>
                                <div>{{ row.moves }}</div>
                                <div>{{ row.time | shortTimer }}</div>
                            </div>
                        </div>
                    </router-link>
                </div>

                <!-- desktop -->
                <v-table
                    class="hidden sm:table"
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
