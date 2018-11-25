<template>
    <!--
        we're listening for a seperate checkbox submit event in
        order to side-step a firefox bug, see here for more info
        https://bugzilla.mozilla.org/show_bug.cgi?id=1477286
    -->
    <form
        @checkbox-submit="onSubmit"
        @submit.prevent="onSubmit">
        <slot />

        <div
            v-if="$slots.actions"
            class="pt-12 text-right">
            <slot name="actions" />
        </div>
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
        focus(name) {
            const field = this.fields.find(f => f.name === name);

            if (field) {
                field.focus();
            }
        },
        onSubmit(e) {
            this.validate().then(() => {
                // passed
                this.$emit('submit', e);
            }, (err) => {
                // failed
                this.focus(err.data.field);
            });
        },
        registerField(vm) {
            // register the field vm if it isn't already
            if (!this.fields.includes(vm)) {
                this.fields.push(vm);

                /* eslint-disable-next-line no-param-reassign */
                vm.form = this;
            }
        },
        unregisterField(vm) {
            // remove the field vm from the fields array
            this.fields = this.fields.filter(field => field !== vm);
        },
        validate() {
            // validate all fields
            const data = this.fields.reduce((acc, field) => ({
                ...acc, [field.name]: field.value,
            }), {});


            return Promise.all(this.fields.map(f => f.validate(data)));
        },
    },
    name: 'v-form',
    props: {
        errors: {
            default: () => {},
            type: Object,
        },
    },
};
</script>
