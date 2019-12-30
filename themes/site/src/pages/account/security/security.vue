<template>
    <div>
        <!-- header -->
        <v-account-header>
            Change Password
        </v-account-header>

        <!-- form -->
        <v-card padded>
            <v-form
                :errors="errors"
                class="max-w-sm mx-auto"
                ref="form"
                @submit="onSubmit">

                <!-- new password -->
                <v-form-field
                    label="New password"
                    name="password"
                    rules="required"
                    :error-messages="{
                        required: 'Please enter your new password',
                    }"
                    :value="password">
                    <v-input
                        v-model="password"
                        autofocus
                        data-password
                        placeholder="New password"
                        type="password"
                        :disabled="isLoading"
                    />
                </v-form-field>

                <!-- password confirmation -->
                <v-form-field
                    label="Confirm new password"
                    name="passwordConfirmation"
                    rules="required|sameAs:password"
                    :error-messages="{
                        required: 'Please confirm your new password',
                        sameAs: 'Password confirmation does not match',
                    }"
                    :value="passwordConfirmation">
                    <v-input
                        v-model="passwordConfirmation"
                        type="password"
                        placeholder="Confirm new password"
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
                        Change Password
                    </v-button>
                </div>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import { postUser } from '@/app/repositories/user';
import accountHeaderComponent from '../account_header/account_header.vue';

export default {
    data() {
        return {
            errors: {},
            password: '',
            passwordConfirmation: '',
            isLoading: false,
        };
    },
    components: {
        'v-account-header': accountHeaderComponent,
    },
    methods: {
        onSubmit() {
            this.isLoading = true;

            postUser({
                password: this.password,
                password_confirmation: this.passwordConfirmation,
            }).then(() => {
                // success
                this.$alert('Your password has been changed', { type: 'success' });

                this.password = '';
                this.passwordConfirmation = '';
            }, (err) => {
                // failed
                if (err.response.status === 422) {
                    this.$refs.form.applyErrors(err.response.data);
                } else {
                    this.$alert('An unknown error has occured, please try again or contact support.', { type: 'error' });
                }
            }).finally(() => {
                // complete
                this.isLoading = false;
            });
        },
    },
};
</script>
