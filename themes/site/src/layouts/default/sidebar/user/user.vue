<template>
    <div class="mb-6 px-1">
        <a
            class="flex items-center"
            href="#"
            @click.prevent>
            <div class="border-2 border-grey-6 inline-block flex h-10 items-center justify-center rounded-full w-10">
                <i class="fa fa-user-o text-lg text-grey-6"></i>
            </div>
            <div class="ml-4">
                <div class="mb-1 font-bold text-grey-8">{{ user.name }}</div>
                <div class="text-sm text-grey-6">{{ user.email }}</div>
            </div>
        </a>
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