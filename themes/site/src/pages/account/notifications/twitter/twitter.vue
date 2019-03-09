<template>
    <div>
        <!-- header -->
        <v-account-header>
            Twitter Broadcasting
        </v-account-header>

        <!-- content -->
        <v-card padded>
            <div class="max-w-md mx-auto">
                <p class="leading-normal mb-8">
                    Want to share your best solves with the world? Enable Twitter broadcasting and we'll tweet a link to view the replay when you set a personal record.
                </p>

                <v-switch v-model="broadcasting" :disabled="loading">
                    <div slot="off">Twitter broadcasting is disabled</div>
                    <div slot="on">Your best solves will be broadcast on Twitter</div>
                </v-switch>
            </div>
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