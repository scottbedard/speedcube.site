<style lang="scss" scoped>
    .inner{
        @screen lg {
            min-height: 240px;
        }
    }
</style>

<template>
    <div>
        <!-- record singles -->
        <h3 class="mb-4 text-grey-6 text-xl">
            Record Singles
        </h3>
        <div v-if="records.length > 0">
            <v-card>
                <v-card-link
                    v-for="record in sortedRecords"
                    title="Click to watch replay"
                    :key="record.id"
                    :to="{
                        name: 'replay',
                        params: {
                            id: record.solve.id,
                        },
                    }">
                    <div class="flex justify-between">
                        <div>
                            <div class="mb-2 text-grey-8">
                                {{ record.solve.scramble.puzzle }}
                            </div>
                            <time class="block text-xs text-grey-7" :datetime="record.solve.createdAt">
                                {{ record.solve.createdAt | datestamp }}
                            </time>
                        </div>
                        <div class="text-grey-8">{{ record.solve.time | shortTimer }}</div>
                    </div>
                </v-card-link>
            </v-card>

            <!-- record averages -->
            <h3 class="mt-8 mb-4 text-grey-6 text-xl">
                Record Averages
            </h3>
            <v-card>
                <div
                    v-for="recordAverage in sortedRecordAverages"
                    class="px-6 py-4 text-grey-7"
                    :key="recordAverage.id">
                    <div class="flex justify-between">
                        <div>
                            <div class="mb-2 text-grey-8">
                                {{ recordAverage.puzzle }}
                            </div>
                            <time class="block text-xs text-grey-7" :datetime="recordAverage.createdAt">
                                {{ recordAverage.createdAt | datestamp }}
                            </time>
                            <div class="flex mt-2 text-xs">
                                <router-link
                                    v-for="solve in recordAverage.solves"
                                    class="mr-4"
                                    title="Click to watch replay"
                                    :key="solve.id"
                                    :to="{
                                        name: 'replay',
                                        params: {
                                            id: solve.id,
                                        },
                                    }">
                                    {{ solve.time | shortTimer }}
                                </router-link>
                            </div>
                        </div>
                        <div class="text-grey-8">{{ recordAverage.averageTime | shortTimer }}</div>
                    </div>
                </div>
            </v-card>
        </div>

        <!-- empty -->
        <v-card v-else padded>
            <div class="leading-normal text-center text-grey-6">No records have been set yet.</div>
        </v-card>
    </div>
</template>

<script>
import { get, sortBy } from 'lodash-es';

export default {
    computed: {
        sortedRecordAverages() {
            return sortBy(this.recordAverages, recordAverage => recordAverage.puzzle);
        },
        sortedRecords() {
            return sortBy(this.records, record => get(record, 'solve.scramble.puzzle'));
        },
    },
    props: [
        'recordAverages',
        'records',
    ],
};
</script>
