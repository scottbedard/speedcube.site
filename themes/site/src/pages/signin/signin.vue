<template>
    <v-margin padded>
        <v-card class="max-w-sm mx-auto" padded>
            <!-- title -->
            <h1 class="font-light mb-2 text-center">
                Sign In
            </h1>

            <div class="mb-6 text-center text-grey-dark text-sm">
                Don't have an account? No problem, <router-link :to="{ name: 'create-account' }">click here to create one</router-link>.
            </div>

            <!-- form -->
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
                        required: 'Please enter your password',
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

                <!-- submit -->
                <v-grid class="mt-6">
                    <!-- remember -->
                    <v-grid-cell sm="6">
                        <v-form-field
                            class="mb-6 w-full"
                            name="remember"
                            :value="remember">
                            <v-checkbox
                                v-model="remember"
                                data-remember
                                :disabled="isLoading">
                                Remember
                            </v-checkbox>
                        </v-form-field>
                    </v-grid-cell>

                    <!-- submit -->
                    <v-grid-cell class="sm:text-right" sm="6">
                        <v-button
                            class="w-full sm:w-auto"
                            primary
                            type="submit"
                            :disabled="isLoading">
                            Submit
                        </v-button>
                    </v-grid-cell>
                </v-grid>
            </v-form>
        </v-card>
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
                this.$router.push({ name: 'home' });
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
