<template>
    <nav class="flex h-full">
        <!-- user -->
        <template v-if="isAuthenticated">
            user
        </template>

        <!-- guest -->
        <template v-else>
            <!-- sign in -->
            <v-desktop-link :to="{ name: 'signin' }">
                Sign in
            </v-desktop-link>
        </template>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import desktopLinkComponent from './desktop_link/desktop_link.vue';

export default {
    components: {
        'v-desktop-link': desktopLinkComponent,
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
    },
};
</script>
