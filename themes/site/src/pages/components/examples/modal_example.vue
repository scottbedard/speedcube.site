<template>
    <v-example title="<v-modal>">
        <p>Modal style popovers.</p>

        <div class="pt-8">
            <pre>{{ $data }}</pre>
            <v-button @click="open">
                Show modal
            </v-button>
        </div>
        
        <v-modal
            v-if="visible"
            title="Some awesome modal"
            @close="close">
            uh...
            <input @focus="onFocus" />
        </v-modal>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            visible: false,
        };
    },
    components: {
        'v-example': exampleComponent,
    },
    methods: {
        onFocus() {
            console.log('woots');
        },
        close() {
            this.visible = false;
        },
        open() {
            this.visible = true;
        },
    }
};
</script>
