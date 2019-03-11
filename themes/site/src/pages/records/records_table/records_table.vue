<template>
    <div>
        <v-card>
            <v-table :data="formattedData" :schema="schema">
                <!-- user -->
                <template v-slot:user="{ value }">
                    <router-link :to="{ name: 'users:show', params: { username: value.username }}">
                        {{ value.username }}
                    </router-link>
                </template>

                <!-- time -->
                <template v-slot:time="{ value }">
                    {{ value }}
                </template>
            </v-table>
        </v-card>
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
                user: record.user,
            }));
        },
        schema() {
            return [
                {
                    header: 'Rank',
                    key: 'rank',
                },
                {
                    header: 'User',
                    key: 'user',
                },
                {
                    header: 'Time',
                    key: 'time',
                },
            ];
        },
    },
    props: [
        'records',
        'pagination',
    ],
};
</script>
