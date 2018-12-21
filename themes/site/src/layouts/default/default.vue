<style lang="scss" scoped>
    .layout {
        background: linear-gradient(to bottom, config('colors.grey-1'), config('colors.grey-2'));
    }
</style>

<template>
    <div class="bg-grey-1 layout h-full">
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
