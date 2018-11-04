<template>
    <form @submit.prevent="onSubmit">
        <slot />
    </form>
</template>

<script>
export default {
    data() {
        return {
            fields: [],
        };
    },
    methods: {
        onSubmit(e) {
            this.validate().then(() => {
                // passed validation
                this.$emit('submit', e);
            });
        },
        registerField(vm) {
            // register the field vm if it isn't already
            if (!this.fields.includes(vm)) {
                this.fields.push(vm);
            }
        },
        unregisterField(vm) {
            // remove the field vm from the fields array
            this.fields = this.fields.filter(field => field !== vm);
        },
        validate() {
            // validate all fields
            const formData = this.fields.reduce((acc, field) => ({
                ...acc, [field.name]: field.value,
            }), {});

            return Promise.all(this.fields.map(field => field.validate(formData)));
        },
    },
    name: 'v-form',
};
</script>
