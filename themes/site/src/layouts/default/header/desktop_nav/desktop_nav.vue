<template>
    <nav>
        <!-- home -->
        <router-link
            class="no-underline text-grey-darker transition-color hover:text-grey-darkest"
            :to="{ name: 'home' }">
            Home
        </router-link>

        <!-- about -->
        <router-link
            class="ml-8 no-underline text-grey-darker transition-color hover:text-grey-darkest"
            :to="{ name: 'components' }">
            Components
        </router-link>
    </nav>
</template>
