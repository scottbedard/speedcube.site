<style lang="scss" scoped>
    // https://jonsuh.com/hamburgers
    $hamburger-hover-transition-duration: config('transitions.default');
    $hamburger-layer-border-radius: 2px;
    $hamburger-layer-color: #CBD2D9;
    $hamburger-layer-height: 2px;
    $hamburger-layer-spacing: 4px;
    $hamburger-layer-width: 24px;
    $hamburger-padding-x: 2rem;
    $hamburger-padding-y: 0px;
    $hamburger-types: (elastic); // <- make sure this matches the hamburger animation name

    @import '../../../../../node_modules/hamburgers/_sass/hamburgers/hamburgers';

    button {
        outline: none;

        &.is-active {
            .hamburger-inner,
            .hamburger-inner:after,
            .hamburger-inner:before {
                background-color: #fff;
            }
        }
    }
</style>

<template>
    <div>
        <!-- hamburger -->
        <button
            aria-controls="navigation"
            aria-label="Menu"
            class="absolute h-20 hamburger hamburger--elastic pin-t pin-r"
            type="button"
            :class="{ 'is-active': expanded }"
            @click="open">
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
        </button>

        <!-- mobile nav -->
        <v-modal
            v-if="expanded"
            title="Mobile navigation"
            padded
            @close="close">
            <div class="text-center">
                <!-- user -->
                <div v-if="isAuthenticated">
                    <div class="mb-4">
                        <v-avatar :user="user" />
                    </div>
                    <router-link
                        class="block mb-4"
                        :to="{ name: 'account:profile', params: { puzzle: '3x3' }}">
                        Manage Account
                    </router-link>
                    <router-link
                        class="block mb-4"
                        :to="{ name: 'signout' }">
                        Sign Out
                    </router-link>
                </div>

                <!-- guest -->
                <div v-else>
                    <router-link
                        class="block mb-4"
                        :to="{ name: 'signin' }">
                        Sign In
                    </router-link>
                    <router-link
                        class="block"
                        :to="{ name: 'create-account' }">
                        Create Account
                    </router-link>
                </div>
            </div>
        </v-modal>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
    data() {
        return {
            expanded: false,
        };
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
        ...mapState('user', [
            'user',
        ]),
    },
    methods: {
        close() {
            this.expanded = false;
        },
        open() {
            this.expanded = true;
        },
    },
    watch: {
        $route: {
            deep: true,
            handler() {
                this.close();
            },
        },
    },
};
</script>
