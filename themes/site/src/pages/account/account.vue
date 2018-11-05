<template>
    <v-margin padded>
        <v-grid padded>
            <!-- account nav -->
            <v-grid-cell md="4" lg="3">
                <v-account-nav />
            </v-grid-cell>
            <v-grid-cell md="8" lg="9">
                <v-fade-transition>
                    <router-view />
                </v-fade-transition>
            </v-grid-cell>
        </v-grid>
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
