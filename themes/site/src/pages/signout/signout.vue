<template>
    <v-margin padded>
        <h1 class="font-thin">Just a moment...</h1>
    </v-margin>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('user/signout').then(() => {
            this.$router.push({ name: 'home' });
        });
    },
};
</script>
