<style lang="scss" scoped>
a {
    &:after {
        content: '';
        @apply block pb-full;
    }
}
</style>

<template>
    <div>
        <div class="flex flex-wrap max-w-lg mb-12">
            <div
                v-for="(side, index) in sides"
                class="flex flex-wrap p-1 w-1/4"
                :key="index">
                <template v-if="side">
                    <a
                        v-for="(sticker, index) in stickersPerSide"
                        class="border border-dotted border-grey-7 hover:border-grey-9"
                        href="#"
                        :key="sticker"
                        :style="{
                            backgroundColor: puzzleState[side][index] > 0
                                ? colors[puzzleState[side][index]]
                                : undefined,
                            width: `${(1 / size) * 100}%`
                        }"
                        @click.prevent="set(side, index)">
                    </a>
                </template>
            </div>
        </div>
        <div class="flex">
            <a
                v-for="(color, index) in colors"
                class="block h-8 mr-4 rounded-full w-8"
                href="#"
                :class="{
                    'border-2': index === selectedIndex
                }"
                :key="index"
                :style="{ backgroundColor: color }"
                @click.prevent="select(index)"
            />
        </div>
    </div>
</template>

<script>
import { get } from 'lodash-es';
import { puzzles } from '@/app/constants';

export default {
    created() {
        this.reset();
    },
    data() {
        return {
            puzzleState: {},
            selectedIndex: 0,
        };
    },
    computed: {
        colors() {
            return get(this.config, 'colors')
                || get(puzzles, `${this.puzzle}.defaultConfig.colors`);
        },
        sides() {
            return [
                0, 'U', 0, 0, 'L', 'F', 'R', 'B', 0, 'D',
            ];
        },
        size() {
            return parseInt(this.puzzle, 10);
        },
        stickersPerSide() {
            return this.size ** 2;
        },
    },
    methods: {
        reset() {
            const face = () => new Array(this.stickersPerSide).fill(-1);

            this.puzzleState = {
                U: face(),
                L: face(),
                F: face(),
                R: face(),
                B: face(),
                D: face(),
            };
        },
        select(index) {
            this.selectedIndex = index;
        },
        set(side, index) {
            if (this.puzzleState[side][index] !== this.selectedIndex) {
                this.$set(this.puzzleState[side], index, this.selectedIndex);
            } else {
                this.$set(this.puzzleState[side], index, -1);
            }
        },
    },
    props: [
        'config',
        'puzzle',
    ],
    watch: {
        puzzle: 'reset',
    },
};
</script>