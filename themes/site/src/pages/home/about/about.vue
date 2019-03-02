<template functional>
    <v-grid padded>
        <v-grid-cell lg="7">
            <div class="text-center lg:mt-12 lg:pr-20 lg:text-left">
                <h1 class="font-thin leading-normal mb-8 text-4xl text-grey-8">
                    Enjoy a free and open place for speedcubing.
                </h1>
                <p class="font-thin leading-loose mb-8 text-grey-7">
                    We're a community built by and for speed cubers. Our mission is to be a free and fair
                    place to compete and enjoy the puzzles we all love. We're currently in a public beta,
                    please report any issues you encounter.
                </p>
                <div class="-m-4">
                    <v-button
                        class="m-4"
                        :to="{
                            name: 'solve',
                            params: {
                                puzzle: '3x3',
                            },
                        }">
                        Start solving
                    </v-button>
                    <v-button
                        class="m-4"
                        :to="{
                            name: 'records',
                            params: {
                                puzzle: '3x3',
                            },
                        }">
                        See current records
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
