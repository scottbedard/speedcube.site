<template>
    <nav>
        <v-sidebar-link
            copy="Solving"
            icon="fa-clock-o"
            :to="{
                name: 'solve',
            }"
        />
        <v-sidebar-link
            copy="Stats"
            icon="fa-line-chart"
            :to="{
                name: 'home',
            }"
        />
        <v-sidebar-link
            copy="Records"
            icon="fa-trophy"
            :to="{
                name: 'records',
            }"
        />
        <v-sidebar-link
            copy="Customize"
            icon="fa-sliders"
            @click="setContentId('customize')"
        />
    </nav>
</template>

<script>
import sidebarLinkComponent from './sidebar_link/sidebar_link.vue';

export default {
    components: {
        'v-sidebar-link': sidebarLinkComponent,
    },
    methods: {
        setContentId(contentId) {
            this.$store.commit('sidebar/setContentId', contentId);
        },
    },
};
</script>
