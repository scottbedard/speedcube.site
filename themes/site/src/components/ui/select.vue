<template>
    <div>
        <div class="relative text-grey-6">
            <!-- select -->
            <select
                class="appearance-none bg-grey-2 cursor-pointer h-12 rounded pl-4 pr-8 w-full"
                :disabled="disabled"
                :value="value"
                @change="onChange">
                <option
                    v-for="(option, index) in normalizedOptions"
                    v-text="option.display"
                    :key="index"
                    :value="option.value"
                />
            </select>

            <!-- placeholder -->
            <div
                v-if="!value && placeholder"
                v-text="placeholder"
                class="absolute left-0 truncate pl-4 pointer-events-none pr-10 top-half -ty-half w-full"
            />

            <!-- arrow -->
            <i class="absolute fa fa-angle-down mr-4 pointer-events-none text-grey-7 top-half right-0 -ty-half" />
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        normalizedOptions() {
            return this.options.map(option => (typeof option === 'object'
                ? { display: '', value: undefined, ...option }
                : { display: option, value: option }));
        },
    },
    methods: {
        onChange(e) {
            this.$emit('change', e.target.value);
        },
    },
    model: {
        event: 'change',
        prop: 'value',
    },
    props: {
        disabled: {
            default: false,
            type: Boolean,
        },
        options: {
            default: () => [],
            type: Array,
        },
        placeholder: {
            type: String,
        },
        value: {
            type: [Number, String],
        },
    },
};
</script>
