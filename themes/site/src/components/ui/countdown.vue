<template>
        <span v-text="textContent" />
</template>

<script>
import { noop } from 'lodash-es';
import { componentRafLoop } from '@/app/utils/component';

export default {
    created() {
        this.loop = componentRafLoop(this, this.tick);
    },
    data() {
        return {
            loop: { start: noop, stop: noop },
            now: Date.now(),
        };
    },
    computed: {
        formattedTimeRemaining() {
            return Math.ceil(this.timeRemaining / 1000);
        },
        textContent() {
            return Math.max(0, this.timeRemaining);
        },
        timeRemaining() {
            return this.from - Math.floor((this.now - this.startTime) / 1000);
        },
    },
    methods: {
        tick() {
            this.now = Date.now();
        },
    },
    props: {
        from: {
            required: true,
            type: Number,
        },
        startTime: {
            default: () => Date.now(),
            type: Number,
        },
    },
    watch: {
        timeRemaining(timeRemaining) {
            if (timeRemaining <= 0) {
                this.loop.stop();
                this.$emit('end');
            }
        },
    },
};
</script>
