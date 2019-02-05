<template>
    <portal to="modal">
        <div
            role="dialog"
            :aria-labelledby="titleId"
            :aria-describedby="descriptionId"
            :data-modal="uid">
            
            <h2
                v-text="title"
                class="hidden"
                :id="titleId"
            />

            <p
                v-if="description"
                v-text="description"
                class="hidden"
                :id="descriptionId"
            />

            <v-card padded>
                <slot />
            </v-card>
        </div>
    </portal>
</template>

<script>
import { bindExternalEvent } from '@/app/utils/component';
import { uniqueId } from 'lodash-es';
import { isForeignClick, queryElementThen } from '@/app/utils/dom';

const possibleFocusTargets = 'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),[tabindex="0"]';

export default {
    data() {
        return {
            uid: uniqueId(),
        };
    },
    destroyed() {
        // stop tracking this modal
        this.$store.commit('modals/unregister', this.uid);
    },
    mounted() {
        // keep track of the modal on the screen
        this.$store.commit('modals/register', this.uid);

        // listen for events to close our modal
        bindExternalEvent(this, document.body, 'click', this.onBodyClick);
        bindExternalEvent(this, document.body, 'keydown', this.onBodyKeydown);

        // restore focus when this modal is destroyed
        const previousEl = document.activeElement;
        
        this.$once('hook:destroyed', () => previousEl.focus());

        // focus the first eligible element in our modal
        this.$nextTick(this.focus);
    },
    computed: {
        descriptionId() {
            return this.description ? `modal-description-${this.uid}` : undefined;
        },
        titleId() {
            return `modal-title-${this.uid}`;
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        focus() {
            // look for a new focus target within our modal
            const container = this.getContainer();

            if (container) {
                queryElementThen(container, possibleFocusTargets, el => el.focus());
            }
        },
        getContainer() {
            return this.$root.$el.querySelector(`[data-modal="${this.uid}"]`);
        },
        onBodyClick(e) {
            // close if the click even didn't originate from our container
            const container = this.getContainer();
            
            if (container && isForeignClick(e, container)) {
                this.close();
            }
        },
        onBodyKeydown(e) {

        },
    },
    props: {
        description: {
            type: String,
        },
        title: {
            required: true,
            type: String,
        },
    },
};
</script>
