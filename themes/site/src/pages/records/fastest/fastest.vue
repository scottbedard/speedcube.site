<template>
    <v-section
        title="Fastest"
        :loading="isLoading">
        <pre class="text-xs">{{ solves }}</pre>
    </v-section>
</template>

<script>
import sectionComponent from '../shared/section.vue';
import { getSolves } from '@/app/repositories/solves';

export default {
    created() {
        this.fetchSolves();
    },
    data() {
        return {
            isLoading: false,
            solves: [],
        };
    },
    methods: {
        fetchSolves() {
            this.isLoading = true;

            getSolves({
                cubeSize: 3,
            }).then((response) => {
                // success
                this.solves = response.data.solves;
            }).finally(() => {
                // complete
                this.isLoading = false;
            });
        },
    },
    components: {
        'v-section': sectionComponent,
    },
};
</script>