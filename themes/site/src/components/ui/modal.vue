<template>
    <portal to="modal">
        <div
            class="outline-none"
            role="dialog"
            tabindex="-1"
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

            <v-card :padded="padded">
                <div class="max-w-sm">
                    <slot />
                </div>
            </v-card>
        </div>
    </portal>
</template>

<script>
import { uniqueId } from 'lodash-es';
import focusTrap from 'focus-trap';

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

        // portal components take a tick to update
        this.$nextTick(() => {
            // trap focus inside of the modal and set initial focus
            const el = this.$root.$el.querySelector(`[data-modal="${this.uid}"]`);
            
            const trap = focusTrap(el, { 
                clickOutsideDeactivates: true,
                escapeDeactivates: true,
                fallbackFocus: el,
                onDeactivate: this.close,
            });

            trap.activate({
                initialFocus: 'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),[tabindex="0"]',
            });

            // when this component is destroyed deactivate our trap
            // and return the focus to where it previously was
            this.$once('hook:destroyed', () => trap.deactivate({ returnFocus: true }));
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
    },
    props: {
        description: {
            type: String,
        },
        padded: {
            default: false,
            type: Boolean,
        },
        title: {
            required: true,
            type: String,
        },
    },
};
</script>
