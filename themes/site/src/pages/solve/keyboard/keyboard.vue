<style lang="scss" scoped>
    .highlight-binding {
        @apply text-grey-10;
    }
</style>

<template>
    <div class="max-w-5xl mx-auto">
        <!-- puzzle controller -->
        <v-puzzle-controller
            v-if="!modalIsVisible"
            :config="pendingConfig"
            @space="onSpacebar"
            @keypress="highlightKey"
            @turn="executeTurn"
        />

        <!-- modals -->
        <v-binding-modal
            v-if="bindingModalIsVisible"
            :initial-key="bindingModalKey"
            :initial-turn="bindingModalTurn"
            @add="addPendingBinding"
            @close="bindingModalIsVisible = false"
            @delete="deletePendingBinding"
        />

        <v-json-modal
            v-if="jsonModalIsVisible"
            :initial-config="pendingConfig"
            @apply="applyJsonBindings"
            @close="jsonModalIsVisible = false"
        />

        <v-confirmation-modal
            v-if="removeAllBindingsConfirmationIsVisible"
            accept="Delete All Bindings"
            cancel="Cancel"
            header="You're about to clear all key bindings"
            paragraph="Doing this will delete all key bindings. You could still recover your current bindings by pressing cancel, but any unsaved changes would be lost."
            title="Confirm key binding reset"
            @confirm="removeAllBindings"
            @close="removeAllBindingsConfirmationIsVisible = false"
        />

        <v-confirmation-modal
            v-if="resetDefaultBindingsConfirmationIsVisible"
            accept="Reset Default Bindings"
            cancel="Cancel"
            header="You're about to reset the default bindings"
            paragraph="Pressing this resets all bindings back to their original state. You could still recover your current bindings by pressing cancel, but any unsaved changes would be lost."
            title="Confirm key bindings reset"
            @confirm="resetDefaultBindings"
            @close="resetDefaultBindingsConfirmationIsVisible = false"
        />

        <!-- note -->
        <p class="max-w-2xl mb-8 mx-auto text-center text-grey-7 tracking-wider w-full">
            These are your current key bindings, displayed in <span class="font-mono whitespace-no-wrap">&quot;key<i class="fa fa-angle-right mx-2" />turn&quot;</span> format.<br class="hidden md:inline" />
            Making a turn will highlight the associated binding if one exists.
        </p>

        <!-- toolbar -->
        <div class="flex flex-wrap">
            <div class="w-full sm:w-1/2 md:w-auto">
                <v-button
                    class="mr-6"
                    data-add-binding
                    icon="fa-plus"
                    ghost
                    title="Click to add key binding"
                    @click="showAddModal">
                    Add Binding
                </v-button>
            </div>
            <div class="w-full sm:w-1/2 md:w-auto">
                <v-button
                    class="mr-6"
                    icon="fa-code"
                    ghost
                    title="Click to edit key binding JSON"
                    @click="showJsonModal">
                    Edit JSON
                </v-button>
            </div>
            <div class="w-full sm:w-1/2 md:w-auto">
                <v-button
                    ghost
                    icon="fa-undo"
                    title="Click to restore default bindings"
                    @click="showResetDefaultConfirmationModal">
                    Reset Default
                </v-button>
            </div>
            <div class="w-full sm:w-1/2 md:w-auto">
                <v-button
                    ghost
                    icon="fa-trash-o"
                    title="Click to remove all bindings"
                    @click="showRemoveAllConfirmationModal">
                    Clear All
                </v-button>
            </div>
        </div>

        <!-- current bindings -->
        <div>
            <v-fade-transition>
                <div v-if="empty" key="empty">
                    <div class="py-24 px-8 text-center text-grey-5 text-sm tracking-wider">
                        No key bindings are configured
                    </div>
                </div>
                <div v-else key="bindings">
                    <div class="flex flex-wrap font-mono justify-center mt-2 mb-8 text-center tracking-wider">
                        <v-button
                            v-for="(turn, key) in pendingConfig.turns"
                            ghost
                            title="Click to edit or remove binding"
                            :class="{
                                'highlight-binding': highlighted.includes(key),
                            }"
                            :key="key"
                            @click.prevent="edit({ key, turn })">
                            {{ key }}<i class="fa fa-angle-right mx-2" />{{ turn }}
                        </v-button>
                    </div>
                </div>
            </v-fade-transition>
        </div>

        <!-- user actions -->
        <div
            v-if="isAuthenticated"
            class="flex justify-end text-center"
            key="user">
            <v-button
                class="xs:mr-6"
                ghost
                title="Click to discard changes"
                @click="cancel">
                Cancel
            </v-button>
            <v-button
                primary
                title="Click to save key bindings"
                @click="save">
                Save
            </v-button>
        </div>

        <!-- guest actions -->
        <div
            v-else
            class="flex flex-wrap justify-between items-center text-center lg:text-left"
            key="guest">
            <p class="flex-1 pb-8 text-grey-7 text-sm tracking-wider w-full">
                Please sign in or create an account to save key bindings.
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
</template>

