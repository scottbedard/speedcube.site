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
                <v-form ref="form" @submit="save">
                    <!-- toggle -->
                    <v-form-field
                        name="twitterBroadcasting"
                        :value="form.broadcasting">
                        <v-switch v-model="form.broadcasting" :disabled="loading">
                            <div class="text-grey-6" slot="off">
                                Broadcasting is disabled
                            </div>
                            <div slot="on">
                                Broadcasting is enabled
                            </div>
                        </v-switch>
                    </v-form-field>

                    <!-- handle -->
                    <v-collapse-transition>
                        <div v-if="form.broadcasting" class="pt-8">
                            <v-form-field
                                label="Twitter Handle"
                                name="twitterHandle"
                                :value="form.handle">
                                <v-input
                                    v-model="form.handle"
                                    autofocus
                                    placeholder="Please enter your Twitter handle"
                                    :disabled="loading"
                                />
                            </v-form-field>
                        </div>
                    </v-collapse-transition>

                    <!-- actions -->
                    <div class="flex justify-end" slot="actions">
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
import { get } from 'lodash-es';
import accountHeaderComponent from '../../account_header/account_header.vue';
import { postTwitter } from '@/app/repositories/profile';

export default {
    data() {
        return {
            form: {
                broadcasting: get(this.$store.state, 'user.user.profile.twitterBroadcasting', true),
                handle: get(this.$store.state, 'user.user.profile.twitterHandle', ''),
            },
            loading: false,
        };
    },
    components: {
        'v-account-header': accountHeaderComponent,
    },
    methods: {
        save() {
            this.loading = true;

            postTwitter(this.form).then((response) => {
                // success
                const { profile } = response.data;
                this.$store.commit('user/setProfile', profile);
                this.$alert('Twitter broadcast settings saved.');
            }, (err) => {
                // failed
                const status = get(err, 'response.data.status', 'unknown');

                if (status === 'invalid') {
                    this.$refs.form.handleValidationError(err);
                }
            }).finally(() => {
                // complete
                this.loading = false;
            });
        },
    },
};
</script>
