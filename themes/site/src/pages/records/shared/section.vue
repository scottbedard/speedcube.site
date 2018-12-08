<template functional>
    <section>
        <h2
            v-text="props.title"
            class="mb-8 text-center text-grey tracking-wide"
        />

        <div>
            <v-collapse-transition>
                <!-- loading -->
                <div
                    v-if="props.loading"
                    class="text-center"
                    key="loading">
                    <v-spinner />
                </div>

                <!-- ready -->
                <div v-else key="ready">
                    <slot />
                </div>
            </v-collapse-transition>
        </div>
    </section>
</template>

<script>
export default {
    props: [
        'loading',
        'title',
    ],
};
</script>
