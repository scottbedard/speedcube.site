<template>
    <v-modal
        title="Add Key Binding"
        padded
        @close="close">
        <div ref="container">
            <v-form @submit="submit">
                <v-grid padded>
                    <!-- key binding -->
                    <v-grid-cell sm="6">
                        <v-form-field
                            label="Key binding"
                            name="key"
                            rules="required"
                            :error-messages="{
                                required: 'Enter a key on your keyboard',
                            }"
                            :value="key">
                            <v-input
                                v-model="key"
                                placeholder="Enter key"
                                @keydown.enter="submitForm"
                            />
                        </v-form-field>
                    </v-grid-cell>

                    <!-- turn -->
                    <v-grid-cell sm="6">
                        <v-form-field
                            label="Turn to execute"
                            name="turn"
                            rules="required"
                            :error-messages="{
                                required: 'Enter the turn to execute when this key is pressed',
                            }"
                            :value="turn">
                            <v-input
                                v-model="turn"
                                placeholder="Enter a turn"
                                @keydown.enter="submitForm"
                            />
                        </v-form-field>
                    </v-grid-cell>

                    <!-- actions -->
                    <v-grid-cell>
                        <div class="flex justify-between">
                            <div>
                                <v-button
                                    v-if="context === 'edit'"
                                    danger
                                    ghost
                                    icon="fa-trash-o"
                                    title="Click to remove this key binding"
                                    @click.prevent="deleteBinding">
                                    Delete Binding
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
                                    type="submit"
                                    :title="`Click to ${context === 'edit' ? 'update' : 'add'} key binding`">
                                    {{ context === 'edit' ? 'Update' : 'Add' }}<span class="hidden xs:inline">&nbsp;Binding</span></span>
                                </v-button>
                            </div>
                        </div>
                    </v-grid-cell>
                </v-grid>
            </v-form>
        </div>
    </v-modal>
</template>

<script>
import { queryElementThen } from '@/app/utils/dom';

export default {
    data() {
        return {
            key: this.initialKey || '',
            turn: this.initialTurn || '',
        };
    },
    computed: {
        context() {
            return (this.initialKey.length > 0 && this.initialTurn.length > 0)
                ? 'edit'
                : 'create';
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        deleteBinding() {
            this.$emit('delete', this.initialKey);
        },
        submitForm(e) {
            e.preventDefault();

            queryElementThen(this.$refs.container, 'form', (formElement) => {
                formElement.dispatchEvent(new Event('submit'));
            });
        },
        submit() {
            this.$emit('add', { key: this.key, turn: this.turn });
        },
    },
    props: {
        initialKey: {
            default: '',
            type: String,
        },
        initialTurn: {
            default: '',
            type: String,
        },
    },
};
</script>
