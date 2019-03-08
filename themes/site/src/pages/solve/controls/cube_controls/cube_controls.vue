<style lang="scss" scoped>
    p {
        @apply leading-normal mx-auto;
    }

    b {
        @apply font-mono inline-flex items-center text-sm;
    }
</style>

<template>
    <div>
        <!-- copy -->
        <p class="max-w-lg mb-12 text-grey-7 text-sm">
            These are your current key bindings, displayed in <b>&quot;key <i class="fa fa-angle-right px-2"></i> turn&quot;</b> format.
            The <b>&quot;key&quot;</b> represents the key on your keyboard, and the <b>&quot;turn&quot;</b> represents the puzzle turn to execute.
            Feel free to use the puzzle while the key binding editor is open, making a turn will highlight the associated binding if one exists.
        </p>

        <!-- key bindings -->
        <div class="max-w-xl mx-auto mb-4 text-sm">
            <div v-if="isAuthenticated" class="flex items-center pb-4 uppsercase text-xs tracking-wide">
                <a
                    class="flex items-center m-4 outline-none"
                    href="#"
                    @click.prevent="addBinding">
                    <i class="fa fa-plus mr-2"></i>
                    Add Key Binding
                </a>
                <a
                    class="flex items-center m-4 outline-none"
                    href="#"
                    @click.prevent="showJson">
                    <i class="fa fa-code mr-2"></i>
                    Edit Raw JSON
                </a>
                <a
                    class="flex items-center m-4 outline-none hover:text-danger-7"
                    href="#"
                    @click.prevent="resetBindings">
                    <i class="fa fa-trash-o mr-2"></i>
                    Clear All Bindings
                </a>
            </div>

            <div class="leading-normal w-full">
                <v-collapse-transition>
                    <div v-if="empty" class="py-20" key="empty">
                        <p class="text-grey-7">No key bindings are configured. If you did not mean to do this, discard changes.</p>
                    </div>
                    <div v-else class="font-mono" key="bindings">
                        <a
                            v-for="({ key, turn }, index) in turns"
                            class="inline-flex items-center mb-6 text-left px-4 w-20"
                            href="#"
                            :class="{
                                'text-grey-10': isFlashing(key),
                            }"
                            :key="index"
                            @click.prevent="onBindingClick(key)">
                            {{ key }} <i class="fa fa-angle-right px-2"></i> {{ turn }}
                        </a>
                    </div>
                </v-collapse-transition>

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

            <!-- import / export modal -->
            <v-modal
                v-if="jsonIsVisible"
                padded
                title="Import / Export Key Bindings"
                @close="hideJson">
                <div class="color-grey-4 leading-normal max-w-sm mb-8 text-left text-sm">
                    Be careful editing this, invalid configuration may break your key bindings. Use this value to copy/paste bindings between puzzles.
                </div>
                <v-form @submit="applyJson">
                    <v-form-field
                        name="json"
                        label="Key Bindings"
                        rules="required|json"
                        :error-messages="{
                            required: 'Please enter key bindings',
                        }"
                        :value="pendingKeyboardConfigString">
                        <v-input
                            v-model="pendingKeyboardConfigString"
                            class="font-mono text-xs"
                            tabindex="-1"
                        />
                    </v-form-field>
                    <div slot="actions">
                        <v-button type="submit">Apply</v-button>
                    </div>
                </v-form>
            </v-modal>

            <!-- actions -->
            <v-collapse-transition>
                <div v-if="!isAuthenticated" class="mt-4" key="guest">
                    <p class="mb-4">Please <router-link :to="{ name: 'signin' }">sign in</router-link> or <router-link :to="{ name: 'create-account' }">create an account</router-link> to customize key bindings</p>
                    <p>
                        <a href="#" @click.prevent="onCloseClick">Click here to exit</a>
                    </p>
                </div>
                <div v-else-if="loading" key="loading">
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
import { cloneDeep, get, size } from 'lodash-es';
import { mapGetters } from 'vuex';
import { bindExternalEvent, componentTimeout } from 'spyfu-vue-utils';

export default {
    created() {
        bindExternalEvent(this, document.body, 'keypress', this.onBodyKeypress);
    },
    data() {
        return {
            // form context
            formContext: 'update',

            // illuminated keys
            flashKeys: [],

            // form visibility
            formIsVisible: false,

            // json modal visibility
            jsonIsVisible: false,

            // key binding
            key: '',

            // a clone of the keyboard config to hold pending changes
            pendingKeyboardConfig: cloneDeep(this.keyboardConfig),

            // string of pending keyboard config, used to import / export
            pendingKeyboardConfigString: '',

            // turn field
            turn: '',
        };
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
        empty() {
            return size(this.pendingKeyboardConfig.turns) === 0;
        },
        isFlashing() {
            return key => this.flashKeys.includes(key);
        },
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
        applyJson() {
            this.pendingKeyboardConfig = JSON.parse(this.pendingKeyboardConfigString);
            this.hideJson();
        },
        closeForm() {
            this.formIsVisible = false;
        },
        deleteBinding(key) {
            this.$delete(this.pendingKeyboardConfig.turns, key);
            this.closeForm();
        },
        flash(key) {
            const clear = () => {
                this.flashKeys = this.flashKeys.filter(k => k !== key);
            };

            clear();

            this.flashKeys.push(key);

            componentTimeout(this, clear, 300);
        },
        hideJson() {
            this.jsonIsVisible = false;
        },
        onBindingClick(key) {
            if (!this.isAuthenticated) {
                return;
            }

            this.formContext = 'update';
            this.key = key;
            this.turn = this.pendingKeyboardConfig.turns[key];
            this.openForm();
        },
        onBodyKeypress(e) {
            this.flash(e.key);
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
        resetBindings() {
            this.pendingKeyboardConfig = {
                turns: {},
            };
        },
        showJson() {
            this.jsonIsVisible = true;
            this.pendingKeyboardConfigString = JSON.stringify(this.pendingKeyboardConfig);
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
        jsonIsVisible(jsonIsVisible) {
            this.$emit(jsonIsVisible ? 'disable-turning' : 'enable-turning');
        },
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
