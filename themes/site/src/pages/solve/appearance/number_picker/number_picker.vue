<template>
    <div>
        <v-range-input
            :disabled="disabled"
            :max="max"
            :min="min"
            :step="step"
            :value="value"
            @input="onInput"
        />
    </div>
</template>

<script>
export default {
    methods: {
        onInput(val) {
            this.$emit('input', val);
        },
    },
    props: {
        disabled: {
            default: false,
            type: Boolean,
        },
        max: {
            required: true,
            type: Number,
            validator: val => Number.isFinite(val),
        },
        min: {
            required: true,
            type: Number,
            validator: val => Number.isFinite(val),
        },
        step: {
            required: true,
            type: Number,
            validator: val => Number.isFinite(val),
        },
        value: {
            required: true,
            type: Number,
            validator: val => Number.isFinite(val),
        },
    },
};
</script>
