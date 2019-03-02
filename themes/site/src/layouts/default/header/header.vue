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
                    <div class="hidden items-center ml-8 md:flex">
                        <v-nav-link :to="{ name: 'solve', params: { puzzle: '3x3' }}">
                            solve
                        </v-nav-link>
                        <v-nav-link :to="{ name: 'records', params: { puzzle: '3x3' }}">
                            records
                        </v-nav-link>
                    </div>
                </div>

                <!-- navigation -->
                <nav>
                    <div class="hidden items-center md:flex">
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
                    </div>
                    <div class="md:hidden">
                        <v-mobile-nav />
                    </div>
                </nav>
            </div>
        </v-margin>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
import mobileNavComponent from './mobile_nav/mobile_nav.vue';
import navLinkComponent from './nav_link/nav_link.vue';
import userComponent from './user/user.vue';

export default {
    components: {
        'v-mobile-nav': mobileNavComponent,
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
