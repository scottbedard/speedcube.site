<template>
    <div class="max-w-2xl mx-auto">
        <!-- fields -->
        <v-grid padded>
            <v-grid-cell
                v-bind="field.cell"
                v-for="field in fields"
                :key="field.id">
                <label
                    v-if="field.label"
                    v-text="field.label"
                    class="block mb-4 text-grey-6"
                />
                <component
                    v-bind="field.props"
                    v-model="config[field.id]"
                    :is="field.component"
                />
            </v-grid-cell>
        </v-grid>

        <!-- actions -->
        <div class="flex justify-end mt-8">
            <v-button primary type="submit">Save</v-button>
        </div>
    </div>  
</template>

<script>
import options from './options';
import { cloneDeep, get } from 'lodash-es';
import { mapGetters, mapState } from 'vuex';
import { puzzles } from '@/app/constants';

export default {
    created() {
        this.cloneConfig();
    },
    data() {
        return {
            config: {},
        };
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
        ...mapState('user', [
            'user',
        ]),
        configs() {
            // the user's config models
            return get(this.user, 'configs', []);
        },
        defaultConfig() {
            // default config for this puzzle id
            return get(puzzles, `${this.puzzle}.defaultConfig`, {});
        },
        fields() {
            // get config fields for this puzzle id
            return get(options, this.puzzle, []);
        },
        puzzle() {
            // parse and normalize the puzzle id from current route
            return get(this.$route, 'params.puzzle', 'unknown').trim().toLowerCase();
        },
    },
    methods: {
        cloneConfig() {
            // create a clone of the default config, or the user's
            // custom config if they have already created one.
            let config = this.defaultConfig;

            if (this.isAuthenticated) {
                const model = this.configs.find(cfg => cfg.puzzle === this.puzzle);

                if (model) {
                    try { config = JSON.parse(model.config) } catch (e) {}
                }
            }
            
            this.config = cloneDeep(config);
        },
    },
};
</script>
