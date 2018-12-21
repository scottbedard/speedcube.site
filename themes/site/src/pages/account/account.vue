<template>
    <v-margin padded>
        <router-view />
    </v-margin>
</template>

<script>
import accountNavComponent from './account_nav/account_nav.vue';

export default {
    components: {
        'v-account-nav': accountNavComponent,
    },
};
</script>
