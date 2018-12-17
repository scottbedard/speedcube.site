<template>
    <div>
        <a
            class="flex items-center text-grey-6 text-sm"
            href="#"
            @click.prevent="onClick">
            <i class="fa fa-arrow-left mr-1"></i>
            Go back
        </a>
    </div>
</template>

<script>
export default {
    methods: {
        onClick() {
            this.$store.commit('sidebar/setContentId', 'nav');
        }
    }
}
</script>
