<template functional>
    <router-link
        class="block font-bold ml-4 p-4 text-grey-light text-sm uppercase tracking-wide hover:no-underline hover:text-primary"
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
