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

                <!-- avatar -->
                <div class="flex justify-center">
                    <v-avatar size="2xl" :user="user" />
                </div>

                <!-- controls -->
                <div class="mt-8 text-center">
                    <v-fade-transition>
                        <div v-if="hasAvatar" key="avatar">
                            You have an avatar
                        </div>
                        <div v-else key="upload">
                            <v-button outlined>
                                Select Profile Photo
                            </v-button>
                        </div>
                    </v-fade-transition>
                </div>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import accountHeaderComponent from '../../account_header/account_header.vue';
import { mapGetters, mapState } from 'vuex';

export default {
    data() {
        return {
            isLoading: false,
        };
    },
    components: {
        'v-account-header': accountHeaderComponent,
    },
    computed: {
        ...mapState('user', [
            'user',
        ]),
    },
    methods: {
        onSubmit() {
            // ...
        },
    },
};
</script>
