<template>
    <header class="bg-grey-lighter">
        <v-margin class="flex justify-between py-4" padded>

            <!-- logo -->
            <router-link :to="{ name: 'home' }">
                <img
                    alt="Vuetober"
                    class="transition-width w-24 md:w-36"
                    data-logo
                    src="./logo.png"
                />
            </router-link>

            <v-fade-transition>
                <!-- mobile nav -->
                <div v-if="isMobile" key="mobile">
                    <v-mobile-nav />
                </div>

                <!-- desktop nav -->
                <div v-else class="flex items-center" key="desktop">
                    <v-desktop-nav />
                </div>
            </v-fade-transition>
        </v-margin>
    </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
    components: {
        'v-desktop-nav': () => import('./desktop_nav/desktop_nav.vue'),
        'v-mobile-nav': () => import('./mobile_nav/mobile_nav.vue'),
    },
    computed: {
        ...mapState('browser', {
            windowInnerWidth: state => state.dimensions.width,
        }),
        isMobile() {
            return this.windowInnerWidth < 768;
        },
    },
};
</script>
