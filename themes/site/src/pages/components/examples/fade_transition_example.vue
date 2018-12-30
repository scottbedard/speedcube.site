<template>
    <v-example title="<v-fade-transition>">
        <p class="mb-8">
            A simple fade transition. This is preferred over
            <router-link
                class="font-mono"
                :to="{
                    name: 'components',
                    query: {
                        filter: 'v-collapse-transition',
                    },
                }">
                &lt;v-collapse-transition&gt;
            </router-link> when we're transitioning between elements of the same height.
        </p>

        <v-button
            class="mb-8"
            size="sm"
            outlined
            @click="value = !value">
            Toggle
        </v-button>

        <v-fade-transition>
            <div v-if="value" class="bg-grey-light flex h-20 items-center justify-center rounded text-grey-darker text-3xl w-20" key="a">A</div>
            <div v-else class="bg-grey-light flex h-20 items-center justify-center text-grey-darker text-3xl w-20" key="b">B</div>
        </v-fade-transition>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            value: true,
        };
    },
    components: {
        'v-example': exampleComponent,
    },
};
</script>
