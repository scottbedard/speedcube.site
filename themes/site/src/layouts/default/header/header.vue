<template>
    <div class="text-right">
        <div
            v-if="isAuthenticated"
            key="user">
            <!-- ... -->
        </div>

        <div
            v-else
            class="flex items-center justify-end"
            key="guest">
            <router-link
                class="block font-bold no-underline text-grey-7 tracking-wide text-sm"
                data-logo
                :to="{
                    name: 'signin'
                }">
                sign in
            </router-link>
            <router-link
                class="block font-bold ml-10 no-underline text-grey-7 tracking-wide text-sm"
                :to="{
                    name: 'create-account',
                }">
                create account
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
    },
};
</script>