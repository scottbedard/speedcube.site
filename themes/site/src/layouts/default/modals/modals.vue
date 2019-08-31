<style lang="scss" scoped>
    .backdrop {
        background-color: rgba(#0d0e0e, 0.6);
    }

    .vue-portal-target {
        display: grid;
        justify-items: center;
        @apply h-full items-center w-full;
    }
</style>

<template>
    <div>
        <v-fade-transition>
            <div
                v-if="modalsAreOpen"
                class="backdrop fixed h-full left-0 overflow-y-scroll p-8 top-0 w-full z-20"
                ref="backdrop">
                <portal-target name="modal" />
            </div>
        </v-fade-transition>
    </div>
</template>

<script>
import { componentTimeout } from 'spyfu-vue-utils';
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('modals', [
            'modals',
        ]),
        modalsAreOpen() {
            // returns true if one or more modals is open
            return this.modals.length > 0;
        },
    },
    watch: {
        modalsAreOpen(modalsAreOpen) {
            componentTimeout(this, () => {
                if (modalsAreOpen) {
                    this.$refs.backdrop.scrollTop = 0;
                }
            }, 50);
        },
    },
};
</script>
