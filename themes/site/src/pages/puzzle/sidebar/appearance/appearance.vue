<template>
    <div>
        <!-- title -->
        <h4>Appearance</h4>

        <!-- form -->
        <v-form @submit="onSubmit">

            <!-- colors -->
            <v-form-field
                name="colors"
                label="Colors"
                :value="colors">
                <v-cube-color-picker v-model="colors" />
            </v-form-field>

            <!-- sticker radius -->
            <v-form-field
                name="stickerRadius"
                label="Sticker Radius"
                :value="stickerRadius">
                <v-input 
                    v-model.number="stickerRadius"
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.005"
                />
            </v-form-field>


            <!-- sticker elevation -->
            <v-form-field
                name="stickerElevation"
                label="Sticker Elevation"
                :value="stickerElevation">
                <v-input 
                    v-model.number="stickerElevation"
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01"
                />
            </v-form-field>

            <!-- sticker scaling -->
            <v-form-field
                name="stickerScale"
                label="Sticker Scaling"
                :value="stickerScale">
                <v-input 
                    v-model.number="stickerScale"
                    type="range" 
                    min="0.05" 
                    max="1" 
                    step="0.005"
                />
            </v-form-field>

            <!-- inner opacity -->
            <v-form-field
                name="stickerInnerOpacity"
                label="Inner Brightness"
                :value="stickerInnerOpacity">
                <v-input 
                    v-model.number="stickerInnerOpacity"
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01"
                />
            </v-form-field>

            <!-- non-authenticated note -->
            <p v-if="!isAuthenticated" class="font-bold leading-normal mt-6 text-xs">
                Be aware, you aren't signed in. Any changes will be lost when the page is refreshed.
            </p>
            
            <!--
                we're not using the actions slot because this form
                is using smaller padding then normal ones. we might
                want to add a "padded-sm" to <v-form> props.
            -->
            <div class="flex items-center justify-end mt-6">
                <a
                    class="block font-bold mr-4 p-2 text-grey-dark text-xs uppercase hover:text-red-light"
                    href="#"
                    @click.prevent="onCancelClick">
                    Cancel
                </a>

                <v-button
                    primary
                    size="sm"
                    type="submit">
                    Save
                </v-button>
            </div>
        </v-form>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { mapTwoWayState } from 'spyfu-vuex-helpers';
import { postConfig } from '@/app/repositories/config';

export default {
    data() {
        return {
            isLoading: false,
        };
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
            'puzzleConfig',
        ]),
        ...mapState('user', [
            'config',
        ]),
        ...mapTwoWayState('user', {
            'config.colors': 'setConfigColors',
            'config.stickerElevation': 'setConfigStickerElevation',
            'config.stickerInnerOpacity': 'setConfigStickerInnerOpacity',
            'config.stickerRadius': 'setConfigStickerRadius',
            'config.stickerScale': 'setConfigStickerScale',
        }),
    },
    methods: {
        onCancelClick() {
            this.$store.commit('user/setConfig', this.puzzleConfig(this.configKey));

            this.$emit('close');
        },
        onSubmit() {
            // if the user is not authenticated, close the form
            if (!this.isAuthenticated) {
                this.$emit('close');

                return;
            }

            // otherwise persist their config to the server
            this.isLoading = true;

            postConfig(this.configKey, this.config).then((response) => {
                // success
                this.$store.commit('user/setConfigs', response.data.configs);

                this.$emit('close');
            }).finally(() => {
                // complete
                this.isLoading = false;
            });
        },
    },
    props: [
        'configKey',
    ],
};
</script>
