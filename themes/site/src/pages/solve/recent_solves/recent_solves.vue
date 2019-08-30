<template>
    <div class="font-bold tracking-wider text-sm">
        <!-- recent solves -->
        <div class="flex flex-wrap justify-center mb-6">
            <span class="px-2 py-1 w-full sm:w-auto">Recent:</span>
            <span
                v-for="solve in takeSolves(5).reverse()"
                class="px-2 py-1"
                :key="solve.id">
                <router-link
                    v-if="solve.status === 'complete'"
                    v-text="formatShortTime(solve.time)"
                    class="no-underline"
                    title="Click to watch replay"
                    :to="{ name: 'replay', params: { id: solve.id }}"
                />
                <span v-else>DNF</span>
            </span>
        </div>

        <!-- avg / record avg -->
        <div class="flex flex-wrap justify-center">
            <div class="flex justify-center mb-6 px-4">
                <span class="pr-4">Average:</span>
                <span>{{ average(takeSolves(5)) }}</span>
            </div>
            <div v-if="isAuthenticated && recordAverage" class="flex justify-center mt-6 px-4">
                <span class="pr-4">Record&nbsp;Average:</span>
                <span>{{ formatShortTime(recordAverage.averageTime) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatShortTime } from '@/app/utils/string';
import { calculateAverage } from '@/app/utils/puzzle';

export default {
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
        average() {
            return (solves) => {
                const times = solves.map(solve => (solve.status === 'complete' ? solve.time : 'dnf'));
                const avg = calculateAverage(times);

                return avg > -1 ? formatShortTime(avg) : 'DNF';
            };
        },
        formatShortTime() {
            return formatShortTime;
        },
        takeSolves() {
            return n => this.solves.slice(0, n);
        },
    },
    props: {
        recordAverage: {
            required: true,
        },
        solves: {
            required: true,
            type: Array,
        },
    },
};
</script>
