<style lang="scss" scoped>
    .v-form-field + .v-form-field {
        margin-top: 2rem;
    }

    .v-form-field[data-invalid] {
        /deep/ .v-input {
            border-color: config('colors.red-light') !important;

            input {
                // these selectors aren't standardized, and are buggy when
                // chained together. using this mixin allows us to side
                // step the issue without repeating placeholder css.
                @mixin placeholder {
                    color: config('colors.red-light');
                }

                &:-ms-input-placeholder { @include placeholder } // <- IE >= 10
                &:-moz-placeholder { @include placeholder } // <- Firefix < 18
                &::-moz-placeholder { @include placeholder } // <- Firefox >= 19
                &::-webkit-input-placeholder { @include placeholder } // <- Chrome, Opera, Safari
            }
        }
    }

    //
    // help
    //
    .help {
        &:empty {
            display: none;
        }

        /deep/ a {
            color: config('colors.grey-7');

            &:hover {
                color: config('colors.primary-6');
            }
        }
    }
</style>

<template>
    <div
        class="v-form-field text-grey-8 trans-color focus-within:text-grey-9"
        :data-invalid="!isValid || undefined">

        <div class="flex flex-wrap font-bold items-end justify-between">
            <!-- label -->
            <label
                class="block cursor-pointer mb-2 text-sm tracking-wide w-full sm:w-auto"
                v-if="label"
                v-text="label"
                @click="focus"
            />

            <!-- help -->
            <div class="help mb-2 text-xs tracking-wide"><slot name="help" /></div>
        </div>

        <!-- content -->
        <slot />

        <!-- error -->
        <v-collapse-transition>
            <v-error-message v-if="!isValid" class="mt-2">
                {{ error }}
            </v-error-message>
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
            form: null,
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
        formErrors() {
            return this.form ? this.form.errors : {};
        },
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
    watch: {
        formErrors(errors) {
            this.error = '';

            Object.keys(errors || {}).forEach((fieldName) => {
                if (fieldName === this.name) {
                    this.error = errors[fieldName];

                    this.focus();
                }
            });
        },
    },
};
</script>
