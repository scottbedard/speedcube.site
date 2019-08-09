<template>
    <v-page padded>
        <v-margin padded>
            <!-- <pre class="text-xs">{{ config }}</pre> -->

            <!-- puzzle -->
            <div class="max-w-xs mb-8 mx-auto">
                <div
                    class="border-2 border-dashed trans-border pb-full relative rounded"
                    :class="{
                        'border-transparent': edit !== 'appearance',
                        'border-grey-2': edit === 'appearance'
                    }">
                    <v-puzzle
                        :config="config"
                        :inspection="false"
                        :model="model"
                        :type="puzzle"
                        :turnable="true"
                    />
                </div>
            </div>

            <!-- content -->
            <div class="flex justify-center">
                <v-fade-transition>

                    <!-- appearance -->
                    <div
                        v-if="appearance"
                        data-appearance
                        class="max-w-4xl w-full"
                        key="appearance">
                        <v-appearance
                            :initial-config="config"
                            @apply="applyConfig"
                            @clear="clearPreviewConfig"
                            @set="setPreviewConfig"
                        />
                    </div>

                    <!-- keyboard -->
                    <div
                        v-else-if="keyboard"
                        class="w-full"
                        data-keyboard
                        key="keyboard">
                        <v-keyboard />
                    </div>

                    <!-- default -->
                    <div
                        v-else
                        class="text-center"
                        data-default
                        key="default">
                        <v-button
                            class="mx-6"
                            icon="fa-sliders"
                            ghost
                            title="Click to customize appearance"
                            :to="{ query: { edit: 'appearance' }}">
                            Customize Puzzle
                        </v-button>
                        <v-button
                            class="mx-6"
                            icon="fa-code"
                            ghost
                            title="Click to edit key bindings"
                            :to="{ query: { edit: 'keyboard' }}">
                            Edit Key Bindings
                        </v-button>
                    </div>
                </v-fade-transition>
            </div>
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
        'v-keyboard': () => import('./keyboard/keyboard.vue'),
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
            return this.edit === 'appearance';
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
        edit() {
            // normalize the currently open tab
            return get(this.$route, 'query.edit', '').toLowerCase().trim();
        },
        keyboard() {
            // determine if keyboard editor is open
            return this.edit === 'keyboard';
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
