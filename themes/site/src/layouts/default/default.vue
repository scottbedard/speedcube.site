<style lang="scss" scoped>
    .modals {
        height: 200px;

        &:not(:empty) {
            background-color: blue;
        }
    }
</style>

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

        <!-- modals -->
        <v-modals />
    </div>
</template>

<script>
import alertsComponent from './alerts/alerts.vue';
import headerComponent from './header/header.vue';
import modalsComponent from './modals/modals.vue';

export default {
    components: {
        'v-alerts': alertsComponent,
        'v-header': headerComponent,
        'v-modals': modalsComponent,
    },
};
</script>
