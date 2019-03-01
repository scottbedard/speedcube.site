<template>
    <div class="relative" @click.stop>
        <!-- avatar -->
        <a
            class="flex items-center text-grey-6 hover:text-grey-6"
            href="#"
            @click.prevent="expand">
            <v-avatar :user="user" />
            <i class="fa fa-angle-down ml-3"></i>
        </a>

        <!-- dropdown -->
        <v-fade-transition>
            <div
                v-if="isExpanded"
                class="absolute mt-10 pin-t-full pin-r w-64 z-10">
                <v-card class="overflow-hidden">
                    <v-dropdown-link icon="fa-user-circle-o" :to="{ name: 'account:profile' }">
                        My Account
                    </v-dropdown-link>
                    <v-dropdown-link
                        icon="fa-line-chart"
                        :to="{
                            name: 'users:show',
                            params: {
                                username: this.user.username,
                            },
                        }">
                        Stats
                    </v-dropdown-link>
                    <v-dropdown-link icon="fa-sign-out" :to="{ name: 'signout' }">
                        Sign out
                    </v-dropdown-link>
                </v-card>
            </div>
        </v-fade-transition>
    </div>
</template>

<script>
import { bindExternalEvent } from 'spyfu-vue-utils';
import { mapState } from 'vuex';
import dropdownLinkComponent from './dropdown_link/dropdown_link.vue';

export default {
    created() {
        // collapse the dropdown when a click reaches the body
        bindExternalEvent(this, document.body, 'click', this.collapse);
    },
    data() {
        return {
            isExpanded: false,
        };
    },
    components: {
        'v-dropdown-link': dropdownLinkComponent,
    },
    computed: {
        ...mapState('browser', [
            'dimensions',
        ]),
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
    },
    watch: {
        'dimensions.width': 'collapse',
        $route: 'collapse',
    },
};
</script>
