<template>
    <v-page padded>
        <v-margin padded>
            <v-collapse-transition>
                <!-- loading -->
                <div
                    v-if="loading"
                    class="text-center"
                    key="loading">
                    <v-spinner />
                </div>

                <!-- forgot password -->
                <div
                    v-else-if="!sent"
                    key="form">
                    <!-- title -->
                    <div class="text-center">
                        <h1 class="font-thin mb-4 text-3xl text-grey-9 tracking-wide">
                            Let's get you a new password.
                        </h1>
                        <p class="leading-normal max-w-lg mx-auto text-grey-7">
                            Enter your email below, and we'll send you a one-time password reset link.
                        </p>
                    </div>

                    <!-- form -->
                    <v-card class="max-w-sm mx-auto my-10" padded>
                        <v-form
                            :errors="errors"
                            ref="form"
                            @submit="send">

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
                                    autofocus
                                    placeholder="Email Address"
                                    :disabled="loading"
                                />
                            </v-form-field>

                            <div class="flex flex-wrap items-start justify-end mt-8">
                                <!-- submit -->
                                <v-button primary type="submit">
                                    Send Reset Link
                                </v-button>
                            </div>
                        </v-form>
                    </v-card>
                </div>

                <!-- sent -->
                <div v-else-if="sent">
                    <div class="text-center">
                        <h1 class="font-thin mb-4 text-3xl text-grey-9 tracking-wide">
                            Password reset email sent!
                        </h1>
                        <p class="leading-normal max-w-lg mx-auto text-grey-7">
                            Check your email, soon you will receive an email from us with a link to reset your password.
                        </p>
                    </div>
                </div>
            </v-collapse-transition>
        </v-margin>
    </v-page>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            errors: {},
            loading: false,
            sent: false,
        };
    },
    methods: {
        send() {
            this.loading = true;

            this.$store.dispatch('user/sendPasswordResetEmail', this.email).then(() => {
                // success
                this.sent = true;
            }).finally(() => {
                // complete
                this.loading = false;
            });
        },
    },
};
</script>
