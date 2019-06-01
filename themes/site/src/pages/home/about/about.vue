<template functional>
    <v-grid padded>
        <v-grid-cell lg="7">
            <div class="text-center lg:mt-12 lg:pr-20 lg:text-left">
                <h1 class="font-thin leading-normal mb-8 text-5xl text-grey-8">
                    The online cube that never pops.
                </h1>
                <p class="leading-loose mb-12 text-grey-7 text-lg">
                    We're a speed cubing platform for any modern browser.
                    Your keyboard is the controller. After some practice,
                    it'll feel you're holding it in your hands.
                </p>
                <div class="-m-4">
                    <v-button
                        class="m-4"
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
                        class="m-4"
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
                <!-- <p class="font-thin leading-loose text-grey-7">
                    Additionally, this website is completely open source. That means anyone is welcome to contribute
                    and make the site better. We plan on adding lots of different features and puzzles,
                    <a href="https://github.com/scottbedard/speedcube.site" target="_blank">click here to give us a hand</a>.
                </p> -->
            </div>
        </v-grid-cell>
        <v-grid-cell lg="5">
            <div class="h-full flex items-center justify-center md:text-right">
                <img class="h-auto max-w-xs w-full lg:max-w-sm" src="./fans.svg" />
            </div>
        </v-grid-cell>
    </v-grid>
</template>
