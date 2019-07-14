<style lang="scss" scoped>
    // https://github.com/darlanrod/input-range-scss
    $thumb-color: #186FAF;
    // $thumb-border-color: #eceff1;
    $thumb-border-width: 0px;
    $thumb-height: 16px;
    $thumb-radius: 8px;
    $thumb-shadow-blur: 0px;
    // $thumb-shadow-color: rgba(0, 0, 0, .2);
    $thumb-shadow-size: 0px;

    $thumb-width: 16px;
    $track-border-width: 0px;
    $track-color: #52606D;
    // $track-border-color: #cfd8dc;
    $track-height: 4px;
    $track-radius: 2px;
    $track-shadow-blur: 0px;
    // $track-shadow-color: rgba(0, 0, 0, .2);
    $track-shadow-size: 0px;
    // $track-width: 100%;

    @import '../../../node_modules/input-range-scss/_inputrange.scss';
</style>

<template>
    <input
        v-model.number="val"
        type="range"
        :max="max"
        :min="min"
        :step="step"
    />
</template>

<script>
export default {
    computed: {
        val: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
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
