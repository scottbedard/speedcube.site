<template>
    <div>
        <!-- sidebar links -->
        <nav>
            <v-sidebar-link
                icon="fa-paint-brush"
                @click.prevent="select('appearance')">
                Appearance
            </v-sidebar-link>
            <!-- <v-sidebar-link icon="fa-gamepad" @click.prevent="select('controls')">
                Controls
            </v-sidebar-link> -->
        </nav>

        <!-- selected section -->
        <div class="absolute pin-l pin-t px-4 text-sm">
            <v-fade-transition>
                <!-- appearance -->
                <v-sidebar-card v-if="selected === 'appearance'">
                    <v-appearance @close="close" />
                </v-sidebar-card>

                <!-- controls -->
                <v-sidebar-card v-if="selected === 'controls'" @close="close">
                    <v-controls />
                </v-sidebar-card>
            </v-fade-transition>
        </div>
    </div>
</template>

<script>
import appearanceComponent from './appearance/appearance.vue';
import controlsComponent from './controls/controls.vue';
import sidebarCardComponent from './sidebar_card/sidebar_card.vue';
import sidebarLinkComponent from './sidebar_link/sidebar_link.vue';

export default {
    data() {
        return {
            selected: '',
        };
    },
    components: {
        'v-appearance': appearanceComponent,
        'v-controls': controlsComponent,
        'v-sidebar-card': sidebarCardComponent,
        'v-sidebar-link': sidebarLinkComponent,
    },
    methods: {
        close() {
            this.selected = '';
        },
        select(key) {
            this.selected = key;
        },
    },
};
</script>