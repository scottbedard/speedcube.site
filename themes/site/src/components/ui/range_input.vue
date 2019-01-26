<style lang="scss" scoped>

</style>

<template>
    <vue-slider
        v-model="val"
        :bg-style="{
            backgroundColor: '#616E7C',
            border: 'none',
        }"
        :dot-size="20"
        :height="2"
        :lazy="true"
        :max="max"
        :min="min"
        :process-style="{
            backgroundColor: '#0F609B',
        }"
        :slider-style="{
            backgroundColor: '#3E4C59',
            border: 'none',
            boxShadow: 'none',
        }"
        :tooltip="false">

        <!-- dot -->
        <template slot="dot">
            <div
                class="bg-grey-3 h-full rounded-half trans-bg w-full hover:bg-grey-4"
            />
        </template>
    </vue-slider>
</template>

<script>
// see slider docs at:
// https://github.com/NightCatSama/vue-slider-component

import vueSlider from 'vue-slider-component/src/vue2-slider.vue';

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
