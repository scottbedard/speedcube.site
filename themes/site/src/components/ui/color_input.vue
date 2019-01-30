<template>
    <div class="inline-block relative" @click.stop>
        <!-- display -->
        <a
            class="block h-8 w-8 rounded-full"
            href="#"
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
                class="absolute pin-t pin-l-full pl-4 z-10">
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
import { bindExternalEvent } from '@/app/utils/component';

export default {
    created() {
        bindExternalEvent(this, document.body, 'click', this.collapse);
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
            this.cachedColor = this.value;
            this.expanded = true;
        },
        onInput(color) {
            this.$emit('input', color.hex);
        },
    },
    model: {
        event: 'input',
        prop: 'value',
    },
    props: {
        value: {
            type: String,
        },
    },
};
</script>
