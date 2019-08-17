<template>
    <v-modal
        title="JSON Keyboard Config"
        padded
        @close="close">
        <v-form @submit="submit">
            <v-grid padded>
                <v-grid-cell>
                    <v-form-field
                        label="JSON Keyboard Config"
                        name="json"
                        rules="required|json"
                        :error-messages="{
                            json: 'Invalid JSON configuration',
                            required: 'Keyboard configuration is required',
                        }"
                        :value="json">
                        <v-input
                            v-model="json"
                            class="font-mono"
                            tabindex="-1"
                        />
                    </v-form-field>
                    <div class="mt-6">
                        <p>
                            Be careful editing this, invalid JSON can break key bindings
                            and cause errors. This feature exists to make copy / pasting
                            between puzzles easier.
                        </p>
                    </div>
                </v-grid-cell>
                <v-grid-cell>
                    <div class="flex flex-wrap justify-between">
                        <div>
                            <!-- <v-button
                                ghost
                                icon="fa-clipboard"
                                title="Click to copy bindings to clipboard"
                                @click.prevent="copy">
                                Copy Bindings
                            </v-button> -->
                        </div>
                        <div>
                            <v-modal-actions>
                                <v-button
                                    ghost
                                    tabindex="-1"
                                    title="Click to discard changes"
                                    @click.prevent="close">
                                    Cancel
                                </v-button>
                                <v-button
                                    primary
                                    title="Click to apply changes"
                                    tabindex="-1"
                                    type="submit">
                                    Apply Config
                                </v-button>
                            </v-modal-actions>
                        </div>
                    </div>
                </v-grid-cell>
            </v-grid>
        </v-form>
    </v-modal>
</template>

<script>
import { copyToClipboard } from '@/app/utils/string';
import modalActionsComponent from '@/components/ui/modal_actions.vue';

export default {
    data() {
        return {
            json: JSON.stringify(this.initialConfig),
        };
    },
    components: {
        'v-modal-actions': modalActionsComponent,
    },
    methods: {
        close() {
            this.$emit('close');
        },
        copy() {
            copyToClipboard(this.json);

            this.$alert('Key bindings copied to clipboard');
        },
        submit() {
            this.$emit('apply', JSON.parse(this.json));
            this.close();
        },
    },
    props: {
        initialConfig: {
            default: () => ({}),
            type: Object,
        },
    },
};
</script>
