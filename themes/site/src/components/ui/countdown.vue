<template>
    <div class="font-thin text-center text-grey-dark text-4xl">
        {{ countdown }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            countdown: 15,
        };
    },
    mounted() {
        const tick = setInterval(this.tick, 1000);

        this.$on('hook:destroyed', () => clearInterval(tick));
    },
    methods: {
        tick() {
            this.countdown -= 1;
        },
    },
};
</script>
