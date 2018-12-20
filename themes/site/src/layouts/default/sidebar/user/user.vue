<template>
    <div class="mb-6 px-1">
        <div class="flex items-center">
            <div class="border-2 border-grey-6 inline-block flex h-10 items-center justify-center rounded-full w-10">
                <i class="fa fa-user-o text-lg text-grey-6"></i>
            </div>
            <div class="ml-4">
                <div class="mb-2 font-bold text-grey-8">{{ user.name }}</div>
                <div class="text-sm">
                    <router-link
                        class="text-grey-6"
                        :to="{
                            name: 'account:profile',
                        }">
                        My Account
                    </router-link>
                    <span class="pointer-events-none inline-block text-grey-6 px-1">-</span>
                    <router-link
                        class="text-grey-6"
                        :to="{
                            name: 'signout',
                        }">
                        Sign out
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('user', [
            'user',
        ]),
    },
};
</script>