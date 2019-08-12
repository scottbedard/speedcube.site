<template>
    <div class="max-w-5xl mx-auto">
        <!-- modals -->
        <v-add-modal
            v-if="addModalIsVisible"
            @add="addPendingBinding"
            @close="addModalIsVisible = false"
        />

        <!-- note -->
        <p class="max-w-xl mb-8 mx-auto text-center text-grey-7 tracking-wider text-sm w-full">
            These are your current key bindings, displayed in <span class="font-mono whitespace-no-wrap">&quot;key<i class="fa fa-angle-right mx-2" />turn&quot;</span> format.<br class="hidden sm:inline" />
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
                Add Key Binding
            </v-button>
            <v-button class="mr-6" icon="fa-code" ghost>Edit JSON</v-button>
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
            <v-fade-transition>
                <p v-if="empty" class="my-8 text-center text-grey-7">
                    No key bindings are configured, you're starting from a clean slate.
                </p>
                <div class="flex flex-wrap font-mono justify-center mt-2 mb-8 text-center tracking-wider" v-else>
                    <a
                        v-for="(turn, binding) in pendingConfig.turns"
                        class="my-2 px-4 py-2"
                        href="#"
                        title="Click to edit or remove key binding"
                        :key="binding"
                        @click.prevent>
                        {{ binding }}<i class="fa fa-angle-right mx-2" />{{ turn }}
                    </a>
                </div>
            </v-fade-transition>
        </div>

        <!-- actions -->
        <div class="flex justify-end">
            <v-button
                class="mr-6"
                ghost
                title="Click to discard changes">
                Cancel
            </v-button>
            <v-button
                primary
                title="Click to save key bindings">
                Save
            </v-button>
        </div>
    </div>
</template>

<script>
import { cloneDeep, get } from 'lodash-es';
import { jsonToObject } from '@/app/utils/object';
import { mapGetters, mapState } from 'vuex';
import { puzzles } from '@/app/constants';

export default {
    created() {
        this.reset();
    },
    data() {
        return {
            // visibility of modal to add key binding
            addModalIsVisible: false,

            // pending configuration
            pendingConfig: {},
        };
    },
    components: {
        'v-add-modal': () => import('./add_modal/add_modal.vue'),
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
            this.addModalIsVisible = false;

            this.$set(this.pendingConfig.turns, binding.key, binding.turn);
        },
        reset() {
            this.pendingConfig = cloneDeep(this.initialConfig);
        },
        removeAllBindings() {
            this.pendingConfig.turns = {};
        },
        showAddModal() {
            this.addModalIsVisible = true;
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
