<template>
    <div>
        <!-- header -->
        <v-account-header>
            Contact Information
        </v-account-header>

        <!-- content -->
        <v-card padded>
            <v-form
                class="max-w-sm mx-auto"
                @submit="onSubmit">

                <!-- name -->
                <v-form-field
                    label="Name"
                    name="name"
                    :value="name">
                    <v-input
                        v-model="name"
                        autofocus
                        placeholder="Anonymous"
                        :disabled="isLoading"
                    />
                </v-form-field>

                <!-- email -->
                <v-form-field
                    label="Email Address"
                    name="email"
                    rules="required|email"
                    :error-messages="{
                        required: 'Please enter your email address',
                    }"
                    :value="email">
                    <v-input
                        v-model="email"
                        type="email"
                        placeholder="Email Address"
                        :disabled="isLoading"
                    />
                </v-form-field>

                <!-- actions -->
                <div slot="actions">
                    <v-button
                        class="w-full sm:w-auto"
                        primary
                        type="submit"
                        :disabled="isLoading">
                        Save
                    </v-button>
                </div>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import accountHeaderComponent from '../../account_header/account_header.vue';
import { get } from 'lodash-es';

export default {
    data() {
        return {
            isLoading: false,
            email: this.$store.state.user.user.email,
            name: this.$store.state.user.user.name,
        };
    },
    components: {
        'v-account-header': accountHeaderComponent,
    },
    methods: {
        onSubmit() {
            this.isLoading = true;

            this.$store.dispatch('user/update', {
                name: this.name,
                email: this.email,
            }).then(() => {
                // success
                this.$alert('Your contact information has been updated.', { type: 'success' });
            }, (err) => {
                // failed
                if (get(err, 'response.data.status') === 'email_taken') {
                    this.$alert('An account already exists with that email address.', { type: 'error' });
                } else {
                    this.$alert('Failed to update contact information.', { type: 'error' });
                }
            }).finally(() => {
                // complete
                this.isLoading = false;
            });
        },
    },
};
</script>
