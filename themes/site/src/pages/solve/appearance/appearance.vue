<template>
    <div>
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
                        class="block text-grey-7 tracking-wider"
                    />
                    <component
                        v-bind="field.props"
                        v-model="config[field.id]"
                        :disabled="loading"
                        :is="field.component"
                    />
                </v-grid-cell>
            </v-grid>

            <div class="mt-8">
                <!-- user actions -->
                <div
                    v-if="isAuthenticated"
                    class="flex items-center justify-end"
                    key="user">
                    <v-button
                        class="mr-6"
                        ghost
                        title="Click to discard changes"
                        :disabled="loading"
                        :to="solveRoute">
                        Cancel
                    </v-button>
                    <v-button
                        primary
                        title="Click to save changes"
                        type="submit"
                        :disabled="loading">
                        Save
                    </v-button>
                </div>

                <!-- guest actions -->
                <div
                    v-else
                    class="flex flex-wrap justify-between items-center text-center lg:text-left"
                    key="guest">
                    <p class="flex-1 pb-8 text-grey-7 text-sm tracking-wider w-full">
                        Please sign in or create an account to save puzzle settings.
                    </p>
                    <div class="pb-8 w-full lg:w-auto">
                        <v-button
                            class="mb-4 mx-6 xs:mx-auto xs:mr-6 lg:mb-0"
                            ghost
                            title="Click to discard changes"
                            :to="{ name: 'signin' }">
                            Sign In
                        </v-button>
                        <v-button
                            class="mb-4 lg:mb-0"
                            primary
                            :to="{ name: 'create-account' }">
                            Create Account
                        </v-button>
                    </div>
                </div>
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

                    this.$alert('Puzzle configuration saved');
                }).finally(() => {
                    // complete
                    this.loading = false;
                });
            } else {
                this.$emit('apply', this.config);

                this.$router.push(this.solveRoute);

                this.$alert('Configuration applied, sign in to save these settings');
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
