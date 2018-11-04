<template>
    <v-margin padded>
        <v-card class="max-w-sm mx-auto" padded>
            <!-- title -->
            <h1 class="font-light mb-6 text-center">
                Sign In
            </h1>

            <v-form @submit="onSubmit">
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
                        icon="envelope"
                        placeholder="Email Address"
                        type="email"
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
                        icon="key"
                        placeholder="Password"
                        type="password"
                    />
                </v-form-field>

                <!-- submit -->
                <v-grid class="mt-6">
                    <v-grid-cell sm="6">
                        <v-form-field
                            class="mb-6 w-full"
                            name="remember"
                            :value="remember">
                            <v-checkbox v-model="remember">
                                Remember
                            </v-checkbox>
                        </v-form-field>
                    </v-grid-cell>
                    <v-grid-cell class="sm:text-right" sm="6">
                        <v-button
                            class="w-full sm:w-auto"
                            primary
                            type="submit">
                            Submit
                        </v-button>
                    </v-grid-cell>
                </v-grid>
            </v-form>
        </v-card>
    </v-margin>
</template>

<script>
import { mapTwoWayState } from 'spyfu-vuex-helpers';

export default {
    mounted() {
        // reset the signin store
        this.$store.commit('signin/reset');
    },
    computed: {
        ...mapTwoWayState('signin', {
            'form.email': 'setEmail',
            'form.password': 'setPassword',
            'form.remember': 'setRemember',
        }),
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('user/signin', {
                login: this.email,
                password: this.password,
                remember: false, // <- @todo: support remembered logins
            }).then(() => {
                // success
                this.$router.push({ name: 'home' });
            }, (err) => {
                // failed
                console.log('Authentication failed:', err.response.data.message);
            });
        },
    },
};
</script>
