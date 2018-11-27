<style lang="scss" scoped>
    .example /deep/ .v-spinner + .v-spinner {
        margin-left: 2rem;
    }
</style>

<template>
    <v-example title="<v-spinner>">
        <div class="example">
            <v-spinner size="sm" />
            <v-spinner size="md" />
            <v-spinner size="lg" />
        </div>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    components: {
        'v-example': exampleComponent,
    },
};
</script>
