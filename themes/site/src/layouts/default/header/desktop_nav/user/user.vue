<style lang="scss" scoped>
    a {
        &:hover {
            text-decoration: none;
        }

        &:hover .fa-angle-down {
            color: config('colors.grey-dark');
        }

        &:hover .fa-user-o {
            color: config('colors.grey-darker');
        }
    }
</style>

<template>
    <div class="flex items-center">
        <a
            class="flex items-center"
            href="#"
            @click.prevent>
            <i class="fa fa-angle-down mr-2 text-grey trans-color"></i>
            <div class="inline-block bg-white flex h-10 items-center justify-center rounded-full text-grey-dark trans-color w-10">
                <i class="fa fa-user-o text-xl"></i>
            </div>
        </a>
    </div>
</template>
