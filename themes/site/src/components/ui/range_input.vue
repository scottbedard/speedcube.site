<template>
    <vue-slider
        v-model="val"
        :dot-size="16"
        :height="2"
        :max="max"
        :min="min"
        :process-style="{
            backgroundColor: '#0F609B',
        }"
        :rail-style="{
            backgroundColor: '#3E4C59',
            border: 'none',
            boxShadow: 'none',
        }"
        :tooltip="'none'">

        <!-- dot -->
        <template slot="dot">
            <div
                class="bg-grey-3 cursor-grab h-full rounded-half trans-bg w-full hover:bg-grey-4"
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
