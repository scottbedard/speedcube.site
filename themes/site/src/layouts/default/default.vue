<style lang="scss" scoped>
    .backdrop {
        background: linear-gradient(to bottom, config('colors.grey-1'), config('colors.grey-2'));
        z-index: -1;
    }
</style>

<template>
    <div class="layout flex flex-col">
        <div class="absolute backdrop min-h-screen w-full"></div>
        <!-- header -->
        <v-header />

        <!-- content -->
        <main class="flex-1" role="main">
            <v-collapse-transition>
                <router-view />
            </v-collapse-transition>
        </main>

        <!-- alerts -->
        <v-alerts />

        <!-- footer -->
        <v-footer />
    </div>
</template>

<script>
import alertsComponent from './alerts/alerts.vue';
import headerComponent from './header/header.vue';
import footerComponent from './footer/footer.vue';

export default {
    components: {
        'v-alerts': alertsComponent,
        'v-header': headerComponent,
        'v-footer': footerComponent,
    },
};
</script>
