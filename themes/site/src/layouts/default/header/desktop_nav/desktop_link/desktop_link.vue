<template functional>
    <router-link
        class="flex items-center no-underline px-4 text-grey-dark trans-bg trans-color hover:bg-grey-light hover:text-grey-darkest"
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
