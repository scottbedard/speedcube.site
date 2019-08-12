<template>
    <portal to="modal">
        <div
            class="mb-12 outline-none w-full"
            role="dialog"
            tabindex="-1"
            :aria-labelledby="titleId"
            :aria-describedby="descriptionId"
            :class="{
                'max-w-sm': size === 'sm',  
                'max-w-md': size === 'md',  
                'max-w-lg': size === 'lg',  
                'max-w-xl': size === 'xl',  
                'max-w-2xl': size === '2xl',  
            }"
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
                <slot />
            </v-card>
        </div>
    </portal>
</template>

<script>
import focusTrap from 'focus-trap';
import noScroll from 'no-scroll';
import { uniqueId } from 'lodash-es';

export default {
    created() {
        // keep track of the modal on the screen
        this.$store.commit('modals/register', this.uid);
    },
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
        // disable background scrolling
        noScroll.on();

        // portal components take a tick to update
        this.$nextTick(() => {
            // trap focus inside of the modal and set initial focus
            const el = this.$root.$el.querySelector(`[data-modal="${this.uid}"]`);

            if (el) {
                const trap = focusTrap(el, {
                    clickOutsideDeactivates: true,
                    escapeDeactivates: true,
                    fallbackFocus: el,
                    onDeactivate: this.close,
                });

                trap.activate({
                    initialFocus: 'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),[tabindex="0"]',
                });

                // kill the trap and restore focus to where it previous was
                this.$once('hook:destroyed', () => trap.deactivate({ returnFocus: true }));
            }

            // restore background scrolling
            this.$once('hook:destroyed', () => noScroll.off());
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
        size: {
            default: '2xl',
            type: String,
            validator: size => ['auto', 'sm', 'md', 'lg', 'xl', '2xl'].includes(size),
        },
        title: {
            required: true,
            type: String,
        },
    },
};
</script>
