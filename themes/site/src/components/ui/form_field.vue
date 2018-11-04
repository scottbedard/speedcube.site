<style lang="scss" scoped>
    .v-form-field + .v-form-field {
        margin-top: 1.5rem;
    }
</style>

<template>
    <div
        class="v-form-field"
        :data-valid="isValid">
        <!-- label -->
        <label
            class="block cursor-pointer font-bold mb-1 text-grey-dark text-sm"
            v-if="label"
            v-text="label"
            @click="focus"
        />

        <!-- input -->
        <slot />

        <!-- error -->
        <v-collapse-transition>
            <div
                v-if="!isValid"
                v-text="error"
                class="pt-2 text-red text-sm"
            />
        </v-collapse-transition>
    </div>
</template>

<script>
import * as validators from '@/app/utils/validators';
import { findAncestor } from '@/app/utils/component';
import { isBoolean, isFunction, isString, isUndefined } from 'lodash-es';

//
// default error messages
//
const defaultErrors = {
    email() {
        return 'This doesn\'t look like a valid email address.';
    },
    required() {
        return 'This field is required';
    },
};

//
// <v-form-field>
//
export default {
    data() {
        return {
            error: '',
        };
    },
    destroyed() {
        this.unregister();
    },
    mounted() {
        this.register();
    },
    computed: {
        isValid() {
            return this.error.length === 0;
        },
        parsedRules() {
            // parse and normalize field rules
            return this.rules
                .split('|')
                .map(rule => rule.trim())
                .filter(rule => rule.length)
                .map((rule) => {
                    const [name, params] = rule.split(':');

                    return {
                        name,
                        params: (params || '')
                            .split(',')
                            .map(param => param.trim())
                            .filter(param => param.length),
                    };
                });
        },
    },
    methods: {
        displayError(rule) {
            // set the error message
            if (this.error.length === 0) {
                if (isString(this.errorMessages[rule.name])) {
                    this.error = this.errorMessages[rule.name];
                } else if (isFunction(defaultErrors[rule.name])) {
                    this.error = defaultErrors[rule.name](rule, this.value);
                } else {
                    this.error = 'This field is invalid';
                }
            }
        },
        focus() {
            const input = this.$el.querySelector('input');

            if (input) {
                input.focus();
            }
        },
        register() {
            // register the field with the parent form
            const form = findAncestor(this, 'v-form');

            if (form) {
                form.registerField(this);
            }
        },
        unregister() {
            // unregister the field with the parent form
            const form = findAncestor(this, 'v-form');

            if (form) {
                form.unregisterField(this);
            }
        },
        validate(formData = {}) {
            this.error = '';

            return Promise.all(this.parsedRules.map((rule) => {
                if (isUndefined(validators[rule.name])) {
                    throw new Error(`Unknown validation rule "${rule.name}"`);
                }

                const result = validators[rule.name](formData, this.name, rule.params);

                if (isBoolean(result)) {
                    if (result) {
                        return Promise.resolve();
                    }

                    this.displayError(rule);

                    const err = new Error(`Validator for rule "${rule.name}" failed on field "${this.name}".`);

                    err.data = {
                        rule,
                        field: this.name,
                    };

                    return Promise.reject(err);
                }

                return result;
            }));
        },
    },
    props: {
        errorMessages: {
            default() {
                return {};
            },
            type: Object,
        },
        label: {
            type: String,
        },
        name: {
            required: true,
            type: String,
        },
        rules: {
            default: '',
            type: String,
        },
        value: {
            required: true,
        },
    },
};
</script>
