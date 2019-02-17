<template>
    <v-page padded>
        <v-margin padded>
            <v-fade-transition>
                <div
                    v-if="loading"
                    class="text-center"
                    key="loading">
                    <v-spinner />
                </div>

                <!-- list -->
                <div
                    v-else
                    key="list">
                    Users list!
                </div>
            </v-fade-transition>
        </v-margin>
    </v-page>
</template>

<script>
import { uniqueId } from 'lodash-es';
import { getUsers } from '@/app/repositories/user';

export default {
    created() {
        this.fetchUsers();
    },
    data() {
        return {
            // loading state
            loading: false,

            // a unique identifier we'll use to detect overlapping requests
            requestId: uniqueId(),
        };
    },
    methods: {
        fetchUsers() {
            const requestId = uniqueId();

            this.loading = true;
            this.requestId = requestId;

            getUsers().then(() => {
                // success
                if (this.requestId === requestId) {
                    console.log ('done!');
                }
            }).finally(() => {
                // complete
                if (this.requestId === requestId) {
                    this.loading = false;
                }
            });
        },
    },
};
</script>