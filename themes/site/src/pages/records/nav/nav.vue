<template>
    <div class="text-center">
        <v-nav-link
            icon="fa-cube"
            text="2x2"
            :to="{
                name: 'records',
                params: {
                    puzzle: '2x2',
                },
            }"
        />
        -
        <v-nav-link
            icon="fa-cube"
            text="3x3"
            :to="{
                name: 'records',
                params: {
                    puzzle: '3x3',
                },
            }"
        />
        -
        <v-nav-link
            icon="fa-cube"
            text="4x4"
            :to="{
                name: 'records',
                params: {
                    puzzle: '4x4',
                },
            }"
        />
        -
        <v-nav-link
            icon="fa-cube"
            text="5x5"
            :to="{
                name: 'records',
                params: {
                    puzzle: '5x5',
                },
            }"
        />
    </div>
</template>

<script>
import navLinkComponent from './nav_link/nav_link.vue';

export default {
    components: {
        'v-nav-link': navLinkComponent,
    },
};
</script>
