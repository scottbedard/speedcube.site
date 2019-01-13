<template>
    <div
        class="font-thin text-center text-grey-5 text-4xl"
        v-text="formattedTimeRemaining"
    />
</template>

<script>
import { cleanTimeout } from '@/app/utils/component';

export default {
    created() {
        this.timeRemaining = this.duration;
    },
    data() {
        return {
            timeRemaining: 0,
        };
    },
    mounted() {
        this.tick();
    },
    computed: {
        formattedTimeRemaining() {
            return Math.floor(this.timeRemaining / 1000);
        },
    },
    methods: {
        tick() {
            if (this.timeRemaining > 0) {
                cleanTimeout(this, () => {
                    this.timeRemaining -= 1000;
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
    },
};
</script>
