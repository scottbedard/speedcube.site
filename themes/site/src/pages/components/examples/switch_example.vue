<template>
    <v-example title="<v-switch>">
        <p>A simple boolean switch.</p>

        <div class="pt-4">
            <v-switch v-model="checked" :disabled="disabled">
                <div slot="on">The switch is turned on</div>
                <div slot="off">The switch is turned off</div>
            </v-switch>
        </div>

        <div class="flex flex-wrap" slot="options">
            <v-checkbox v-model="disabled" class="mr-8">Disabled</v-checkbox>
        </div>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            checked: false,
            disabled: false,
        };
    },
    components: {
        'v-example': exampleComponent,
    },
};
</script>
