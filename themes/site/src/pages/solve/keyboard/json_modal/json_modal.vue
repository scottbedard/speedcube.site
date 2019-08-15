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
                        <v-textarea
                            v-model="json"
                            class="font-mono min-h-32 text-sm w-full"
                        />
                    </v-form-field>
                    <div class="flex mt-4 text-grey-7 text-sm">
                        <i class="fa fa-exclamation-triangle mt-1 mr-2" />
                        <div>
                            <strong>Proceed with caution...</strong><br />
                            Invalid configuration may break key bindings and cause errors. This feature
                            exists to make copy / pasting between puzzles easier.
                        </div>
                    </div>
                </v-grid-cell>
                <v-grid-cell>
                    <div class="flex justify-between">
                        <div>
                            <v-button
                                ghost
                                icon="fa-clipboard"
                                title="Click to copy bindings to clipboard"
                                @click.prevent="copy">
                                Copy Bindings
                            </v-button>
                        </div>
                        <div>
                            <v-button
                                class="mr-4"
                                ghost
                                title="Click to discard changes"
                                @click.prevent="close">
                                Cancel
                            </v-button>
                            <v-button
                                primary
                                title="Click to apply changes"
                                type="submit">
                                Apply
                            </v-button>
                        </div>
                    </div>
                </v-grid-cell>
            </v-grid>
        </v-form>
    </v-modal>
</template>

<script>
import { copyToClipboard } from '@/app/utils/string';
export default {
    data() {
        return {
            json: JSON.stringify(this.initialConfig, null, 2),
        };
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
