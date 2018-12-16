<style lang="scss" scoped>
    .v-card {
        /deep/ {
            h4 {
                // @apply font-bold mb-6 text-grey-5 text-base;
            }

            label {
                @apply text-xs;
            }

            .v-form-field + .v-form-field {
                @apply mt-6;
            }
        }
    }
</style>

<template>
    <v-card class="w-84" padded>
        <slot />
    </v-card>
</template>
