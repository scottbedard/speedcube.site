<style lang="scss" scoped>
    .backdrop {
        background-color: rgba(#0d0e0e, 0.6);
    }
</style>

<template>
    <div>
        <v-fade-transition>
            <div
                v-if="modalsAreOpen"
                class="backdrop absolute flex items-center justify-center p-8 pin">
                <portal-target name="modal" />
            </div>
        </v-fade-transition>
    </div>
</template>

<script>
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
};
</script>
