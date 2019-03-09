<template>
    <div>
        <v-twitter />
    </div>
</template>

<script>
import twitterComponent from './twitter/twitter.vue';

export default {
    components: {
        'v-twitter': twitterComponent,
    },
};
</script>
