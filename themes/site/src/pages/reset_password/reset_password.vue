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

                <!-- form -->
                <div
                    v-else-if="!success"
                    key="form">
                    <!-- title -->
                    <div class="text-center">
                        <h1 class="font-thin mb-4 text-3xl text-grey-9 tracking-wide">
                            Choose a new password
                        </h1>
                    </div>

                    <!-- form -->
                    <v-card class="max-w-sm mx-auto my-10" padded>
                        <v-form
                            :errors="errors"
                            ref="form"
                            @submit="send">

                            <!-- password -->
                            <v-form-field
                                label="New Password"
                                name="password"
                                rules="required"
                                :error-messages="{
                                    required: 'Please enter a new password',
                                }"
                                :value="password">
                                <v-input
                                    v-model="password"
                                    autofocus
                                    placeholder="Enter a new password"
                                    type="password"
                                    :disabled="loading"
                                />
                            </v-form-field>

                            <!-- password confirmation -->
                            <v-form-field
                                label="Confirm New Password"
                                name="passwordConfirmation"
                                rules="required|sameAs:password"
                                :error-messages="{
                                    required: 'Please confirm your new password',
                                    sameAs: 'This confirmation does not match the password above',
                                }"
                                :value="passwordConfirmation">
                                <v-input
                                    v-model="passwordConfirmation"
                                    placeholder="Confirm your new password"
                                    type="password"
                                    :disabled="loading"
                                />
                            </v-form-field>

                            <!-- submit -->
                            <div class="flex flex-wrap items-start justify-end mt-8">
                                <v-button primary type="submit">
                                    Change Password
                                </v-button>
                            </div>
                        </v-form>
                    </v-card>
                </div>

                <!-- success -->
                <div
                    class="text-center"
                    v-else-if="success"
                    key="success">
                    <h1 class="font-thin mb-4 text-3xl text-grey-9 tracking-wide">
                        Your password has been updated!
                    </h1>
                    <p class="leading-normal max-w-lg mx-auto text-grey-7">
                        You may now <router-link :to="{ name: 'signin' }">sign in</router-link> and use the site as you normally would.
                    </p>
                </div>
            </v-collapse-transition>
        </v-margin>
    </v-page>
</template>

<script>
export default {
    data() {
        return {
            errors: {},
            loading: false,
            password: '',
            passwordConfirmation: '',
            success: false,
        };
    },
    methods: {
        send() {
            this.loading = true;

            this.$store.dispatch('user/resetPassword', {
                code: this.$route.query.code,
                password: this.password,
            }).then(() => {
                // success
                this.success = true;
            }).finally(() => {
                // complete
                this.loading = false;
            });
        },
    },
};
</script>
