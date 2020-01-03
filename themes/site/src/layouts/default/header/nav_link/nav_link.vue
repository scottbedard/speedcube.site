<style lang="scss" scoped>
    a + a {
        @apply ml-12
    }
</style>

<template functional>
    <router-link
        class="block font-bold no-underline text-grey-7 tracking-wide text-sm hover:text-grey-8"
        :to="props.to">
        <slot />
    </router-link>
</template>

<script>
export default {
    props: [
        'to',
    ],
};
</script>
