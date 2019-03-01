<template>
    <span v-text="formattedTime" />
</template>

<script>
import { formatTime } from '@/app/utils/string';
import { componentInterval } from 'spyfu-vue-utils';

export default {
    created() {
        if (this.running) {
            this.start();
        }
    },
    data() {
        return {
            now: Date.now(),
            interval: null,
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

            this.interval = componentInterval(this, this.tick, 10);
        },
        stop() {
            if (this.interval) {
                this.interval.cancel();
            }
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
