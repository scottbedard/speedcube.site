<template>
    <div
        class="font-thin text-center text-grey-5 text-4xl"
        v-text="formattedTime"
    />
</template>

<script>
import { formatTime } from '@/app/utils/string';
import { cleanInterval } from '@/app/utils/component';

export default {
    created() {
        cleanInterval(this, this.tick, 10);
    },
    data() {
        return {
            now: Date.now(),
        };
    },
    computed: {
        formattedTime() {
            return formatTime(this.now - this.startedAt);
        },
    },
    methods: {
        tick() {
            this.now = Date.now();
        },
    },
    props: {
        startedAt: {
            required: true,
            type: Number,
        },
    },
};
</script>
