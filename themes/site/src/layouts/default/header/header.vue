<template>
    <header class="bg-primary-light border-primary-darkest border-t-2">
        <v-margin class="flex h-16 items-center justify-between" padded>

            <!-- logo -->
            <router-link
                class="no-underline text-primary-lightest trans-color hover:text-white"
                data-logo
                :to="{ name: 'home' }">
                <strong>scs</strong>
            </router-link>

            <div class="h-full">
                <!-- mobile nav -->
                <div class="md:hidden">
                    <v-mobile-nav />
                </div>

                <!-- desktop nav -->
                <div class="hidden h-full items-center md:flex">
                    <v-desktop-nav />
                </div>
            </div>
        </v-margin>
    </header>
</template>

<script>
export default {
    components: {
        'v-desktop-nav': () => import('./desktop_nav/desktop_nav.vue'),
        'v-mobile-nav': () => import('./mobile_nav/mobile_nav.vue'),
    },
};
</script>
