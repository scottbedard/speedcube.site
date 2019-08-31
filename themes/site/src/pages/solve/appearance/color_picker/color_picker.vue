<template>
    <div class="flex flex-wrap -m-2 pt-2">
        <div
            v-for="n in faces"
            class="p-2"
            :key="n">
            <v-color-input
                :disabled="disabled"
                :value="value[n - 1] || '#FFFFFF'"
                @input="setColor($event, n - 1)"
            />
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        setColor(color, index) {
            const colors = this.value.slice(0);

            colors[index] = color;

            this.$emit('input', colors);
        },
    },
    props: {
        disabled: {
            default: false,
            type: Boolean,
        },
        faces: {
            required: true,
            type: Number,
            validator: sides => Number.isInteger(sides) && sides > 0,
        },
        value: {
            required: true,
            type: Array,
        },
    },
};
</script>
