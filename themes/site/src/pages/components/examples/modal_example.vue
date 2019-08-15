<template>
    <v-example title="<v-modal>">
        <p>Modal style popovers.</p>

        <div class="pt-8">
            <v-button @click="open">
                Show modal
            </v-button>
        </div>

        <v-modal
            v-if="visible"
            description="A description not required, but is a good practice to include."
            padded
            size="2xl"
            title="Example modal"
            @close="close">
            <!-- focus -->
            <h2 class="font-bold mb-4 text-2xl">
                Be aware of the focus behavior
            </h2>

            <p class="leading-normal mb-4">
                Opening a modal sets the focus to the first eligible element within it. In this
                example, that element will be the following button. When a modal is closed, focus
                is returned to the element that previously had it. Here, that element will be the
                <b class="font-mono">&quot;show&nbsp;modal&quot;</b> button.
            </p>

            <p class="leading-normal mb-8">
                Additionally, focus is trapped within the modal. If the modal contains multiple
                focusable elements, tabbing will cycle through them.
            </p>

            <!-- scrolling -->
            <h2 class="font-bold mb-4 text-2xl">
                Background scrolling is disabled
            </h2>

            <p class="leading-normal mb-8">
                While modals are open, background scrolling is disabled and the scrolling
                context is shifted to the modal container. When the modal closes, scroll
                locks will be cleaned up and regular scrolling resumes.
            </p>

            <div class="flex justify-end">
                <v-button @click="close">Close</v-button>
            </div>
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
        close() {
            this.visible = false;
        },
        open() {
            this.visible = true;
        },
    },
};
</script>
