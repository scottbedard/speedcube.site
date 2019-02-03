<template>
    <div>
        <!-- header -->
        <v-header />

        <!-- content -->
        <main role="main">
            <v-collapse-transition>
                <router-view />
            </v-collapse-transition>
        </main>

        <!-- alerts -->
        <v-alerts />
    </div>
</template>

<script>
import alertsComponent from './alerts/alerts.vue';
import headerComponent from './header/header.vue';

export default {
    components: {
        'v-alerts': alertsComponent,
        'v-header': headerComponent,
    },
};
</script>
