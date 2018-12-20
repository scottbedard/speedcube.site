<template>
    <div>
        <!-- content -->
        <v-fade-transition>
            <!-- default content -->
            <div v-if="sidebarComponent === true" key="default">
                <v-user v-if="isAuthenticated" />
                <v-nav />
            </div>

            <!-- custom content -->
            <div v-else key="sidebar">
                <component :is="sidebarComponent" />
            </div>
        </v-fade-transition>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import content from './content';
import navComponent from './nav/nav.vue';
import userComponent from './user/user.vue';

export default {
    components: {
        'v-nav': navComponent,
        'v-user': userComponent,
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
        ...mapState('sidebar', [
            'contentId',
        ]),
        sidebarComponent() {
            return this.$route.meta.sidebar;
        },
    },
};
</script>
