<template>
    <div class="flex flex-col h-full">
        <!-- header -->
        <v-header />

        <!-- content -->
        <main class="flex-1" role="main">
            <v-collapse-transition>
                <router-view />
            </v-collapse-transition>
        </main>

        <!-- footer -->
        <v-footer />

        <!-- alerts -->
        <v-alerts />

        <!-- modals -->
        <v-modals />

        <!-- renderer -->
        <v-renderer />
    </div>
</template>

<script>
import alertsComponent from './alerts/alerts.vue';
import footerComponent from './footer/footer.vue';
import headerComponent from './header/header.vue';
import modalsComponent from './modals/modals.vue';
import rendererComponent from './renderer/renderer.vue';

export default {
    components: {
        'v-alerts': alertsComponent,
        'v-footer': footerComponent,
        'v-header': headerComponent,
        'v-modals': modalsComponent,
        'v-renderer': rendererComponent,
    },
};
</script>
