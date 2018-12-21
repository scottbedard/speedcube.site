<template functional>
    <router-link
        class="flex items-center p-4 text-grey-7 text-sm trans-bg trans-color hover:bg-grey-4 hover:text-grey-8"
        :to="props.to">
        <i :class="`fa ${props.icon} mr-2 text-center w-6`"></i>
        <slot />
    </router-link>
</template>

<script>
export default {
    props: [
        'icon',
        'to',
    ],
};
</script>
