<template>
    <div>
        <!-- header -->
        <v-account-header>
            Profile Photo
        </v-account-header>

        <!-- content -->
        <v-card padded>
            <v-form
                class="max-w-sm mx-auto"
                @submit="onSubmit">
                Soon...
            </v-form>
        </v-card>
    </div>
</template>

<script>
import accountHeaderComponent from '../../account_header/account_header.vue';

export default {
    data() {
        return {
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
