<template>
    <router-link
        class="font-bold inline-flex mx-2 text-grey-dark tracking-wide"
        :class="{
            'text-primary': isActive,
        }"
        :to="to">
        <span>{{ text }}</span>
    </router-link>
</template>

<script>
export default {
    computed: {
        isActive() {
            const currentEvent = this.$route.query.event || '3x3';

            return this.to.query.event === currentEvent;
        },
    },
    props: [
        'text',
        'to',
    ],
};
</script>
