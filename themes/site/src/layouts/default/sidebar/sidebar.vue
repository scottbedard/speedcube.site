<template>
    <div>
        <!-- user -->
        <v-user v-if="isAuthenticated" />
        
        <!-- nav -->
        <nav>
            <v-sidebar-link
                copy="Puzzles"
                icon="fa-cubes"
                :to="{ name: 'puzzle:3' }"
            />
            <v-sidebar-link
                copy="Stats"
                icon="fa-line-chart"
                :to="{ name: 'home' }"
            />
            <v-sidebar-link
                copy="Records"
                icon="fa-trophy"
                :to="{ name: 'records' }"
            />
            <v-sidebar-link
                copy="Customize"
                icon="fa-sliders"
                :to="{ name: 'home' }"
            />
        </nav>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import sidebarLinkComponent from './sidebar_link/sidebar_link.vue';
import userComponent from './user/user.vue';

export default {
    components: {
        'v-sidebar-link': sidebarLinkComponent,
        'v-user': userComponent,
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
    },
};
</script>
