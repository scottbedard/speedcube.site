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
        <div class="flex mb-6 text-sm">
            <div class="config-entries font-mono leading-normal max-w-md mx-auto">
                <a
                    v-for="({ key, turn }, index) in turns"
                    class="inline-flex items-center mb-6 text-left px-4 w-24"
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
                            />
                        </v-form-field>

                        <!-- actions -->
                        <div class="flex flex-wrap justify-end -m-2 overflow-hidden pt-8">
                            <v-button
                                class="m-2"
                                danger
                                size="sm"
                                type="button"
                                @click.prevent="deleteBinding(key)">
                                Delete
                            </v-button>
                            <v-button
                                class="m-2"
                                size="sm"
                                type="submit">
                                Confirm
                            </v-button>
                        </div>
                    </v-form>
                </v-modal>
            </div>
        </div>

        <!-- actions -->
        <div class="flex flex-wrap justify-center -m-4 overflow-hidden">
            <!-- add key binding -->
            <v-button
                class="m-4"
                href="#"
                size="sm"
                @click.prevent="addBinding">
                Add Key Binding
            </v-button>

            <!-- save -->
            <v-button
                class="m-4"
                href="#"
                size="sm"
                @click.prevent="onSaveClick">
                Save Changes
            </v-button>
        </div>

        <div class="mt-6">
            <a
                class="text-grey-7 text-xs tracking-wide uppercase hover:text-danger-7"
                href="#"
                @click.prevent="onCloseClick">
                Discard Changes
            </a>
        </div>
    </div>
</template>

<script>
import { cloneDeep, get } from 'lodash-es';

export default {
    data() {
        return {
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
            this.key = key;
            this.turn = this.pendingKeyboardConfig.turns[key];
            this.openForm();
        },
        onCloseClick() {
            this.$emit('close');
        },
        onSaveClick() {
            console.log(this.pendingKeyboardConfig);

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

            console.log(JSON.parse(JSON.stringify(this.pendingKeyboardConfig)))
            this.closeForm();
        },
    },
    props: {
        keyboardConfig: {
            required: true,
            type: Object,
        },
    },
};
</script>
