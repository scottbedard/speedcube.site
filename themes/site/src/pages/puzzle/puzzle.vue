<template>
    <v-margin padded>
        <div class="relative">
            <div class="absolute pt-20 w-full">
                <v-puzzle
                    :colors="colors"
                    :size="size"
                />
            </div>
        </div>
    </v-margin>
</template>

<script>
export default {
    computed: {
        colors() {
            return [
                'red',
                'green',
                'blue',
                'orange',
                'black',
                'yellow',
            ];
        },
        size() {
            return this.$route.meta.cubeSize;
        },
    },
};
</script>
