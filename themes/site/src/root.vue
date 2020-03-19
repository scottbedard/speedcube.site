<style lang="scss" src="./scss/tailwind.scss"></style>
<style lang="scss" src="./scss/global.scss"></style>

<template>
    <div class="h-full">
        <v-fade-transition>
            <router-view />
        </v-fade-transition>
    </div>
</template>

<script>
import { bindExternalEvent } from 'spyfu-vue-utils';

export default {
    created() {
        this.trackBrowserDimensions();

        // @note: refactor this not to be stored on the window. it completely
        //        breaks testability, but is hacked in so we can access logic
        //        from our redirects. we should make an app factory to fix this.
        window.app = this;
    },
    methods: {
        trackBrowserDimensions() {
            const sync = () => {
                this.$store.commit('browser/setDimensions', {
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            bindExternalEvent(this, window, 'resize', sync);

            sync();
        },
    },
};
</script>
