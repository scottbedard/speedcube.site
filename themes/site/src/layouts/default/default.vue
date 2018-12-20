<style lang="scss" scoped>
    .layout {
        background: linear-gradient(to bottom, config('colors.grey-1'), config('colors.grey-2'));
    }
</style>

<template>
    <div class="bg-grey-1 layout flex h-full">
        <!-- sidebar -->
            <v-fade-transition>
                <!-- default sidebar -->
                <aside v-if="sidebar" class="bg-grey-2 px-6 py-10 shadow-sm w-80">
                    <v-sidebar />
                </aside>
            </v-fade-transition>

        <div class="flex-1 px-6 py-10" role="main">
            <!-- header -->
            <header>
                <v-header />
            </header>

            <!-- content -->
            <main role="main">
                <v-collapse-transition>
                    <router-view />
                </v-collapse-transition>
            </main>
        </div>

        <!-- alerts -->
        <v-alerts />
    </div>
</template>

<script>
import alertsComponent from './alerts/alerts.vue';
import headerComponent from './header/header.vue';
import sidebarComponent from './sidebar/sidebar.vue';

export default {
    components: {
        'v-alerts': alertsComponent,
        'v-header': headerComponent,
        'v-sidebar': sidebarComponent,
    },
    computed: {
        sidebar() {
            return this.$route.meta.sidebar;
        },
    }
};
</script>
