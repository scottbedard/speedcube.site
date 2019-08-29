<template>
    <v-modal
        title="Select a Puzzle"
        padded
        size="sm"
        @close="close">
        <div class="mb-1 text-grey-7 tracking-wider">Select Puzzle</div>
        <v-select
            :options="puzzleTypes"
            :value="value"
            @change="onChange"
        />
    </v-modal>
</template>

<script>
import { get } from 'lodash-es';
import { puzzleTypes } from '@/app/constants';

export default {
    computed: {
        puzzleTypes() {
            return puzzleTypes;
        },
        value() {
            return get(this.$route, 'params.puzzle', '');
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        onChange(puzzle) {
            this.close();

            this.$router.push({
                name: 'solve',
                params: {
                    puzzle,
                },
            });
        },
    },
};
</script>
