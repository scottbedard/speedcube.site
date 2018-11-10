<template>
    <v-margin padded>
        <div class="relative">
            <div class="absolute pt-20 w-full">
                <v-puzzle
                    :size="size"
                />
            </div>
        </div>
    </v-margin>
</template>

<script>
export default {
    computed: {
        size() {
            return this.$route.meta.cubeSize;
        },
    },
};
</script>
