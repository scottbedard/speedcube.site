<style lang="scss" scoped>
    .actions-container /deep/ .v-button {
        @apply m-3;
    }
</style>

<template>
    <div>
        <div class="actions-container flex justify-end -m-3 overflow-hidden">
            <div class="text-center">
                <slot />
            </div>
        </div>
    </div>
</template>
