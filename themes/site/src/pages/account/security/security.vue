<template>
    <div>
        <!-- header -->
        <v-account-header>
            Change Password
        </v-account-header>

        <!-- form -->
        <v-card padded>
            <v-form
                class="max-w-sm mx-auto"
                @submit="onSubmit">

                <!-- new password -->
                <v-form-field
                    label="New password"
                    name="password"
                    rules="required"
                    :error-messages="{
                        required: 'Please enter your new password',
                    }"
                    :value="password">
                    <v-input
                        v-model="password"
                        autofocus
                        type="password"
                        placeholder="New password"
                        :disabled="isLoading"
                    />
                </v-form-field>

                <!-- password confirmation -->
                <v-form-field
                    label="Confirm new password"
                    name="passwordConfirmation"
                    rules="required|sameAs:password"
                    :error-messages="{
                        required: 'Please confirm your new password',
                        sameAs: 'Password confirmation does not match',
                    }"
                    :value="passwordConfirmation">
                    <v-input
                        v-model="passwordConfirmation"
                        type="password"
                        placeholder="Confirm new password"
                        :disabled="isLoading"
                    />
                </v-form-field>

                <!-- actions -->
                <div slot="actions">
                    <v-button
                        class="w-full sm:w-auto"
                        primary
                        type="submit"
                        :disabled="isLoading">
                        Change Password
                    </v-button>
                </div>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import accountHeaderComponent from '../account_header/account_header.vue';

export default {
    data() {
        return {
            password: '',
            passwordConfirmation: '',
            isLoading: false,
        };
    },
    components: {
        'v-account-header': accountHeaderComponent,
    },
    methods: {
        onSubmit() {
            // ...
        },
    },
};
</script>
