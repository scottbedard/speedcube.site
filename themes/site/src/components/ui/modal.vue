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
import { isForeignClick } from '@/app/utils/dom';

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

        // focus the first available element in our modal
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
            const container = this.getContainer();

            if (container) {
                const focusableEls = Array.prototype.slice.call(container.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'));

                if (focusableEls.length > 0) {
                    // document.activeElement does not work as expected on windows
                    // versions of firefox, need to investigate this further and
                    // find a more reliable way to restore the original focus.
                    const previousFocus = document.activeElement;

                    this.$on('hook:destroyed', () => previousFocus.focus());

                    focusableEls[0].focus();
                }
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
