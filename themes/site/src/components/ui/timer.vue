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
        if (this.running) {
            this.start();
        }
    },
    data() {
        return {
            now: Date.now(),
            intervalId: 0,
        };
    },
    computed: {
        formattedTime() {
            const time = typeof this.displayTime === 'number'
                ? this.displayTime
                : this.now - this.startedAt;

            return formatTime(time);
        },
    },
    methods: {
        start() {
            this.stop();
            this.intervalId = cleanInterval(this, this.tick, 10);
        },
        stop() {
            clearInterval(this.intervalId);
        },
        tick() {
            this.now = Date.now();
        },
    },
    props: {
        displayTime: {
            default: null,
        },
        running: {
            default: true,
        },
        startedAt: {
            required: true,
            type: Number,
        },
    },
    watch: {
        running(running) {
            if (running) this.start();
            else this.stop();
        },
    },
};
</script>
