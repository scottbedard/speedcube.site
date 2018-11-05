<style lang="scss" scoped>
    a {
        &:hover {
            text-decoration: none;
        }

        &:hover .fa-angle-down {
            color: config('colors.grey-dark');
        }

        &:hover .fa-user-o {
            color: config('colors.grey-darker');
        }
    }
</style>

<template>
    <div class="flex items-center relative" @click.stop>
        <a
            class="flex items-center"
            href="#"
            @click.prevent="expand">
            <div class="inline-block bg-white flex h-10 items-center justify-center rounded-full text-grey-dark trans-color w-10">
                <i class="fa fa-user-o text-xl"></i>
            </div>
            <i class="fa fa-angle-down ml-2 text-grey trans-color"></i>
        </a>

        <v-collapse-transition>
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
                        <!-- sign out -->
                        <v-user-link :to="{ name: 'signout' }">
                            Sign out
                        </v-user-link>
                    </div>
                </v-card>
            </div>
        </v-collapse-transition>
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
        }
    },
};
</script>
