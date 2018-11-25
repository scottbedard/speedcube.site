<style lang="scss" scoped>
    a {
        &:hover {
            text-decoration: none;

            i {
                color: config('colors.primary');
            }

            div {
                border-color: config('colors.primary');
            }
        }
    }
</style>

<template>
    <div class="flex items-center relative" @click.stop>
        <!-- user icon -->
        <a
            class="flex items-center"
            href="#"
            @click.prevent="expand">
            <i class="fa fa-angle-down mr-2 text-grey"></i>
            <div class="border-2 border-grey-dark inline-block flex h-10 items-center justify-center rounded-full w-10">
                <i class="fa fa-user-o text-grey-dark"></i>
            </div>
        </a>

        <!-- dropdown -->
        <div
            v-if="isExpanded"
            class="user-dropdown absolute pin-r pin-t rounded w-70 z-10">
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

                <div class="pb-6 text-sm">
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
