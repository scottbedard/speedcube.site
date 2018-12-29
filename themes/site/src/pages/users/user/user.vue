<template>
    <v-page padded>
        <v-margin padded>
            <h1>{{ user.username }}</h1>
        </v-margin>
    </v-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('user', [
            'user',
        ]),
    },
};
</script>
