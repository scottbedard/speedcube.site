<template>
    <v-page padded>
        <v-margin padded>
            <!-- title -->
            <div class="text-center">
                <h1 class="font-thin mb-4 text-3xl text-grey-9 tracking-wide">
                    Let's get you an account!
                </h1>
                <div class="leading-normal text-grey-7">
                    Please be aware, this site is under heavy development.<br class="hidden sm:inline" />
                    Things may not work properly, and stats may be reset at any time.
                </div>
            </div>

            <!-- form -->
            <v-card class="max-w-sm mx-auto mt-12" padded>
                <v-form
                    class="max-w-sm mx-auto"
                    ref="form"
                    @submit="onSubmit">

                    <!-- username -->
                    <v-form-field
                        label="Username"
                        name="username"
                        :value="username">
                        <v-input
                            v-model="username"
                            autofocus
                            data-username
                            placeholder="Select a username"
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
                            placeholder="Enter email address"
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
                            placeholder="Enter a password"
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
                            placeholder="Confirm your password"
                            type="password"
                            :disabled="isLoading"
                        />
                    </v-form-field>

                    <div slot="actions">
                        <p class="font-thin leading-normal mb-6 text-left text-xs">
                            By creating an account you agree to adhear to our <router-link :to="{ name: 'terms' }" target="_blank">Code of Conduct</router-link>, by acting respecfully towards other users and participating fairly.
                        </p>
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
    </v-page>
</template>

<script>
import { get } from 'lodash-es';
import { postRegister } from '@/app/repositories/user';

export default {
    data() {
        return {
            email: '',
            isLoading: false,
            username: '',
            password: '',
            passwordConfirmation: '',
        };
    },
    methods: {
        onSubmit() {
            this.isLoading = true;

            postRegister({
                email: this.email,
                username: this.username,
                password: this.password,
                password_confirmation: this.passwordConfirmation,
            }).then((response) => {
                // success
                this.$store.commit('user/setUser', response.data);
                this.$router.push({ name: 'home' });
            }, (err) => {
                // failed
                const status = get(err, 'response.data.status');

                if (status === 'username_taken') {
                    this.$refs.form.applyErrors({
                        username: 'This username is already taken.',
                    });
                } else if (status === 'email_taken') {
                    this.$refs.form.applyErrors({
                        email: 'This email address is already registered. Try resetting your password if you\'ve forgotten it.',
                    });
                } else {
                    this.$refs.form.handleValidationError(err);
                }
            }).finally(() => {
                // complete
                this.isLoading = false;
            });
        },
    },
};
</script>
