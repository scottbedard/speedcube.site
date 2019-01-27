<template>
    <div>
        <!-- form -->
        <form
            class="max-w-sm mx-auto w-full"
            @submit.prevent="onSubmit">

            <!-- options -->
            <div class="max-w-xs mx-auto w-full">
                <div
                    v-for="(option, index) in options"
                    class="mb-6"
                    :key="index">
                    <div
                        v-if="option.label"
                        v-text="option.label"
                        class="mb-2 text-grey-6 text-sm tracking-wide"
                    />
                    <v-range-input
                        v-if="option.type === 'range'"
                        v-model="currentOptions[option.key]"
                        :max="option.max"
                        :min="option.min"
                    />
                </div>
            </div>

            <!-- authentication warning -->
            <div
                v-if="!isAuthenticated"
                class="leading-normal mb-8 text-grey-6 text-sm">
                You aren't signed in, these settings won't be saved.
            </div>

            <!-- actions -->
            <div class="flex items-center justify-center">
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
    },
    methods: {
        close() {
            this.$emit('close');
        },
        initialize() {
            // set the initial values on our currentOptions object
            this.options.forEach(option => {
                this.$set(this.currentOptions, option.key, option.default);
            });

            // set the current config
            Object.keys(this.config).forEach(key => {
                if (typeof this.config[key] !== 'undefined') {
                    this.currentOptions[key] = this.config[key];
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
