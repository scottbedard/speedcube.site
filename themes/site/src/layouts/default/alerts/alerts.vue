<template>
    <div
        class="absolute -my-4 overflow-hidden bottom-0 right-0 p-6"
        @mouseenter="pause"
        @mouseleave="resume">
        <transition-group
            enter-active-class="trans-opacity trans-transform"
            enter-class="opacity-0 tx-8"
            enter-to-class="opacity-100 tx-0"
            leave-active-class="trans-opacity trans-transform"
            leave-class="opacity-100 tx-0"
            leave-to-class="opacity-0 tx-8">
            <div
                v-for="alert in alerts"
                class="my-4"
                :key="alert.id">
                <!-- strings -->
                <v-alert
                    v-if="isString(alert.message)"
                    :type="alert.type">
                    {{ alert.message }}
                </v-alert>

                <!-- components -->
                <component
                    v-else
                    :is="alert.message"
                />
            </div>
        </transition-group>
    </div>
</template>

<script>
import { isString } from 'lodash-es';
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('alerts', [
            'alerts',
        ]),
        isString() {
            return isString;
        },
    },
    methods: {
        pause() {
            this.$store.commit('alerts/setIsPaused', true);
        },
        resume() {
            this.$store.commit('alerts/setIsPaused', false);
        },
    },
};
</script>
