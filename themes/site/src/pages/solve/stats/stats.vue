<template>
    <div class="text-sm">
        <!-- last 5 -->
        <div>
            <div class="flex flex-wrap justify-center mb-2 text-center">
                <div class="text-grey-6">Recent Solves:</div>
                <template v-for="solve in sortedLast5">
                    <div class="px-2" :key="solve.id">
                        <span
                            v-if="solve.status === 'dnf'"
                            class="text-grey-6">
                            DNF
                        </span>
                        <router-link
                            v-else
                            class="text-grey-6 hover:text-grey-8"
                            title="Click to watch replay"
                            :to="{
                                name: 'replay',
                                params: {
                                    id: solve.id,
                                },
                            }">
                            {{ solve.time | shortTimer }}
                        </router-link>
                    </div>
                </template>
            </div>
        </div>

        <div class="flex flex-wrap justify-center text-center text-grey-6 text-sm">
            <div class="m-2">
                Average:<span class="px-2">
                    <template v-if="sortedLast5.length < 5">TBD</template>
                    <template v-else-if="avgOf5 === -1">DNF</template>
                    <template v-else>{{ avgOf5 | shortTimer }}</template>
                </span>
            </div>
            <div v-if="recordAverage" class="m-2">
                Record Average:<span class="px-2">{{ recordAverage.averageTime | shortTimer }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { sortBy } from 'lodash-es';
import { calculateAverage } from '@/app/utils/puzzle';

export default {
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
        avgOf5() {
            const times = this.sortedLast5.map(solve => {
                return solve.status === 'complete' ? solve.time : 'dnf';
            });

            return calculateAverage(times);
        },
        sortedLast5() {
            if (this.isAuthenticated && Array.isArray(this.last5)) {
                return sortBy(this.last5, 'id');
            }
            
            return this.solves.slice(-5).map(solve => {
                return { id: solve.id, status: solve.status, time: solve.time };
            });
        },
    },
    props: [
        'solves',
        'recordAverage',
        'last5',
    ],
};
</script>
