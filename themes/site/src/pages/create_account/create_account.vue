<template>
    <v-margin padded>
        <!-- title -->
        <h1 class="mb-4 text-center">
            Let's get you signed up!
        </h1>

        <p class="leading-normal mb-16 font-bold text-center text-grey">
            Please be aware, this site is under heavy development.<br class="hidden sm:inline" />
            Things may not work properly, and stats may be reset at any time.
        </p>

        <!-- form -->
        <v-form
            class="max-w-sm mx-auto"
            @submit="onSubmit">

            <!-- name -->
            <v-form-field
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

            <div slot="actions">
                <v-button
                    class="w-full sm:w-auto"
                    primary
                    type="submit">
                    Create Account
                </v-button>
            </div>
        </v-form>
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
