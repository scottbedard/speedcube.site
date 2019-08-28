<template>
    <v-modal
        size="xl"
        :padded="true"
        :title="title"
        @close="$emit('close')">
        <slot name="header">
            <h3 v-if="header" v-text="header" class="font-bold mb-4 text-2xl text-grey-8" />
        </slot>
        <slot name="paragraph">
            <p v-if="paragraph" v-text="paragraph" class="mb-4" />
        </slot>
        <slot name="actions">
            <div>
                <v-modal-actions>
                    <v-button
                        v-if="cancel"
                        ghost
                        tabindex="-1"
                        @click="$emit('close')">
                        {{ cancel }}
                    </v-button>
                    <v-button
                        v-if="accept"
                        tabindex="-1"
                        danger
                        @click="$emit('confirm')">
                        {{ accept }}
                    </v-button>
                </v-modal-actions>
            </div>
        </slot>
    </v-modal>
</template>

<script>
import modalActionsComponent from './modal_actions.vue';

export default {
    components: {
        'v-modal-actions': modalActionsComponent,
    },
    props: [
        'accept',
        'cancel',
        'description',
        'header',
        'paragraph',
        'title',
    ],
};
</script>
