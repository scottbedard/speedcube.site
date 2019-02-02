<style lang="scss" scoped>
    .inner{
        @screen lg {
            min-height: 240px;
        }
    }
</style>

<template>
    <div>
        <!-- title -->
        <h3 class="mb-4 text-grey-6 text-xl">
            Personal Records
        </h3>

        <!-- records -->
        <v-card v-if="records.length > 0">
            <v-card-link
                v-for="record in records"
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
                        <div class="mb-1">
                            {{ record.solve.scramble.puzzle }}
                        </div>
                        <time class="block text-xs" :datetime="record.solve.createdAt">
                            {{ record.solve.createdAt | datestamp }}
                        </time>
                    </div>
                    <div>{{ record.solve.time | shortTimer }}</div>
                </div>
            </v-card-link>
        </v-card>

        <!-- empty -->
        <v-card v-else padded>
            <div class="leading-normal text-center text-grey-6">No records have been set yet.</div>
        </v-card>
    </div>
</template>

<script>
export default {
    props: [
        'records',
    ],
};
</script>
