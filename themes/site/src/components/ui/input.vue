<style lang="scss" scoped>
    input {
        // these selectors aren't standardized, and are buggy when
        // chained together. using this mixin allows us to side
        // step the issue without repeating placeholder css.
        @mixin placeholder {
            color: config('colors.grey-darker');
        }

        &:-ms-input-placeholder { @include placeholder } // <- IE >= 10
        &:-moz-placeholder { @include placeholder } // <- Firefix < 18
        &::-moz-placeholder { @include placeholder } // <- Firefox >= 19
        &::-webkit-input-placeholder { @include placeholder } // <- Chrome, Opera, Safari

        &:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 30px white inset;
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
        const { autofocus, disabled, placeholder, type, value } = context.props;

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

        return <div
            class="v-input border border-grey-light h-12 rounded trans-border trans-opacity focus-within:border-primary-lighter"
            {...bindings}>
            <input
                class="bg-transparent h-full outline-none px-4 w-full"
                disabled={disabled}
                domPropsValue={value}
                placeholder={placeholder}
                type={type}
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
        placeholder: {
            type: String,
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
