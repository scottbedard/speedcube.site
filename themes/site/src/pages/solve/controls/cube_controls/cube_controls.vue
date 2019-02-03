<style lang="scss" scoped>
    p {
        @apply leading-normal max-w-md mx-auto text-center text-grey-6 text-sm;
    }

    b {
        @apply font-mono inline-flex items-center text-sm;
    }
</style>

<template>
    <div>
        <!-- copy -->
        <p class="font-mono mb-4 uppercase">
            <strong>This feature is a work in progress, check back later.</strong>
        </p>

        <p class="mb-12">
            These are your current keyboard controls, displayed in <b>&quot;key <i class="fa fa-angle-right px-2"></i> turn&quot;</b> format.
            The <b>&quot;key&quot;</b> represents to the key on your keyboard, and the <b>&quot;turn&quot;</b> represents the puzzle turn to execute.
        </p>

        <!-- key bindings -->
        <div class="flex mb-6 text-sm">
            <div class="config-entries font-mono leading-normal max-w-md mx-auto">
                <a
                    v-for="({ key, turn }, index) in turns"
                    class="inline-flex items-center mb-6 text-left px-4 w-24"
                    href="#"
                    :key="index"
                    @click.prevent="onKeymapClick(key)">
                    {{ key }} <i class="fa fa-angle-right px-2 text-grey-4"></i> {{ turn }}
                </a>
            </div>
        </div>

        <!-- actions -->
        <div class="flex flex-wrap justify-center -m-4 overflow-hidden">
            <!-- add key binding -->
            <v-button
                class="m-4"
                href="#"
                size="sm"
                @click.prevent>
                Add Key Binding
            </v-button>

            <!-- save -->
            <v-button
                class="m-4"
                href="#"
                size="sm"
                @click.prevent>
                Save Changes
            </v-button>
        </div>

        <div class="mt-6">
            <a
                class="text-grey-7 text-xs tracking-wide uppercase hover:text-danger-7"
                href="#"
                @click.prevent="onCloseClick">
                Discard Changes
            </a>
        </div>
    </div>
</template>

<script>
import { defaultCubeKeyboardConfig } from '@/app/constants';
import { get } from 'lodash-es';

export default {
    computed: {
        keyboardConfig() {
            return defaultCubeKeyboardConfig;
        },
        turns() {
            const turns = get(this.keyboardConfig, 'turns', {});

            return Object.keys(turns).map(key => ({ key, turn: turns[key] }));
        },
    },
    methods: {
        onCloseClick() {
            this.$emit('close');
        },
        onKeymapClick(key) {
            console.log('ok', key);
        },
    },
};
</script>
