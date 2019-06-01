<template>
    <vue-slider
        v-model="val"
        :dot-size="16"
        :height="2"
        :max="max"
        :min="min"
        :process-style="{
            backgroundColor: '#2680C2',
        }"
        :rail-style="{
            backgroundColor: '#616E7C',
            border: 'none',
            boxShadow: 'none',
        }"
        :tooltip="'none'">

        <!-- dot -->
        <template slot="dot">
            <div
                class="bg-grey-5 cursor-move h-full rounded-half trans-bg w-full hover:bg-grey-4"
            />
        </template>
    </vue-slider>
</template>

<script>
// see slider docs at:
// https://github.com/NightCatSama/vue-slider-component

import vueSlider from 'vue-slider-component';

export default {
    components: {
        vueSlider,
    },
    computed: {
        val: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
    model: {
        event: 'input',
        prop: 'value',
    },
    props: {
        max: {
            type: Number,
        },
        min: {
            type: Number,
        },
        value: {
            default: 0,
            type: Number,
        },
    },
};
</script>
