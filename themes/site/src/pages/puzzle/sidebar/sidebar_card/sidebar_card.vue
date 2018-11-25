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
        <!-- close link -->
        <a
            class="absolute flex items-center pin-r pin-t p-4 text-grey-dark"
            href="#"
            title="Cancel"
            @click.prevent="$emit('close')">
            <i class="fa fa-times"></i>
        </a>

        <!-- content -->
        <div class="text-grey-dark">
            <slot />
        </div>
    </v-card>
</template>
