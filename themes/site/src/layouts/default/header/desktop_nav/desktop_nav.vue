<template>
    <nav class="flex h-full items-center">
        <!-- user -->
        <template v-if="isAuthenticated">
            <div class="pr-8">
                <v-desktop-link :to="{ name: 'puzzle:3' }">
                    Solve
                </v-desktop-link>
            </div>
            <v-user />
        </template>

        <!-- guest -->
        <template v-else>
            <!-- sign in -->
            <v-desktop-link :to="{ name: 'signin' }">
                Sign In
            </v-desktop-link>

            <!-- sign up -->
            <v-desktop-link :to="{ name: 'create-account' }">
                Create Account
            </v-desktop-link>

            <!-- solve -->
            <v-desktop-link :to="{ name: 'puzzle:3' }">
                Solve
            </v-desktop-link>
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
