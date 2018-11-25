<style lang="scss" scoped>
    input {
        // these selectors aren't standardized, and are buggy when
        // chained together. using this mixin allows us to side
        // step the issue without repeating placeholder css.
        @mixin placeholder {
            // color: config('colors.primary-lightest');
        }

        &:-ms-input-placeholder { @include placeholder } // <- IE >= 10
        &:-moz-placeholder { @include placeholder } // <- Firefix < 18
        &::-moz-placeholder { @include placeholder } // <- Firefox >= 19
        &::-webkit-input-placeholder { @include placeholder } // <- Chrome, Opera, Safari

        &:-webkit-autofill {
            // -webkit-box-shadow: 0 0 0 30px white inset;
        }

        //
        // color pickers
        //
        &[type=color] {
            appearance: none;
            border: none;
            cursor: pointer;
            height: 1.5rem;
            padding: 0;
            width: 1.5rem;

            &::-webkit-color-swatch-wrapper {
                padding: 0;
            }

            &::-webkit-color-swatch {
                border: none;
            }
        }

        //
        // ranges
        //
        $thumbDiameter: 12px;
        $trackHeight: 4px;

        &[type=range] {
            appearance: none;

            &:focus {
                outline: none
            }

            // webkit
            &::-webkit-slider-thumb {
                appearance: none;
                background: config('colors.primary');
                border-radius: 50%;
                cursor: pointer;
                height: $thumbDiameter;
                margin-top: -$thumbDiameter / 3;
                width: $thumbDiameter;
            }

            &::-webkit-slider-runnable-track {
                background: config('colors.grey-darker');
                border-radius: 2rem;
                cursor: pointer;
                height: $trackHeight;
                transition: background 150ms ease-in-out;
                width: 100%;
            }

            &:focus::-webkit-slider-runnable-track {
                background: config('colors.grey-dark');
            }

            // mozilla
            &::-moz-range-thumb {
                background: config('colors.primary');
                border-radius: 50%;
                border: 0;
                cursor: pointer;
                height: $thumbDiameter;
                width: $thumbDiameter;
            }

            &::-moz-range-track {
                background: config('colors.grey-darker');
                border-radius: 2rem;
                cursor: pointer;
                height: $trackHeight;
                transition: background 150ms ease-in-out;
                width: 100%;
            }

            // microsoft
            &::-ms-track {
                background: transparent;
                border-color: transparent;
                color: transparent;
                cursor: pointer;
                height: $trackHeight;
                width: 100%;
            }

            &::-ms-fill-lower {
                background: config('colors.grey-darker');
                border-radius: 50px;
                border: 0px;
            }

            &::-ms-fill-upper {
                background: config('colors.grey-darker');
                border-radius: 50px;
                border: 0px;
            }

            &::-ms-thumb {
                background: config('colors.primary');
                border-radius: 37px;
                border: 0px solid rgba(0, 0, 0, 0);
                cursor: pointer;
                height: $thumbDiameter;
                height: $trackHeight;
                width: $thumbDiameter;
            }

            &:focus::-ms-fill-lower {
                background: config('colors.grey-dark');
            }
        }

    }
</style>

<script>
import { bindAll } from 'spyfu-vue-functional';
import { isFunction } from 'lodash-es';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const inputBindings = { class: [], on: {} };
        const { autofocus, disabled, max, min, placeholder, step, type, value } = context.props;

        // autofocus
        if (autofocus) {
            if (!inputBindings.directives) {
                inputBindings.directives = [];
            }

            inputBindings.directives.push({ name: 'autofocus' });
        }

        // disabled
        if (disabled) {
            bindings.class.push('opacity-60 pointer-events-none');
        }

        // interface with v-model
        if (isFunction(context.listeners.input)) {
            inputBindings.on.input = e => context.listeners.input(e.target.value);

            delete bindings.on.input;
        }

        // types
        if (type === 'color') {
            bindings.class.push('');
        } else if (type === 'range') {
            // ...
        } else {
            bindings.class.push('border-b-2 border-grey-dark h-12 focus-within:border-primary');
        }

        return <div
            class="v-input"
            {...bindings}>
            <input
                class="bg-transparent h-full outline-none text-grey-lighter text-lg w-full"
                disabled={disabled}
                domPropsValue={value}
                max={max}
                min={min}
                placeholder={placeholder}
                type={type}
                step={step}
                {...inputBindings}
            />
        </div>;
    },
    functional: true,
    props: {
        autofocus: {
            default: false,
            type: Boolean,
        },
        disabled: {
            default: false,
            type: Boolean,
        },
        max: {
            type: [Number, String],
        },
        min: {
            type: [Number, String],
        },
        placeholder: {
            type: String,
        },
        step: {
            type: [Number, String],
        },
        type: {
            type: String,
        },
        value: {
            default: '',
            type: [Number, String],
        },
    },
};
</script>
