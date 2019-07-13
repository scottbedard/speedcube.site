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
