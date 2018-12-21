<template>
    <v-page padded>
        <v-margin padded>
            <v-grid padded>
                <v-grid-cell md="3">
                    <v-account-nav />
                </v-grid-cell>
                <v-grid-cell md="9">
                    <v-fade-transition>
                        <router-view />
                    </v-fade-transition>
                </v-grid-cell>
            </v-grid>
        </v-margin>
    </v-page>
</template>

<script>
import accountNavComponent from './account_nav/account_nav.vue';

export default {
    components: {
        'v-account-nav': accountNavComponent,
    },
};
</script>
