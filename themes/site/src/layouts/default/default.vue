<style lang="scss" scoped>
    .layout {
        background: linear-gradient(to bottom, config('colors.grey-1'), config('colors.grey-2'));
    }
</style>

<template>
    <div class="bg-grey-1 layout flex h-full">

        <!-- content -->
        <main class="flex-1 px-6 py-10" role="main">
            <v-collapse-transition>
                <router-view />
            </v-collapse-transition>
        </main>
        <!-- sidebar -->
        <aside class="bg-grey-2 px-6 py-10 shadow-lg w-80">
            <v-sidebar />
        </aside>

        <!-- alerts -->
        <v-alerts />
    </div>
</template>

<script>
import alertsComponent from './alerts/alerts.vue';
// import headerComponent from './header/header.vue';
// import footerComponent from './footer/footer.vue';
import sidebarComponent from './sidebar/sidebar.vue';

export default {
    components: {
        'v-alerts': alertsComponent,
        // 'v-header': headerComponent,
        // 'v-footer': footerComponent,
        'v-sidebar': sidebarComponent,
    },
};
</script>
