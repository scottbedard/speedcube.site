<template>
    <div>
        <!-- account -->
        <v-account-header>
            Account
        </v-account-header>

        <v-card class="text-sm">
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
        </v-card>
    </div>
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
