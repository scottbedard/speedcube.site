<template>
    <v-margin padded>
        <v-card class="max-w-sm mx-auto" padded>
            <!-- title -->
            <h1 class="font-light mb-6 text-center">
                Create Account
            </h1>

            <!-- form -->
            <v-form @submit="onSubmit">
                <!-- name -->
                <v-form-field
                    label="Name"
                    name="name"
                    :value="name">
                    <v-input
                        v-model="name"
                        autofocus
                        data-name
                        placeholder="Name"
                        type="text"
                        :disabled="isLoading"
                    />
                </v-form-field>

                <!-- email -->
                <v-form-field
                    label="Email Address"
                    name="email"
                    rules="required|email"
                    :error-messages="{
                        required: 'Your email address is required',
                    }"
                    :value="email">
                    <v-input
                        v-model="email"
                        data-email
                        placeholder="Email Address"
                        type="email"
                        :disabled="isLoading"
                    />
                </v-form-field>

                <!-- password -->
                <v-form-field
                    label="Password"
                    name="password"
                    rules="required"
                    :error-messages="{
                        required: 'Please enter a password',
                    }"
                    :value="password">
                    <v-input
                        v-model="password"
                        data-password
                        placeholder="Password"
                        type="password"
                        :disabled="isLoading"
                    />
                </v-form-field>

                <!-- password confirmation -->
                <v-form-field
                    label="Confirm Password"
                    name="passwordConfirmation"
                    rules="required|sameAs:password"
                    :error-messages="{
                        required: 'Please confirm your password',
                        sameAs: 'This password confirmation does not match',
                    }"
                    :value="passwordConfirmation">
                    <v-input
                        v-model="passwordConfirmation"
                        data-password-confirmation
                        placeholder="Confirm Password"
                        type="password"
                        :disabled="isLoading"
                    />
                </v-form-field>

                <div class="mt-6 text-right">
                    <v-button
                        class="w-full sm:w-auto"
                        primary
                        type="submit">
                        Create Account
                    </v-button>
                </div>
            </v-form>
        </v-card>
    </v-margin>
</template>

<script>
import { postRegister } from '@/app/repositories/user';

export default {
    data() {
        return {
            email: '',
            isLoading: false,
            name: '',
            password: '',
            passwordConfirmation: '',
        };
    },
    methods: {
        onSubmit() {
            this.isLoading = true;

            postRegister({
                email: this.email,
                name: this.name,
                password: this.password,
                password_confirmation: this.passwordConfirmation,
            }).then((response) => {
                // success
                this.$store.commit('user/setUser', response.data);
                
                this.$router.push({ name: 'home' });
            }, () => {
                // failed
            }).finally(() => {
                // complete
                this.isLoading = false;
            });
        },
    },
};
</script>
