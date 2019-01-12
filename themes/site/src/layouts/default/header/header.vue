<template>
    <header class="bg-grey-2 shadow-md">
        <v-margin padded>
            <div class="flex h-20 items-center justify-between">
                <div class="flex items-center">
                    <router-link
                        class="block font-bold no-underline text-grey-7 tracking-wide text-sm hover:text-grey-8"
                        data-logo
                        :to="{ name: 'home' }">
                        speedcube.site
                    </router-link>
                    <v-nav-link :to="{ name: 'solve' }">
                        solve
                    </v-nav-link>
                    <v-nav-link :to="{ name: 'records' }">
                        records
                    </v-nav-link>
                </div>

                <!-- account -->
                <nav class="flex items-center">
                    <v-fade-transition>
                        <v-user v-if="isAuthenticated" />
                        <div class="flex items-center" v-else>
                            <v-nav-link :to="{ name: 'signin' }">
                                sign in
                            </v-nav-link>
                            <v-nav-link :to="{ name: 'create-account' }">
                                create account
                            </v-nav-link>
                        </div>
                    </v-fade-transition>
                </nav>
            </div>
        </v-margin>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
import navLinkComponent from './nav_link/nav_link.vue';
import userComponent from './user/user.vue';

export default {
    components: {
        'v-nav-link': navLinkComponent,
        'v-user': userComponent,
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
    },
};
</script>