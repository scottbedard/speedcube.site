<template>
    <div class="flex flex-col min-h-screen">
        <!-- header -->
        <v-header />

        <!-- content -->
        <main class="flex-1 py-8" role="main">
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
