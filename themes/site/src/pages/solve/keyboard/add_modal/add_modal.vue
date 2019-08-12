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
                                :disabled="loading"
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
                                :disabled="loading"
                                @keydown.enter="submitForm"
                            />
                        </v-form-field>
                    </v-grid-cell>

                    <!-- actions -->
                    <v-grid-cell>
                        <div class="flex justify-end">
                            <v-button class="mr-4" ghost @click="close">Cancel</v-button>
                            <v-button primary>Add<span class="hidden xs:inline">&nbsp;Binding</span></v-button>
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
            key: '',
            loading: false,
            turn: '',
        };
    },
    methods: {
        close() {
            this.$emit('close');
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
};
</script>
