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
import { bindExternalEvent, cleanTimeout } from '@/app/utils/component';
import { uniqueId } from 'lodash-es';
import { isForeignClick, queryElementThen } from '@/app/utils/dom';

const possibleFocusTargets = 'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),[tabindex="0"]';

export default {
    data() {
        return {
            // a unique identifier for this modal
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

        // restore focus when this modal is destroyed
        const previousEl = document.activeElement;
        
        this.$once('hook:destroyed', () => previousEl.focus());

        // portal components take a tick to update, so we'll wait for that
        // to complete then continue mounting. the additional 10ms timeout
        // is there to avoid an issue in chrome where the listener is called
        // ion the initial click to open a modal.
        this.$nextTick(() => {
            cleanTimeout(this, () => {
                
                // focus the first eligible element in our modal
                this.focus();

                // bind events to close our modal
                bindExternalEvent(this, document.body, 'click', this.onBodyClick);
                bindExternalEvent(this, document.body, 'keydown', this.onBodyKeydown);
            }, 10);
        });
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

            queryElementThen(container, possibleFocusTargets, el => el.focus());
        },
        getContainer() {
            return this.$root.$el.querySelector(`[data-modal="${this.uid}"]`);
        },
        onBodyClick(e) {
            // close if the click even didn't originate from our container
            const container = this.getContainer();
            
            if (isForeignClick(e, container)) {
                this.close();
            }
        },
        onBodyKeydown(e) {
            if (e.key === 'Escape' || e.key === 'Esc') {
                this.close();
            }
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
