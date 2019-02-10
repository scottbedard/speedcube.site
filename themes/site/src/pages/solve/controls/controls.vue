<template>
    <div>
        <!-- cube controls -->
        <v-cube-controls
            v-if="isCube"
            :keyboard-config="keyboardConfig"
            @close="close"
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
        saveKeyboardConfig(config) {
            this.loading = true;

            postKeyboardConfig({
                config: JSON.stringify(config),
                puzzle: this.puzzle,
            }).then((response) => {
                // success
                this.$store.commit('user/updateKeyboardConfig', response.data.keyboardConfig);
            }).finally(() => {
                // complete
                this.loading = false;
            });
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
