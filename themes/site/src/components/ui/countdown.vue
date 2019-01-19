<template>
    <div
        class="font-thin text-center text-grey-5 text-4xl"
        v-text="formattedTimeRemaining"
    />
</template>

<script>
import { cleanTimeout } from '@/app/utils/component';

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
                cleanTimeout(this, () => {
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
