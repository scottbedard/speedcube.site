<style lang="scss" src="./scss/tailwind.scss"></style>
<style lang="scss" src="./scss/global.scss"></style>

<template>
    <div class="h-full">
        <v-fade-transition>
            <router-view />
        </v-fade-transition>

        <!-- renderer -->
        <v-renderer />
    </div>
</template>

<script>
import rendererComponent from '@/components/three/renderer/renderer.vue';

export default {
    created() {
        this.trackBrowserDimensions();

        // @note: refactor this not to be stored on the window. it completely
        //        breaks testability, but is hacked in so we can access logic
        //        from our redirects. we should make an app factory to fix this.
        window.app = this;
    },
    components: {
        'v-renderer': rendererComponent,
    },
    methods: {
        trackBrowserDimensions() {
            const onResize = () => {
                this.$store.commit('browser/setDimensions', {
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            window.addEventListener('resize', onResize);

            onResize();
        },
    },
};
</script>
