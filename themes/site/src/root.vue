<style lang="scss" src="./scss/tailwind.scss"></style>
<style lang="scss" src="./scss/global.scss"></style>

<template>
    <div>
        <v-fade-transition>
            <router-view />
        </v-fade-transition>
    </div>
</template>

<script>
export default {
    created() {
        this.trackBrowserDimensions();
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
