<template>
    <div
        class="font-thin text-center text-grey-5 text-4xl"
        v-text="formattedTimeRemaining"
    />
</template>

<script>
import { componentTimeout } from 'spyfu-vue-utils';

export default {
    data() {
        return {
            now: Date.now(),
        };
    },
    mounted() {
        this.tick();
    },
    computed: {
        formattedTimeRemaining() {
            return Math.ceil(this.timeRemaining / 1000);
        },
        timeRemaining() {
            return this.duration - (this.now - this.startedAt);
        },
    },
    methods: {
        tick() {
            if (this.timeRemaining > 0) {
                componentTimeout(this, () => {
                    this.now = Date.now();
                    this.tick();
                }, 1000);
            } else {
                this.$emit('complete');
            }
        },
    },
    props: {
        duration: {
            required: true,
            type: Number,
        },
        startedAt: {
            required: true,
            type: Number,
        },
    },
};
</script>
