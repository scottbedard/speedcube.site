<style lang="scss" scoped>

</style>

<template>
    <vue-slider
        v-model="val"
        tooltip="hover"
        tooltip-dir="top"
        :bg-style="{
            backgroundColor: '#616E7C',
            border: 'none',
        }"
        :dot-size="20"
        :height="2"
        :lazy="true"
        :min="min"
        :max="max"
        :process-style="{
            backgroundColor: '#0F609B',
        }"
        :slider-style="{
            backgroundColor: '#3E4C59',
            boxShadow: 'none',
            border: 'none',
        }">

        <!-- tooltip -->
        <template slot="tooltip" slot-scope="{ value }">
            <v-card class="mb-1 p-2 text-xs">
                {{ value }}
            </v-card>
        </template>
    </vue-slider>
</template>

<script>
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
        step: {
            type: Number,
        },
        value: {
            default: 0,
            type: Number,
        },
    },
};
</script>
