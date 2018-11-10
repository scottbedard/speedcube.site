<style lang="scss" scoped>
    a {
        &:hover {
            text-decoration: none;
        }
    }
</style>

<template>
    <div class="flex items-center relative" @click.stop>
        <a
            class="flex items-center"
            href="#"
            @click.prevent="expand">
            <i class="fa fa-angle-down mr-2 text-primary-lightest trans-color"></i>
            <div class="inline-block bg-white flex h-10 items-center justify-center rounded-full text-primary trans-color w-10">
                <i class="fa fa-user-o text-xl"></i>
            </div>
        </a>

        <v-fade-transition>
            <div
                v-if="isExpanded"
                class="absolute pin-r pin-t-full w-70">
                <v-card>
                    <!-- profile -->
                    <div class="p-6">
                        <div
                            v-text="user.name || 'Anonymous'"
                            class="font-bold mb-px"
                        />
                        <div
                            v-text="user.email"
                            class="text-grey-dark text-sm"
                        />
                    </div>

                    <div class="text-sm px-6 pb-6">
                        <!-- account -->
                        <v-user-link :to="{ name: 'account:profile' }">
                            My Account
                        </v-user-link>

                        <!-- sign out -->
                        <v-user-link :to="{ name: 'signout' }">
                            Sign out
                        </v-user-link>
                    </div>
                </v-card>
            </div>
        </v-fade-transition>
    </div>
</template>

<script>
import { bindExternalEvent } from '@/app/utils/component';
import { mapState } from 'vuex';
import userLinkComponent from './user_link/user_link.vue';

export default {
    data() {
        return {
            isExpanded: false,
        };
    },
    mounted() {
        bindExternalEvent(this, document.body, 'click', this.onBodyClick);
    },
    components: {
        'v-user-link': userLinkComponent,
    },
    computed: {
        ...mapState('user', [
            'user',
        ]),
    },
    methods: {
        collapse() {
            this.isExpanded = false;
        },
        expand() {
            this.isExpanded = true;
        },
        onBodyClick() {
            if (this.isExpanded) {
                this.collapse();
            }
        },
    },
    watch: {
        $route: 'collapse',
    },
};
</script>
