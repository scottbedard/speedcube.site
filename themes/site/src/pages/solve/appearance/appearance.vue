<template>
    <div class="max-w-3xl mx-auto">
        <form @submit.prevent="updateConfig">
            <!-- <pre class="text-xs">{{ config }}</pre> -->

            <!-- fields -->
            <v-grid padded>
                <v-grid-cell
                    v-bind="field.cell"
                    v-for="field in fields"
                    :key="field.id">
                    <label
                        v-if="field.label"
                        v-text="field.label"
                        class="block text-grey-6"
                    />
                    <component
                        v-bind="field.props"
                        v-model="config[field.id]"
                        :disabled="loading"
                        :is="field.component"
                    />
                </v-grid-cell>
            </v-grid>

            <!-- actions -->
            <div class="flex items-center justify-end mt-8">
                <v-button
                    v-if="!loading"
                    class="mr-6"
                    ghost
                    title="Click to discard changes"
                    :to="solveRoute">
                    Cancel
                </v-button>
                <v-fade-transition>
                    <v-button
                        primary
                        title="Click to save changes"
                        type="submit">
                        Save
                    </v-button>
                </v-fade-transition>
            </div>
        </form>
    </div>
</template>

<script>
import { cloneDeep, get } from 'lodash-es';
import { mapGetters, mapState } from 'vuex';
import options from './options';
import { puzzles } from '@/app/constants';

export default {
    created() {
        this.cloneConfig();
    },
    data() {
        return {
            config: {},
            loading: false,
        };
    },
    destroyed() {
        this.$emit('clear');
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
        solveRoute() {
            return {
                name: 'solve',
                params: {
                    puzzle: this.puzzle,
                },
            };
        },
    },
    methods: {
        cloneConfig() {
            // create a clone of the default config, or the user's
            // custom config if they have already created one.
            let config = { ...this.defaultConfig, ...this.initialConfig };

            if (this.isAuthenticated) {
                const model = this.configs.find(cfg => cfg.puzzle === this.puzzle);

                if (model) {
                    /* eslint-disable-next-line no-empty */
                    try { config = JSON.parse(model.config); } catch (e) {}
                }
            }

            this.config = cloneDeep(config);
        },
        updateConfig() {
            // save the user's config if they are authenticated
            if (this.isAuthenticated) {
                this.loading = true;

                this.$store.dispatch('user/saveConfig', {
                    config: JSON.stringify(this.config),
                    puzzle: this.puzzle,
                }).then(() => {
                    // success
                    this.$router.push(this.solveRoute);

                    this.$alert('Puzzle configuration saved!');
                }).finally(() => {
                    // complete
                    this.loading = false;
                });
            } else {
                this.$emit('apply', this.config);

                this.$router.push(this.solveRoute);

                this.$alert('Configuration applied, sign in to save these settings.');
            }
        },
    },
    props: [
        'initialConfig',
    ],
    watch: {
        config: {
            deep: true,
            handler() {
                this.$emit('set', this.config);
            },
        },
    },
};
</script>
