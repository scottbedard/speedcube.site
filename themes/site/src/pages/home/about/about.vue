<template functional>
    <v-grid padded>
        <v-grid-cell lg="7">
            <div class="text-center lg:text-left">
                <h1 class="font-thin mt-4 text-5xl text-grey-8">
                    A free and open place for cubing.
                </h1>
                <p class="my-2 text-grey-7 text-lg">
                    We're a speed cubing platform for any modern browser.
                    Your keyboard is the controller. After some practice,
                    it'll feel you're holding it in your hands.
                </p>
                <div class="-m-1">
                    <v-button
                        class="m-1"
                        primary
                        title="Click to begin solving"
                        :to="{
                            name: 'solve',
                            params: {
                                puzzle: '3x3',
                            },
                        }">
                        Start Solving
                    </v-button>
                    <v-button
                        class="m-1"
                        title="Click to view the current records"
                        :to="{
                            name: 'records',
                            params: {
                                puzzle: '3x3',
                            },
                        }">
                        Watch Records
                    </v-button>
                </div>
            </div>
        </v-grid-cell>
        <v-grid-cell lg="5">
            <div class="h-full flex items-center justify-center md:text-right">
                <img class="h-auto max-w-lg w-full" src="./fans.svg" />
            </div>
        </v-grid-cell>
    </v-grid>
</template>
