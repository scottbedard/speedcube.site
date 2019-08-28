<style lang="scss" scoped>
    textarea {
        // caret-color: theme('colors.grey-6');

        // these selectors aren't standardized, and are buggy when
        // chained together. using this mixin allows us to side
        // step the issue without repeating placeholder css.
        @mixin placeholder {
            @apply font-thin text-grey-8 tracking-wide;
        }

        &:-ms-input-placeholder { @include placeholder } // <- IE >= 10
        &:-moz-placeholder { @include placeholder } // <- Firefix < 18
        &::-moz-placeholder { @include placeholder } // <- Firefox >= 19
        &::-webkit-input-placeholder { @include placeholder } // <- Chrome, Opera, Safari

        // clean up the autofill state in webkit browsers
        &:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 30px theme('colors.grey-2') inset;
            -webkit-text-fill-color: theme('colors.grey-8');
        }
    }
</style>

<script>
import { bindAll } from 'spyfu-vue-functional';
import { isFunction } from 'lodash-es';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { autofocus, disabled, id, placeholder, tabindex, value } = context.props;

        // autofocus
        if (autofocus) {
            bindings.directives.push({ name: 'autofocus' });
        }

        // interface with v-model
        if (isFunction(context.listeners.input)) {
            bindings.on.input = e => context.listeners.input(e.target.value);
        }

        return <textarea
            class="bg-grey-2 flex-1 p-4 rounded text-grey-8"
            disabled={disabled}
            domPropsValue={value}
            id={id}
            placeholder={placeholder}
            tabindex={tabindex}
            {...bindings}
        />;
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
        id: {
            type: String,
        },
        placeholder: {
            type: String,
        },
        tabindex: {
            type: [Number, String],
        },
        value: {
            default: '',
            type: [Number, String],
        },
    },
};
</script>
