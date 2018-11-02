<template>
    <v-margin padded>
        <v-card class="max-w-sm mx-auto" padded>
            <!-- title -->
            <h1 class="font-light mb-4 text-center">
                Sign In
            </h1>

            <form @submit.prevent="onSubmit">
                <!-- username -->
                <v-input
                    v-model="email"
                    class="mb-4"
                    data-email
                    icon="envelope"
                    placeholder="Email Address"
                    type="email"
                />

                <!-- password -->
                <v-input
                    v-model="password"
                    class="mb-4"
                    data-password
                    icon="key"
                    placeholder="Password"
                    type="password"
                />

                <!-- submit -->
                <div class="text-right">
                    <v-button type="submit">
                        Submit
                    </v-button>
                </div>
            </form>
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
