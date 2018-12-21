<template>
    <div>
        <!-- header -->
        <v-account-header>
            Profile Photo
        </v-account-header>

        <!-- content -->
        <v-card padded>
            <div class="max-w-sm mx-auto">
                <!-- avatar -->
                <div class="flex justify-center">
                    <v-avatar
                        size="2xl"
                        :user="user"
                    />
                </div>

                <!-- controls -->
                <div class="mt-8 text-center">
                    <v-collapse-transition>
                        <div
                            v-if="hasAvatar"
                            class="flex h-12 items-center justify-center text-sm tracking-wide"
                            key="avatar">
                            <a
                                href="#"
                                @click.prevent="deletePhoto">
                                click here to delete photo
                            </a>
                        </div>
                        <div v-else key="upload">
                            <v-upload-button
                                accept="image/*"
                                outlined
                                @change="uploadPhoto">
                                Select Profile Photo
                            </v-upload-button>
                        </div>
                    </v-collapse-transition>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
import accountHeaderComponent from '../../account_header/account_header.vue';
import { mapGetters, mapState } from 'vuex';
import { deleteAvatar, postProfilePhoto } from '@/app/repositories/user';

export default {
    data() {
        return {
            deleteIsLoading: false,
            uploadIsLoading: false,
        };
    },
    components: {
        'v-account-header': accountHeaderComponent,
    },
    computed: {
        ...mapGetters('user', [
            'hasAvatar',
        ]),
        ...mapState('user', [
            'user',
        ]),
        isLoading() {
            return this.deleteIsLoading || this.uploadIsLoading;
        },
    },
    methods: {
        deletePhoto() {
            this.deleteIsLoading = true;

            deleteAvatar().then((response) => {
                // success
                this.$store.commit('user/removeAvatar');
            }, () => {
                // failed
            }).finally(() => {
                // complete
                this.deleteIsLoading = false;
            });
        },
        uploadPhoto(photo) {
            this.uploadIsLoading = true;

            postProfilePhoto(photo).then((response) => {
                // success
                this.$store.commit('user/setUser', response.data);
            }, () => {
                // failed
            }).finally(() => {
                // complete
                this.uploadIsLoading = false;
            });
        },
    },
};
</script>
