<template>
    <v-margin padded>
        <!-- title -->
        <h1 class="mb-16 text-center">
            Welcome back, please sign in.
        </h1>

        <!-- form -->
        <v-form
            class="max-w-sm mx-auto"
            :errors="errors"
            @submit="onSubmit">
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
                    autofocus
                    data-email
                    placeholder="Email address"
                    type="email"
                    :disabled="isLoading"
                />
            </v-form-field>

            <!-- password -->
            <v-form-field
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
            <div slot="actions">
                <v-grid>
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
                            Sign In
                        </v-button>
                    </v-grid-cell>
                </v-grid>
            </div>
        </v-form>
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
