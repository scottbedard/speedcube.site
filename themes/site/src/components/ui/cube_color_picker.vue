<template>
    <div class="flex justify-center">
        <v-input
            type="color"
            :value="value[0]"
            @change="onColorChange(0, $event)"
        />
        <v-input
            type="color"
            :value="value[1]"
            @change="onColorChange(1, $event)"
        />
        <v-input
            type="color"
            :value="value[2]"
            @change="onColorChange(2, $event)"
        />
        <v-input
            type="color"
            :value="value[3]"
            @change="onColorChange(3, $event)"
        />
        <v-input
            type="color"
            :value="value[4]"
            @change="onColorChange(4, $event)"
        />
        <v-input
            type="color"
            :value="value[5]"
            @change="onColorChange(5, $event)"
        />
    </div>
</template>

<script>
export default {
    methods: {
        onColorChange(index, e) {
            const colors = this.value.slice(0);

            colors.splice(index, 1, e.target.value);

            this.$emit('input', colors);
        },
    },
    props: {
        value: {
            required: true,
            type: Array,
        },
    },
};
</script>
