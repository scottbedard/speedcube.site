<template>
    <div>
        <!-- header -->
        <v-account-header>
            Twitter Broadcasting
        </v-account-header>

        <!-- content -->
        <v-card padded>
            <p class="leading-normal max-w-md mb-8">
                Want to share your personal records with the world? Enable Twitter broadcasting and we'll send a tweet any time your break a personal, national, or world record.
            </p>

            <v-checkbox v-model="broadcasting" :disabled="loading">
                Enable Twitter Broadcasting
            </v-checkbox>
        </v-card>
    </div>
</template>

<script>
import accountHeaderComponent from '../../account_header/account_header.vue';

export default {
    data() {
        return {
            broadcasting: false,
            loading: false,
        };
    },
    components: {
        'v-account-header': accountHeaderComponent,
    },
    methods: {
        // ...
    },
};
</script>