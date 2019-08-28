<template>
    <span v-text="textContent" />
</template>

<script>
import { noop, throttle } from 'lodash-es';
import { componentRafLoop } from '@/app/utils/component';
import { formatShortTime } from '@/app/utils/string';

export default {
    created() {
        this.start();
    },
    data() {
        return {
            loop: { start: noop, stop: noop },
            now: Date.now(),
        };
    },
    computed: {
        textContent() {
            return this.stopTime
                ? formatShortTime(this.stopTime - this.startTime)
                : formatShortTime(this.now - this.startTime);
        },
    },
    methods: {
        start() {
            this.loop = componentRafLoop(this, throttle(this.tick, 10));
        },
        tick() {
            this.now = Date.now();
        },
    },
    props: {
        startTime: {
            default: () => Date.now(),
            type: Number,
        },
        stopTime: {
            type: Number,
        },
    },
    watch: {
        stopTime(stopTime) {
            if (stopTime) {
                this.loop.stop();
            } else {
                this.start();
            }
        },
    },
};
</script>
