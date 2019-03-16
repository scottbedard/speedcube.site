<template>
    <div>
        <!-- last 5 -->
        <div v-if="last5" class="text-sm">
            <div class="flex flex-wrap justify-center mb-2 text-center">
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

            <div class="flex flex-wrap justify-center text-center text-grey-6 text-sm">
                <div v-if="last5" class="m-2">
                    Avg: {{ avgOf5 | shortTimer }}
                </div>
                <div v-if="recordAverage" class="m-2">
                    Record Avg: {{ recordAverage.averageTime | shortTimer }}
                </div>
            </div>
        </div>
        <!-- <pre class="text-xs text-left">{{ $props }}</pre> -->
    </div>
</template>

<script>
import { sortBy } from 'lodash-es';

export default {
    computed: {
        avgOf5() {
            return 12345;
        },
        sortedLast5() {
            return Array.isArray(this.last5)
                ? sortBy(this.last5, 'id')
                : [];
        },
    },
    props: [
        'solves',
        'recordAverage',
        'last5',
    ],
};
</script>
