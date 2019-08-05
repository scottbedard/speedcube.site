<template>
    <v-page padded>
        <v-margin padded>
            <!-- content -->
            <v-fade-transition>

                <!-- appearance -->
                <div
                    v-if="appearance"
                    data-appearance
                    key="appearance">
                    <v-appearance @change="previewAppearance" />
                </div>

                <!-- default -->
                <div
                    v-else
                    class="text-center"
                    data-default
                    key="default">
                    <router-link class="mx-4" :to="{ query: { content: 'appearance' }}">
                        <i class="fa fa-sliders mr-2" />Customize Puzzle
                    </router-link>
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import { get } from 'lodash-es';

export default {
    components: {
        'v-appearance': () => import('./appearance/appearance.vue'),
    },
    computed: {
        appearance() {
            // determine if the appearance editor should be visible
            return this.content === 'appearance';
        },
        content() {
            // normalize the currently open tab
            return get(this.$route, 'query.content', '').toLowerCase().trim();
        },
    },
    methods: {
        previewAppearance() {
            // ...
        },
    },
};
</script>
