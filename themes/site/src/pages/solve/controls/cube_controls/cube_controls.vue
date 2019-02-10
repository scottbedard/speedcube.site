<style lang="scss" scoped>
    p {
        @apply leading-normal max-w-md mx-auto text-center text-grey-6 text-sm;
    }

    b {
        @apply font-mono inline-flex items-center text-sm;
    }
</style>

<template>
    <div>
        <!-- copy -->
        <p class="font-mono mb-4 uppercase">
            <strong>This feature is a work in progress, check back later.</strong>
        </p>

        <p class="mb-12">
            These are your current keyboard controls, displayed in <b>&quot;key <i class="fa fa-angle-right px-2"></i> turn&quot;</b> format.
            The <b>&quot;key&quot;</b> represents to the key on your keyboard, and the <b>&quot;turn&quot;</b> represents the puzzle turn to execute.
        </p>

        <!-- key bindings -->
        <div class="max-w-xl mx-auto mb-6 text-sm">
            <div class="pb-6">
                <a
                    class="flex m-4 uppercase text-xs tracking-wide"
                    href="#"
                    @click.prevent="addBinding">
                    <i class="fa fa-plus mr-2"></i>
                    Add Key Binding
                </a>
            </div>

            <div class="font-mono leading-normal w-full">
                <a
                    v-for="({ key, turn }, index) in turns"
                    class="inline-flex items-center mb-6 text-left px-4 w-20"
                    href="#"
                    :key="index"
                    @click.prevent="onBindingClick(key)">
                    {{ key }} <i class="fa fa-angle-right px-2"></i> {{ turn }}
                </a>

                <!-- modal -->
                <v-modal
                    v-if="formIsVisible"
                    padded
                    title="Update Key Binding"
                    @close="closeForm">
                    <v-form class="sm:w-96" @submit="updateTurn">
                        <!-- key binding -->
                        <v-form-field
                            label="Key binding"
                            name="key"
                            rules="required"
                            :error-messages="{
                                required: 'Please enter a key binding',
                            }"
                            :value="key">
                            <v-input
                                v-model="key"
                                placeholder="Enter key"
                                :disabled="loading"
                            />
                        </v-form-field>

                        <!-- turn -->
                        <v-form-field
                            label="Turn to execute"
                            name="turn"
                            rules="required"
                            :error-messages="{
                                required: 'Please enter a turn to execute for this key binding',
                            }"
                            :value="turn">
                            <v-input
                                v-model="turn"
                                placeholder="Enter a turn"
                                :disabled="loading"
                            />
                        </v-form-field>

                        <!-- actions -->
                        <div class="flex flex-wrap items-center justify-end -m-4 overflow-hidden pt-8 sm:justify-between">
                            <div>
                                <a
                                    v-if="formContext === 'update'"
                                    class="m-4 text-xs tracking-wide uppercase hover:text-danger-7"
                                    href="#"
                                    @click.prevent="deleteBinding(key)">
                                    Delete Key Binding
                                </a>
                            </div>
                            <v-button
                                class="m-4"
                                type="submit">
                                Apply
                            </v-button>
                        </div>
                    </v-form>
                </v-modal>
            </div>

            <!-- actions -->
            <v-collapse-transition>
                <div v-if="loading" key="loading">
                    <v-spinner />
                </div>
                <div v-else key="actions">
                    <div class="flex flex-wrap items-center justify-center -m-4 overflow-hidden pt-6 md:justify-end">
                        <!-- discard -->
                        <a
                            class="block m-4 uppercase text-xs tracking-wide hover:text-danger-7"
                            href="#"
                            :disabled="loading"
                            @click.prevent="onCloseClick">
                            Discard Changes
                        </a>

                        <!-- save -->
                        <v-button
                            class="m-4"
                            href="#"
                            :disabled="loading"
                            @click.prevent="onSaveClick">
                            Save
                        </v-button>
                    </div>
                </div>
            </v-collapse-transition>
        </div>

    </div>
</template>

<script>
import { cloneDeep, get } from 'lodash-es';

export default {
    data() {
        return {
            // form context
            formContext: 'update',

            // form visibility
            formIsVisible: false,

            // key binding
            key: '',

            // a clone of the keyboard config to hold pending changes
            pendingKeyboardConfig: cloneDeep(this.keyboardConfig),

            // turn field
            turn: '',
        };
    },
    computed: {
        turns() {
            const turns = get(this.pendingKeyboardConfig, 'turns', {});

            return Object.keys(turns).map(key => ({ key, turn: turns[key] }));
        },
    },
    methods: {
        addBinding() {
            this.formContext = 'add';
            this.key = '';
            this.turn = '';
            this.openForm();
        },
        closeForm() {
            this.formIsVisible = false;
        },
        deleteBinding(key) {
            this.$delete(this.pendingKeyboardConfig.turns, key);
            this.closeForm();
        },
        onBindingClick(key) {
            this.formContext = 'update';
            this.key = key;
            this.turn = this.pendingKeyboardConfig.turns[key];
            this.openForm();
        },
        onCloseClick() {
            this.$emit('close');
        },
        onSaveClick() {
            this.$emit('save', this.pendingKeyboardConfig);
        },
        openForm() {
            this.formIsVisible = true;
        },
        updateTurn() {
            if (!this.pendingKeyboardConfig.turns) {
                this.pendingKeyboardConfig.turns = {};
            }

            this.$set(this.pendingKeyboardConfig.turns, this.key, this.turn);

            this.closeForm();
        },
    },
    props: {
        keyboardConfig: {
            required: true,
            type: Object,
        },
        loading: {
            required: true,
            type: Boolean,
        },
    },
    watch: {
        formIsVisible(formIsVisible) {
            this.$emit(formIsVisible ? 'disable-turning' : 'enable-turning');
        },
        pendingKeyboardConfig: {
            deep: true,
            handler(pendingKeyboardConfig) {
                this.$emit('update-pending', pendingKeyboardConfig);
            },
        },
    },
};
</script>
