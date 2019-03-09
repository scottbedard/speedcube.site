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
                    Want to share your best solves with the world? Enable Twitter broadcasting and we'll tweet a link to view the replay when you set a personal record. Optionally, provide your Twitter handle and we'll send the tweet directly to you.
                </p>
                <v-form @submit="save">
                    <!-- toggle -->
                    <div class="flex h-14 items-center mb-8">
                        <v-switch v-model="form.broadcasting" :disabled="loading">
                            <div class="text-grey-6" slot="off">
                                Your solves will not be broadcast on Twitter
                            </div>
                            <div slot="on">
                                <v-input
                                    v-model="form.handle"
                                    autofocus
                                    placeholder="Enter your twitter handle"
                                    :disabled="loading"
                                />
                            </div>
                        </v-switch>
                    </div>

                    <!-- actions -->
                    <div class="flex justify-end">
                        <v-button
                            class="w-full sm:w-auto"
                            primary
                            type="submit"
                            :disabled="loading">
                            Save
                        </v-button>
                    </div>
                </v-form>
            </div>
        </v-card>
    </div>
</template>

<script>
import accountHeaderComponent from '../../account_header/account_header.vue';

export default {
    data() {
        return {
            form: {
                broadcasting: false,
                handle: '',
            },
            loading: false,
        };
    },
    components: {
        'v-account-header': accountHeaderComponent,
    },
    methods: {
        save() {
            console.log ('ok...');
        },
    },
};
</script>