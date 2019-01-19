<template>
    <v-page padded>
        <v-margin padded>
            <!-- title -->
            <h1 class="font-light mb-4">
                Components
            </h1>

            <p class="font-light mb-8">
                This page is our living component docs.
            </p>

            <!-- filter -->
            <v-input
                v-model="filter"
                icon="search"
                placeholder="Filter components..."
            />

            <!-- examples -->
            <div>
                <div
                    v-for="example in examples"
                    class="py-16"
                    :class="{
                        'border-b border-grey-3': true,
                    }"
                    :key="example.key">
                    <component :is="example.component" />
                </div>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import examples from './examples';

export default {
    data() {
        return {
            filter: this.$route.query.filter || '',
        };
    },
    computed: {
        examples() {
            return Object.keys(examples)
                .filter(key => key.includes(this.filter))
                .sort()
                .reduce((acc, key) => acc.concat({ key, component: examples[key] }), []);
        },
    },
    watch: {
        filter(filter) {
            this.$router.replace({ query: { filter: filter || undefined } });
        },
        $route() {
            this.filter = this.$route.query.filter || '';
        },
    },
};
</script>
