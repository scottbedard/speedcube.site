<template>
    <div>
        <!-- cube controls -->
        <v-cube-controls
            v-if="isCube"
            :loading="loading"
            :keyboard-config="keyboardConfig"
            @close="close"
            @disable-turning="disableTurning"
            @enable-turning="enableTurning"
            @update-pending="updatePending"
            @save="saveKeyboardConfig"
        />
    </div>
</template>

<script>
import { isCube } from '@/app/utils/puzzle';
import { postKeyboardConfig } from '@/app/repositories/keyboard_configs';
import cubeControlsComponent from './cube_controls/cube_controls.vue';

export default {
    data() {
        return {
            loading: false,
        };
    },
    components: {
        'v-cube-controls': cubeControlsComponent,
    },
    computed: {
        isCube() {
            return isCube(this.puzzle);
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        disableTurning() {
            this.$emit('disable-turning');
        },
        enableTurning() {
            this.$emit('enable-turning');
        },
        saveKeyboardConfig(config) {
            this.loading = true;

            postKeyboardConfig({
                config: JSON.stringify(config),
                puzzle: this.puzzle,
            }).then((response) => {
                // success
                this.$store.commit('user/updateKeyboardConfig', response.data.keyboardConfig);
                this.close();
            }).finally(() => {
                // complete
                this.loading = false;
            });
        },
        updatePending(pendingKeyboardConfig) {
            console.log('bubbling', pendingKeyboardConfig);
            this.$emit('update-pending', pendingKeyboardConfig);
        },
    },
    props: {
        keyboardConfig: {
            required: true,
            type: Object,
        },
        puzzle: {
            required: true,
            type: String,
        },
    },
};
</script>
