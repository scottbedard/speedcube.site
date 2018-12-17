<style lang="scss" scoped>
    a {
        &.router-link-active {
            // ...
        }
        
        &:hover i {
            color: config('colors.grey-8');
        } 
    }

    a + a {
        margin-top: 0.25rem;
    }
</style>

<template>
    <router-link
        class="flex font-bold h-10 items-center pr-4 rounded text-sm tracking-wide trans-bg trans-color text-grey-7 hover:bg-grey-4 hover:text-grey-9"
        :to="to">
        <i
            class="fa inline-block text-center text-grey-6 text-lg trans-color w-12"
            :class="icon"
        />
        {{ copy }}
    </router-link>
</template>

<script>
export default {
    props: [
        'copy',
        'icon',
        'to',
    ],
};
</script>
