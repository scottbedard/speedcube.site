<style lang="scss" scoped>
    input {
        caret-color: config('colors.grey-6');

        // these selectors aren't standardized, and are buggy when
        // chained together. using this mixin allows us to side
        // step the issue without repeating placeholder css.
        @mixin placeholder {
            color: config('colors.grey-8');
            font-weight: normal;
            letter-spacing: normal;
        }

        &:-ms-input-placeholder { @include placeholder } // <- IE >= 10
        &:-moz-placeholder { @include placeholder } // <- Firefix < 18
        &::-moz-placeholder { @include placeholder } // <- Firefox >= 19
        &::-webkit-input-placeholder { @include placeholder } // <- Chrome, Opera, Safari

        // clean up the autofill state in webkit browsers
        &:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 30px config('colors.grey-2') inset;
            -webkit-text-fill-color: config('colors.grey-8');
        }
    }
</style>

<script>
import { bindAll } from 'spyfu-vue-functional';
import { isFunction } from 'lodash-es';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { autofocus, disabled, max, min, placeholder, step, type, value } = context.props;

        const inputBindings = {
            class: [],
            directives: [],
            on: {},
        };

        // autofocus
        if (autofocus) {
            inputBindings.directives.push({ name: 'autofocus' });
        }

        // disabled
        if (disabled) {
            // ...
        }

        // interface with v-model
        if (isFunction(context.listeners.input)) {
            inputBindings.on.input = e => context.listeners.input(e.target.value);

            delete bindings.on.input;
        }

        return <div
            class="v-input bg-grey-2 h-14 rounded px-4"
            {...bindings}>
            <input
                class="bg-transparent font-bold h-full w-full text-grey-8 tracking-wide focus:outline-none"
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
