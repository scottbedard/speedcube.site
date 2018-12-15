<template>
    <v-margin padded>
        <!-- title -->
        <div class="text-center">
            <h1 class="mb-3 text-3xl">
                Welcome back
            </h1>
            <div class="text-grey-6">
                Sign in and go break some records!
            </div>
        </div>

        <!-- form -->
        <v-card
            class="max-w-sm mx-auto my-10"
            padded>

            <v-form
                :errors="errors"
                @submit="onSubmit">
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
                        autofocus
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
                        required: 'Please enter your password',
                    }"
                    :value="password">
                    <v-input
                        v-model="password"
                        data-password
                        placeholder="Enter password"
                        type="password"
                        :disabled="isLoading"
                    />

                    <router-link
                        slot="help"
                        tabindex="-1"
                        :to="{ name: 'forgot-password' }">
                        Forgot your password?
                    </router-link>
                </v-form-field>
                
                <!-- actions -->
                <div class="flex justify-end mt-8">
                    <v-button
                        primary
                        type="submit">
                        Sign in
                    </v-button>
                </div>
            </v-form>
        </v-card>

        <!-- sign up -->
        <div class="text-center text-sm">
            <div class="mb-2 text-grey-6">
                Don't have an account?
            </div>
            <router-link
                class="block font-bold"
                :to="{ name: 'create-account' }">
                Click here to create an account
            </router-link>
        </div>
    </v-margin>
</template>

<script>
export default {
    data() {
        return {
            errors: {},
            isLoading: false,
            email: '',
            password: '',
            remember: false,
        };
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('user/signin', {
                login: this.email,
                password: this.password,
                remember: this.remember,
            }).then(() => {
                // success
                this.$router.push({ name: this.$route.query.returnTo || 'home' });
            }, () => {
                // failed
                this.errors = {
                    password: 'Invalid email address / password combination',
                };
            });
        },
    },
};
</script>
