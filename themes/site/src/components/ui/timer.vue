<template>
    <span>
        <slot v-bind="{ currentTime, formattedCurrentTime }">{{ formattedCurrentTime }}</slot>
    </span>
</template>

<script>
import { componentInterval } from 'spyfu-vue-utils';
import { noop } from 'lodash-es';
import { formatShortTime } from '@/app/utils/string';

// frames per second
const fps = 30;

export default {
    created() {
        // keep track of time if we aren't in replay mode
        this.$options.interval = this.replay
            ? { cancel: noop }
            : componentInterval(this, () => { this.now = Date.now(); }, 1000 / fps);
    },
    data() {
        const now = this.replay ? Date.now() : 0;

        return {
            now,
            startTime: now,
        };
    },
    computed: {
        currentTime() {
            // calculate current time for replay mode
            if (this.replay) {
                return this.time * this.progress;
            }

            // otherwise return the amount of time that has passed
            return this.now - this.startTime;
        },
        formattedCurrentTime() {
            // format the current time
            return formatShortTime(this.currentTime);
        },
        replay() {
            // in replay mode this component simply displays time
            // based on props, and does not keep time in state.
            return Number.isFinite(this.time);
        },
    },
    props: {
        progress: {
            default: 1,
            type: Number,
        },
        time: {
            type: Number,
        },
    },
    watch: {
        replay(replay) {
            if (replay) {
                this.$options.interval.cancel();
            }
        },
    },
};
</script>
