<template>
    <footer class="py-8 text-grey-6 text-center">
        <v-margin padded>
            <v-grid padded>
                <v-grid-cell class="text-xs md:text-left" md="6">
                    <div class="font-bold mb-2">
                        <router-link :to="{ name: 'home' }">speedcube.site</router-link>
                    </div>
                    <div class="text-grey-5">
                        &copy; 2018-{{ currentYear }}, all rights reserved.
                    </div>
                </v-grid-cell>
                <v-grid-cell class="md:text-left" md="6">
                    <div class="flex flex-wrap items-center justify-center -m-2 overflow-hidden text-2xl md:justify-end">
                        <router-link
                            class="m-2 text-xs w-full md:w-auto"
                            :to="{ name: 'terms' }">
                            Terms &amp; Privacy
                        </router-link>
                        <a
                            class="m-2"
                            href="https://github.com/scottbedard/speedcube.site"
                            target="_blank">
                            <i class="fa fa-github"></i>
                        </a>
                        <a
                            class="m-2"
                            href="https://twitter.com/speedcubesite"
                            target="_blank">
                            <i class="fa fa-twitter"></i>
                        </a>
                    </div>
                </v-grid-cell>
            </v-grid>
        </v-margin>
    </footer>
</template>

<script>
import { currentYear } from '@/app/constants';

export default {
    computed: {
        currentYear() {
            return currentYear;
        },
    },
};
</script>
