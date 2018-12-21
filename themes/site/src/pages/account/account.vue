<template>
    <v-page padded>
        <v-margin padded>
            <v-grid padded>
                <v-grid-cell md="4">
                    Left
                </v-grid-cell>
                <v-grid-cell md="8">
                    Right
                </v-grid-cell>
            </v-grid>
        </v-margin>
    </v-page>
</template>

<script>
import accountNavComponent from './account_nav/account_nav.vue';
import sidebarComponent from './sidebar/sidebar.vue';

export default {
    components: {
        'v-account-nav': accountNavComponent,
        'v-sidebar': sidebarComponent,
    },
};
</script>