<script>
import { cloneDeep, get } from 'lodash-es';
import { componentTimeout } from 'spyfu-vue-utils';
import { mapGetters, mapState } from 'vuex';
import puzzleControllerComponent from '@/components/puzzle/controller/controller.vue';
import { postKeyboardConfig } from '@/app/repositories/keyboard_configs';
import { puzzles } from '@/app/constants';

export default {
    data() {
        return {
            // visibility of key binding modal
            bindingModalIsVisible: false,

            // initial state for key binding modal
            bindingModalKey: '',
            bindingModalTurn: '',

            // key bindings to highlight by key
            highlighted: [],

            // json modal visibility
            jsonModalIsVisible: false,

            // save loading state
            loading: false,

            // pending configuration
            pendingConfig: cloneDeep(this.initialConfig),

            // remove all bindings modal visibility
            removeAllBindingsConfirmationIsVisible: false,

            // reset default bindings modal visibility
            resetDefaultBindingsConfirmationIsVisible: false,
        };
    },
    components: {
        'v-binding-modal': () => import('./binding_modal/binding_modal.vue'),
        'v-confirmation-modal': () => import('@/components/ui/confirmation_modal.vue'),
        'v-json-modal': () => import('./json_modal/json_modal.vue'),
        'v-puzzle-controller': puzzleControllerComponent,
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
            'keyboardConfigForPuzzle',
        ]),
        ...mapState('user', [
            'user',
        ]),
        defaultConfig() {
            return cloneDeep(get(puzzles, `${this.puzzle}.defaultConfig`, {}));
        },
        empty() {
            return Object.keys(get(this.pendingConfig, 'turns', {})).length === 0;
        },
        modalIsVisible() {
            return this.bindingModalIsVisible ||
                this.jsonModalIsVisible ||
                this.removeAllBindingsConfirmationIsVisible ||
                this.resetDefaultBindingsConfirmationIsVisible;
        },
        puzzle() {
            return get(this.$route, 'params.puzzle', '').toLowerCase().trim();
        },
    },
    methods: {
        addPendingBinding(binding) {
            this.bindingModalIsVisible = false;

            this.$set(this.pendingConfig.turns, binding.key, binding.turn);

            if (this.bindingModalKey && this.bindingModalKey !== binding.key) {
                this.$delete(this.pendingConfig.turns, this.bindingModalKey);
            }
        },
        applyJsonBindings(bindings) {
            this.pendingConfig = cloneDeep(bindings);
        },
        cancel() {
            this.$router.push({ query: { edit: undefined } });
        },
        deletePendingBinding(key) {
            this.bindingModalIsVisible = false;

            this.$delete(this.pendingConfig.turns, key);
        },
        edit({ key, turn }) {
            this.bindingModalKey = key;
            this.bindingModalTurn = turn;
            this.bindingModalIsVisible = true;
        },
        executeTurn(turn) {
            this.$emit('turn', turn);
        },
        highlightKey(e) {
            this.highlighted = this.highlighted.concat(e.key);

            componentTimeout(this, () => {
                this.highlighted = this.highlighted.filter(configKey => configKey !== e.key);
            }, 150);
        },
        onSpacebar(e) {
            e.preventDefault();
        },
        reset() {
            this.pendingConfig = cloneDeep(this.initialConfig);
        },
        resetDefaultBindings() {
            this.resetDefaultBindingsConfirmationIsVisible = false;
            this.pendingConfig.turns = get(puzzles, `${this.puzzle}.defaultKeyboardConfig.turns`, {});
        },
        removeAllBindings() {
            this.removeAllBindingsConfirmationIsVisible = false;
            this.pendingConfig.turns = {};
        },
        save() {
            this.loading = true;

            postKeyboardConfig({
                config: JSON.stringify(this.pendingConfig),
                puzzle: this.puzzle,
            }).then(() => {
                // success
                this.$alert('Keyboard configuration saved');

                this.$router.push({ query: { edit: undefined } });
            }).finally(() => this.$store.dispatch('user/fresh')).finally(() => {
                // complete
                this.loading = false;
            });
        },
        showAddModal() {
            this.bindingModalKey = '';
            this.bindingModalTurn = '';
            this.bindingModalIsVisible = true;
        },
        showJsonModal() {
            this.jsonModalIsVisible = true;
        },
        showRemoveAllConfirmationModal() {
            this.removeAllBindingsConfirmationIsVisible = true;
        },
        showResetDefaultConfirmationModal() {
            this.resetDefaultBindingsConfirmationIsVisible = true;
        },
    },
    props: {
        initialConfig: {
            required: true,
            type: Object,
        },
    },
};
</script>
