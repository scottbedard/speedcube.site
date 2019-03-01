<style lang="scss" scoped>
    .backdrop {
        background-color: rgba(#0d0e0e, 0.6);
    }

    .vue-portal-target {
        margin: auto;
    }
</style>

<template>
    <div>
        <v-fade-transition>
            <div
                v-if="modalsAreOpen"
                class="backdrop fixed flex items-center justify-center overflow-y-scroll p-8 pin"
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
            }, 10);
        },
    },
};
</script>
