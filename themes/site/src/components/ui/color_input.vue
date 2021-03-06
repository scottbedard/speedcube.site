<template>
    <div
        class="inline-block relative"
        :class="{
            'cursor-not-allowed': disabled,
        }"
        @click.stop>
        <!-- display -->
        <a
            class="block h-8 w-8 rounded-full"
            href="#"
            title="Click to change"
            :class="{
                'cursor-not-allowed': disabled,
            }"
            :style="{
                backgroundColor: value,
            }"
            @click.prevent="expand">
        </a>

        <!-- color picker -->
        <transition
            enter-active-class="trans-opacity trans-transform"
            enter-class="opacity-0 -tx-4"
            enter-to-class="opacity-100 tx-0"
            leave-class="opacity-100 tx-0"
            leave-to-class="opacity-0 -tx-4"
            leave-active-class="trans-opacity trans-transform">
            <div
                v-if="expanded"
                class="absolute top-0 left-full pl-4 z-10">
                <v-color-picker
                    :disable-alpha="true"
                    :disable-fields="true"
                    :value="cachedColor"
                    @input="onInput"
                />
            </div>
        </transition>
    </div>
</template>

<script>
import { Chrome } from 'vue-color';
import { bindExternalEvent } from 'spyfu-vue-utils';

export default {
    created() {
        bindExternalEvent(this, document.body, 'click', this.collapse);
        bindExternalEvent(this, document.body, 'keyup', this.onBodyKeyup);
    },
    data() {
        return {
            cachedColor: '#000',
            expanded: false,
        };
    },
    components: {
        'v-color-picker': Chrome,
    },
    methods: {
        collapse() {
            this.expanded = false;
        },
        expand() {
            if (!this.disabled) {
                this.cachedColor = this.value;
                this.expanded = true;
            }
        },
        onBodyKeyup(e) {
            if (this.expanded && e.key === 'Escape') {
                this.expanded = false;
                this.$emit('input', this.cachedColor);
            }
        },
        onInput(color) {
            if (!this.disabled) {
                this.$emit('input', color.hex);
            }
        },
    },
    model: {
        event: 'input',
        prop: 'value',
    },
    props: {
        disabled: {
            default: false,
            type: Boolean,
        },
        value: {
            type: String,
        },
    },
};
</script>
