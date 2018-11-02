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

        <!-- footer -->
        <v-footer />
    </div>
</template>

<script>
import headerComponent from './header/header.vue';
import footerComponent from './footer/footer.vue';

export default {
    components: {
        'v-header': headerComponent,
        'v-footer': footerComponent,
    },
};
</script>
