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
            <v-button icon="fa-trash-o" ghost>Clear All Bindings</v-button>
        </div>

        <!-- current bindings -->
        <div class="flex flex-wrap font-mono justify-center mt-2 mb-8 text-center tracking-wider">
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
        puzzle() {
            return get(this.$route, 'params.puzzle', '').toLowerCase().trim();
        },
    },
    methods: {
        addPendingBinding(binding) {
            this.addModalIsVisible = false;
        },
        reset() {
            this.pendingConfig = cloneDeep(this.initialConfig);
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
