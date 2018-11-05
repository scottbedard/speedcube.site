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
            <i class="fa fa-angle-down mr-2 text-grey trans-color"></i>
            <div class="inline-block bg-white flex h-10 items-center justify-center rounded-full text-grey-dark trans-color w-10">
                <i class="fa fa-user-o text-xl"></i>
            </div>
        </a>

        <v-collapse-transition>
            <div
                v-if="isExpanded"
                class="absolute pin-r pin-t-full w-70">
                <v-card>
                    <!-- sign out -->
                    <router-link
                        class="block p-6"
                        :to="{ name: 'signout' }">
                        Sign out
                    </router-link>
                </v-card>
            </div>
        </v-collapse-transition>
    </div>
</template>

<script>
import { bindExternalEvent } from '@/app/utils/component';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            isExpanded: false,
        };
    },
    mounted() {
        bindExternalEvent(this, document.body, 'click', this.onBodyClick);
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
