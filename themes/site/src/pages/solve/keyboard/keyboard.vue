<template>
    <div class="max-w-5xl mx-auto">
        <!-- note -->
        <p class="max-w-xl mb-8 mx-auto text-center text-grey-7 tracking-wider text-sm w-full">
            These is your current keyboard config, displayed in <span class="font-mono">&quot;key <i class="fa fa-angle-right" /> turn&quot;</span> format.
            Making a turn will highlight the associated binding if one exists.
        </p>

        <!-- toolbar -->
        <div>
            <v-button class="mr-6" icon="fa-plus" ghost>Add Key Binding</v-button>
            <v-button class="mr-6" icon="fa-code" ghost>Edit JSON</v-button>
            <v-button icon="fa-trash-o" ghost>Clear All Bindings</v-button>
        </div>

        <!-- actions -->
        <div class="flex justify-end">
            <v-button
                class="mr-6"
                ghost
                title="Click to discard changes">
                Cancel
            </v-button>
            <v-button
                primary
                title="Click to save key bindings">
                Save
            </v-button>
        </div>
    </div>
</template>
