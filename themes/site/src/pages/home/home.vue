<template>
    <v-margin class="text-center py-20" padded>
        <h1 class="font-light">This site is a work in progress, check back later.</h1>

        <v-button @click="foo">
            Trigger xhr
        </v-button>
    </v-margin>
</template>

<script>
import axios from 'axios';

export default {
    methods: {
        foo() {
            axios.get('/foo');
        }
    }
}
</script>