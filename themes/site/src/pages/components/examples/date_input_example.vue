<template>
    <v-example title="<v-date-input>">
        <p>An awesome component.</p>

        <div class="max-w-sm">
            <v-date-input v-model="day" />
        </div>
    </v-example>
</template>

<script>
import moment from 'moment';
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            day: moment().format('YYYY-MM-DD'),
        };
    },
    components: {
        'v-example': exampleComponent,
    },
};
</script>
