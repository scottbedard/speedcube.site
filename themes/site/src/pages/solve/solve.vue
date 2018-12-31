<template>
    <v-page padded>
        <v-margin padded>
        
            <!-- puzzle -->
            <v-puzzle
                :puzzle="puzzle"
            />
            
        </v-margin>
    </v-page>
</template>

<script>
export default {
    computed: {
        puzzle() {
            return this.$route.params.puzzle;
        },
    },
};
</script>
