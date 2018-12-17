<template>
    <div>
        <!-- user -->
        <v-user v-if="isAuthenticated" />
        
        <!-- nav -->
        <v-collapse-transition>
            <component :is="contentComponent" />
        </v-collapse-transition>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import content from './content';
import userComponent from './user/user.vue';

export default {
    components: {
        'v-user': userComponent,
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
        ...mapState('sidebar', [
            'contentId',
        ]),
        contentComponent() {
            return content[this.contentId];
        },
    },
};
</script>
