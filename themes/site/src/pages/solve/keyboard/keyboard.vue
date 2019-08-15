<template>
    <div class="max-w-5xl mx-auto">
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

        <!-- note -->
        <p class="max-w-2xl mb-8 mx-auto text-center text-grey-7 tracking-wider w-full">
            These are your current key bindings, displayed in <span class="font-mono whitespace-no-wrap">&quot;key<i class="fa fa-angle-right mx-2" />turn&quot;</span> format.<br class="hidden md:inline" />
            Making a turn will highlight the associated binding if one exists.
        </p>

        <!-- toolbar -->
        <div>
            <v-button
                class="mr-6"
                data-add-binding
                icon="fa-plus"
                ghost
                title="Click to add key binding"
                @click="showAddModal">
                Add Binding
            </v-button>

            <v-button
                class="mr-6"
                icon="fa-code"
                ghost
                title="Click to edit key binding JSON"
                @click="showJsonModal">
                Edit JSON
            </v-button>

            <v-button
                ghost
                icon="fa-trash-o"
                title="Click to remove all bindings"
                @click="removeAllBindings">
                Remove All Bindings
            </v-button>
        </div>

        <!-- current bindings -->
        <div>
            <v-collapse-transition>
                <div v-if="empty" key="empty">
                    <div class="border-2 border-dashed border-grey-5 my-8 p-8 text-center text-grey-4 rounded">
                        No key bindings are configured
                    </div>
                </div>

                <div v-else key="bindings">
                    <div class="flex flex-wrap font-mono justify-center mt-2 mb-8 text-center tracking-wider">
                        <a
                            v-for="(turn, key) in pendingConfig.turns"
                            class="my-2 px-4 py-2"
                            href="#"
                            title="Click to edit or remove key binding"
                            :key="key"
                            @click.prevent="edit({ key, turn })">
                            {{ key }}<i class="fa fa-angle-right mx-2" />{{ turn }}
                        </a>
                    </div>
                </div>
            </v-collapse-transition>
        </div>

        <!-- actions -->
        <div class="flex justify-end">
            <v-button
                class="mr-6"
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
    </div>
</template>

<script>
import { cloneDeep, get } from 'lodash-es';
import { jsonToObject } from '@/app/utils/object';
import { mapGetters, mapState } from 'vuex';
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

            // json modal visibility
            jsonModalIsVisible: false,

            // save loading state
            loading: false,

            // pending configuration
            pendingConfig: cloneDeep(this.initialConfig),
        };
    },
    components: {
        'v-binding-modal': () => import('./binding_modal/binding_modal.vue'),
        'v-json-modal': () => import('./json_modal/json_modal.vue'),
    },
    computed: {
        ...mapGetters('user', [
            'keyboardConfigForPuzzle',
        ]),
        ...mapState('user', [
            'user',
        ]),
        defaultConfig() {
            return cloneDeep(get(puzzles, `${this.puzzle}.defaultConfig`, {}));
        },
        empty() {
            return Object.keys(this.pendingConfig.turns).length === 0;
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
            this.$router.push({ query: { edit: undefined }});
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
        reset() {
            this.pendingConfig = cloneDeep(this.initialConfig);
        },
        removeAllBindings() {
            this.pendingConfig.turns = {};
        },
        save() {
            this.loading = true;

            postKeyboardConfig({
                config: JSON.stringify(this.pendingConfig),
                puzzle: this.puzzle,
            }).then(() => {
                // success
                this.$alert('Keyboard configuration saved.');

                this.$router.push({ query: { edit: undefined }});
            }).finally(() => {
                // refresh user
                return this.$store.dispatch('user/fresh');
            }).finally(() => {
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
    },
    props: {
        initialConfig: {
            required: true,
            type: Object,
        },
    },
};
</script>
