<template>
    <div>
        <!-- title -->
        <h4>Appearance</h4>

        <!-- form -->
        <v-form>
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
                label="Inner brightness"
                :value="stickerInnerOpacity">
                <v-input 
                    v-model.number="stickerInnerOpacity"
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01"
                />
            </v-form-field>

            <p v-if="!isAuthenticated" class="font-bold leading-normal mt-6 text-xs">
                Be aware, you aren't signed in. Any changes will be lost when the page is refreshed.
            </p>
        </v-form>
        
        <!-- non-authenticated note -->
        <div slot="actions">
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            stickerRadius: 0.25,
            stickerElevation: 0.1,
            stickerScale: 0.9,
            stickerInnerOpacity: 0.3,
        };
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
    },
};
</script>
