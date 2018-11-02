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
    }
</style>

<script>
import { bindAll } from 'spyfu-vue-functional';
import { isFunction } from 'lodash-es';

// icon
function iconEl(h, context) {
    const { icon } = context.props;

    if (icon) {
        return <i class={`fa fa-${icon} pointer-events-none pl-4`} />;
    }

    return undefined;
}

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const inputBindings = { class: [], on: {} };
        const { icon, placeholder, type, value } = context.props;

        // icon
        if (icon) {
            bindings.on.click = function (e) {
                const input = e.target.querySelector('input');

                if (input) {
                    input.focus();
                }
            };
        }

        // interface with v-model
        if (isFunction(context.listeners.input)) {
            inputBindings.on.input = e => context.listeners.input(e.target.value);

            delete bindings.on.input;
        }

        return <div class="v-input" {...bindings}>
            <div class="bg-white cursor-text flex items-center justify-center rounded shadow text-grey">
                {iconEl(h, context)}
                <input
                    class="bg-transparent p-4 w-full focus:outline-none"
                    domPropsValue={value}
                    placeholder={placeholder}
                    type={type}
                    {...inputBindings}
                />
            </div>
        </div>;
    },
    functional: true,
    props: {
        icon: {
            type: String,
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
