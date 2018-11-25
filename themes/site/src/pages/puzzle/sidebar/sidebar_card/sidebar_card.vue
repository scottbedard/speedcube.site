<style lang="scss" scoped>
    .v-card {
        /deep/ {
            h4 {
                @apply font-bold mb-6 text-grey text-base;
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
    <v-card class="relative w-84" padded>
        <!-- content -->
        <div class="text-grey-dark">
            <slot />
        </div>
    </v-card>
</template>
