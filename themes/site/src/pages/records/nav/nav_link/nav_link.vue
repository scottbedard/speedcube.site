<style lang="scss" scoped>
    .router-link-active {
        color: config('colors.primary-5');
    }
</style>

<template>
    <router-link
        class="font-bold inline-flex mx-2 text-grey-dark tracking-wide"
        :to="to">
        <span>{{ text }}</span>
    </router-link>
</template>

<script>
export default {
    props: [
        'text',
        'to',
    ],
};
</script>
