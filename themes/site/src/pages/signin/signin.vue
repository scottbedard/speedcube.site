<template>
    <v-page padded>
        <v-margin padded>
            <!-- title -->
            <div class="text-center">
                <h1 class="font-thin mb-4 text-3xl text-grey-9 tracking-wide">
                    Welcome back
                </h1>
                <div class="leading-normal text-grey-7">
                    Sign in and go break some records!
                </div>
            </div>

            <!-- form -->
            <v-card class="max-w-sm mx-auto my-10" padded>
                <v-form
                    :errors="errors"
                    ref="form"
                    @submit="onSubmit">

                    <!-- username -->
                    <v-form-field
                        label="Username"
                        name="login"
                        rules="required"
                        :error-messages="{
                            required: 'Your username is required',
                        }"
                        :value="login">
                        <v-input
                            v-model="login"
                            autofocus
                            data-login
                            placeholder="Username"
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
                    <div class="flex flex-wrap items-start justify-between mt-8">
                        <!-- remember -->
                        <div class="mb-8 mr-6 sm:mb-0 sm:mr-0">
                            <v-checkbox
                                v-model="remember">
                                Remember me
                            </v-checkbox>
                        </div>

                        <!-- submit -->
                        <v-button primary type="submit">
                            Sign in
                        </v-button>
                    </div>

                    <!-- <pre>{{ $data }}</pre> -->
                </v-form>
            </v-card>

            <!-- sign up -->
            <div class="text-center text-sm">
                <div class="mb-2 text-grey-7">
                    Don't have an account?
                </div>
                <div>
                    <router-link
                        class="font-bold"
                        :to="{ name: 'create-account' }">
                        Click here to sign up
                    </router-link>
                </div>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
export default {
    data() {
        return {
            errors: {},
            isLoading: false,
            login: '',
            password: '',
            remember: false,
        };
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('user/signin', {
                login: this.login,
                password: this.password,
                remember: this.remember,
            }).then(() => {
                // success
                this.$router.push({ name: this.$route.query.returnTo || 'home' });
            }, (err) => {
                // failed
                this.$refs.form.handleValidationError(err);
            });
        },
    },
};
</script>
