<template>
    <v-page padded>
        <v-margin padded>
            <!-- <pre class="text-xs">{{ config }}</pre> -->

            <!-- puzzle -->
            <div class="max-w-xs mb-8 mx-auto">
                <div class="pb-full relative">
                    <v-puzzle
                        :config="config"
                        :model="model"
                        :type="puzzle"
                    />
                </div>
            </div>

            <!-- content -->
            <v-fade-transition>

                <!-- appearance -->
                <div
                    v-if="appearance"
                    data-appearance
                    key="appearance">
                    <v-appearance
                        :initial-config="config"
                        @apply="applyConfig"
                        @clear="clearPreviewConfig"
                        @set="setPreviewConfig"
                    />
                </div>

                <!-- default -->
                <div
                    v-else
                    class="text-center"
                    data-default
                    key="default">
                    <router-link class="mx-4 tracking-wide" :to="{ query: { content: 'appearance' }}">
                        <i class="fa fa-sliders mr-2" />Customize Appearance
                    </router-link>
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import { get } from 'lodash-es';
import Cube from 'bedard-cube';
import puzzleComponent from '@/components/puzzle/puzzle.vue';
import { puzzles } from '@/app/constants';
import { mapGetters, mapState } from 'vuex';

export default {
    created() {
        this.createModel();
    },
    data() {
        return {
            // applied guest config
            appliedConfig: null,

            model: null,

            // visual config being previewed
            previewConfig: null,
        };
    },
    components: {
        'v-appearance': () => import('./appearance/appearance.vue'),
        'v-puzzle': puzzleComponent,
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
        ...mapState('user', [
            'user',
        ]),
        activeConfig() {
            // return the users config for this puzzle
            let activeConfig = {};

            if (this.isAuthenticated) {
                const userConfig = this.user.configs.find(obj => obj.puzzle === this.puzzle);

                if (userConfig) {
                    /* eslint-disable-next-line no-empty */
                    try { activeConfig = JSON.parse(userConfig.config) } catch (e) {}
                }
            }

            return activeConfig;
        },
        appearance() {
            // determine if the appearance editor should be visible
            return this.content === 'appearance';
        },
        config() {
            const defaultConfig = get(puzzles, `${this.puzzle}.defaultConfig`, {});

            if (this.previewConfig) {
                return { ...defaultConfig, ...this.previewConfig };
            }

            if (this.appliedConfig) {
                return { ...defaultConfig, ...this.appliedConfig };
            }

            return { ...defaultConfig, ...this.activeConfig };
        },
        content() {
            // normalize the currently open tab
            return get(this.$route, 'query.content', '').toLowerCase().trim();
        },
        puzzle() {
            // parse and normalize the puzzle id from current route
            return get(this.$route, 'params.puzzle', 'unknown').trim().toLowerCase();
        },
    },
    methods: {
        applyConfig(config) {
            this.appliedConfig = config;
        },
        clearPreviewConfig() {
            this.previewConfig = null;
        },
        createModel() {
            this.model = new Cube(3, { useObjects: true });
        },
        setPreviewConfig(config) {
            this.previewConfig = config;
        },
    },
};
</script>
