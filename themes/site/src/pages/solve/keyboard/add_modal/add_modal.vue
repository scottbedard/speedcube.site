<template>
    <v-modal title="Add Key Binding" @close="close">
        <v-form class="flex flex-wrap max-w-xl p-4" @submit="submit">
            <!-- key binding -->
            <div class="p-4 w-full sm:flex-1">
                <v-form-field
                    label="Key Binding"
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
            </div>

            <!-- turn -->
            <div class="p-4 w-full sm:flex-1">
                <v-form-field
                    label="Turn"
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
            </div>

            <!-- actions -->
            <div class="flex justify-end p-4 w-full">
                <v-button class="mr-6" ghost @click="close">Cancel</v-button>
                <v-button primary>Add<span class="hidden xs:inline">&nbsp;Binding</span></v-button>
            </div>
        </v-form>
    </v-modal>
</template>

<script>
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
        submit() {
            console.log('hey');
        },
    },
};
</script>
