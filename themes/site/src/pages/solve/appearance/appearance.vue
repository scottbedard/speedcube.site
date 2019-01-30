<template>
    <div>
        <!-- form -->
        <form
            class="max-w-lg mx-auto w-full"
            @submit.prevent="onSubmit">

            <!-- options -->
            <v-grid class="justify-center" padded>
                <v-grid-cell
                    v-for="(option, index) in options"
                    :xs="grid(option, 'xs')"
                    :sm="grid(option, 'sm')"
                    :md="grid(option, 'md')"
                    :lg="grid(option, 'lg')"
                    :xl="grid(option, 'xl')"
                    :key="index">
                    <div
                        v-if="option.label"
                        v-text="option.label"
                        class="mb-2 text-grey-6 text-sm tracking-wide"
                    />

                    <!-- colors -->
                    <div
                        v-if="option.type === 'colors'"
                        class="flex flex-wrap justify-center">
                        <div
                            v-for="(x, index) in arrayOfLength(option.faces)"
                            :key="index">
                            <div class="pt-2 px-2">
                                <v-color-input v-model="currentOptions[option.key][index]" />
                            </div>
                        </div>
                    </div>

                    <!-- number ranges -->
                    <v-range-input
                        v-else-if="option.type === 'range'"
                        v-model="currentOptions[option.key]"
                        :max="option.max"
                        :min="option.min"
                    />
                </v-grid-cell>
            </v-grid>

            <!-- authentication warning -->
            <div
                v-if="!isAuthenticated"
                class="leading-normal mt-8 text-grey-6 text-sm">
                You aren't signed in, these settings won't be saved.
            </div>

            <!-- actions -->
            <div class="mt-8 flex items-center justify-center">
                <a
                    class="mr-4 text-grey-7 text-xs tracking-wide uppercase hover:text-danger-7"
                    href="#"
                    @click.prevent="close">
                    Cancel
                </a>
                <v-button
                    size="sm"
                    type="submit">
                    {{ isAuthenticated ? 'Save' : 'Apply' }}
                </v-button>
            </div>
        </form>
    </div>
</template>

<script>
import { get } from 'lodash-es';
import { mapGetters } from 'vuex';

export default {
    created() {
        this.initialize();
    },
    data() {
        return {
            currentOptions: {},
        };
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
        arrayOfLength() {
            return (n, initialValue) => new Array(n).fill(initialValue);
        },
        grid() {
            return (obj, breakpoint) => get(obj, `grid.${breakpoint}`);
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        initialize() {
            // set the initial values on our currentOptions object
            this.options.forEach((option) => {
                this.$set(this.currentOptions, option.key, option.default);
            });

            // set the current config using a raw javascript object. we need
            // to do this in order to prevent mutatino errors, since the source
            // object is one that technically lives in the vuex user store.
            const rawConfig = JSON.parse(JSON.stringify(this.config));

            Object.keys(rawConfig).forEach((key) => {
                if (typeof rawConfig[key] !== 'undefined') {
                    this.currentOptions[key] = rawConfig[key];
                }
            });
        },
        onSubmit() {
            // for authenticated users save the config
            if (this.isAuthenticated) {
                this.$store.dispatch('user/saveConfig', {
                    puzzle: this.puzzle,
                    config: this.currentOptions,
                }).then(() => {
                    // success
                    this.close();
                });
            }

            // and for guests just tell the parent to use the config
            else {
                this.$emit('guest-config', this.config);
                this.close();
            }
        },
    },
    props: [
        'config',
        'options',
        'puzzle',
    ],
    watch: {
        currentOptions: {
            deep: true,
            handler(currentOptions) {
                this.$emit('pending', currentOptions);
            },
        },
    },
};
</script>
