<template>
    <span><slot v-bind="{ value }"></slot></span>
</template>

<script>
import { componentInterval } from 'spyfu-vue-utils';

export default {
    data() {
        const now = Date.now();

        return {
            createdAt: now,
            currentTime: now,
        };
    },
    computed: {
        value() {
            return this.currentTime - this.createdAt;
        },
    },
    methods: {
        tick() {
            this.currentTime = Date.now();
        },
    },
    props: {
        interval: {
            default: 10,
            type: Number,
        },
        max: {
            type: Number,
        },
        startTime: {
            type: Number,
        },
    },
    watch: {
        value() {
            if (typeof this.max === 'number' && this.value >= this.max) {
                this.currentTime = this.createdAt + this.max;

                this.$options.interval.cancel();
            }
        },
    },
};
</script>
