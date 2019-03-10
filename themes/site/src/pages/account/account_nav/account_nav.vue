<template>
    <nav>
        <v-account-header>
            Profile
        </v-account-header>
        <v-card class="overflow-hidden">
            <v-account-link
                icon="fa-user-circle"
                :to="{ name: 'account:profile' }">
                Profile
            </v-account-link>
            <v-account-link
                icon="fa-lock"
                :to="{ name: 'account:security' }">
                Security
            </v-account-link>
            <v-account-link
                icon="fa-bullhorn"
                :to="{ name: 'account:notifications' }">
                Notifications
            </v-account-link>
        </v-card>
    </nav>
</template>

<script>
import accountHeaderComponent from '../account_header/account_header.vue';
import accountLinkComponent from './account_link/account_link.vue';

export default {
    components: {
        'v-account-header': accountHeaderComponent,
        'v-account-link': accountLinkComponent,
    },
};
</script>
