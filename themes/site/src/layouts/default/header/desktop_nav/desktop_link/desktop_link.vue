<template functional>
    <router-link
        class="block font-bold ml-8 text-grey-8 text-xs uppercase tracking-wide hover:no-underline hover:text-primary-7"
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
