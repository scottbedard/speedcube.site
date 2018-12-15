<template>
    <nav class="flex h-full items-center">
        <!-- user -->
        <template v-if="isAuthenticated">
            <!-- solve -->
            <v-desktop-link :to="{ name: 'puzzle:3' }">
                Solve
            </v-desktop-link>

            <!-- records -->
            <v-desktop-link :to="{ name: 'records' }">
                Records
            </v-desktop-link>

            <!-- user -->
            <div class="ml-8">
                <v-user />
            </div>
        </template>

        <!-- guest -->
        <template v-else>
            <!-- sign in -->
            <v-desktop-link
                :to="{ name: 'signin' }">
                Sign In
            </v-desktop-link>

            <!-- sign up -->
            <v-button
                class="ml-8"
                outlined
                size="sm"
                :to="{ name: 'create-account' }">
                Create Account
            </v-button>

            <!-- solve -->
            <!-- <v-desktop-link :to="{ name: 'puzzle:3' }">
                Solve
            </v-desktop-link> -->

            <!-- records -->
            <!-- <v-desktop-link :to="{ name: 'records' }">
                Records
            </v-desktop-link> -->
        </template>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import desktopLinkComponent from './desktop_link/desktop_link.vue';
import userComponent from './user/user.vue';

export default {
    components: {
        'v-desktop-link': desktopLinkComponent,
        'v-user': userComponent,
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
    },
};
</script>
