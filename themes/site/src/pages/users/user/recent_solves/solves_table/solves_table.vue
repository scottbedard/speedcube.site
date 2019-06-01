<template>
    <div>
        <v-table
            row-title="Click to watch replay"
            :data="currentPage"
            :headers="true"
            :schema="schema"
            @row-click="onRowClick">
            <!-- time -->
            <template v-slot:time="{ row, value }">
                <div>{{ value | shortTimer }}</div>
            </template>

            <!-- date -->
            <template v-slot:date="{ row, value }">
                <div>{{ row.createdAt | datestamp }}</div>
            </template>

            <!-- puzzle -->
            <template v-slot:puzzle="{ row, value }">
                <div>{{ row.scramble.puzzle }}</div>
            </template>
        </v-table>

        <!-- pagination -->
        <div
            v-if="lastPageNumber > 1"
            class="pt-4 px-4 text-right text-xs tracking-wide uppercase">
            <div class="flex justify-end mb-2 text-grey-7">
                Page {{ page }} of {{ lastPageNumber }}
            </div>
            <div class="flex justify-end">
                <a
                    v-if="prevPage"
                    href="#"
                    key="prev"
                    @click.prevent="onPrevPageClick">
                    <i class="fa fa-angle-left pr-2" />Prev
                </a>
                <a
                    v-if="nextPage"
                    class="ml-4"
                    href="#"
                    key="next"
                    @click.prevent="onNextPageClick">
                    Next<i class="fa fa-angle-right pl-2" />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { get } from 'lodash-es';

export default {
    data() {
        return {
            page: 1,
            pageSize: 10,
        };
    },
    computed: {
        currentPage() {
            const start = this.pageSize * (this.page - 1);

            return this.filteredPuzzles.slice(start, start + this.pageSize);
        },
        lastPageNumber() {
            return Math.ceil(this.filteredPuzzles.length / this.pageSize);
        },
        nextPage() {
            return this.page < this.lastPageNumber;
        },
        filteredPuzzles() {
            const puzzleIds = get(this.$route, 'query.puzzle', null);

            if (puzzleIds === null) {
                return this.solves;
            }

            return this.puzzle(puzzleIds);
        },
        prevPage() {
            return this.page > 1;
        },
        puzzle() {
            return puzzle => this.solves.filter(solve => solve.scramble.puzzle === puzzle);
        },
        schema() {
            return [
                {
                    header: 'Date',
                    key: 'date',
                },
                {
                    header: 'Puzzle',
                    key: 'puzzle',
                },
                {
                    align: 'right',
                    header: 'Time',
                    key: 'time',
                },
            ];
        },
    },
    methods: {
        onNextPageClick() {
            this.page = Math.min(this.lastPageNumber, this.page + 1);
        },
        onPrevPageClick() {
            this.page = Math.max(1, this.page - 1);
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
    props: [
        'solves',
    ],
};
</script>
