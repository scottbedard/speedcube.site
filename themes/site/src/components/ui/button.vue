<style lang="scss" scoped>
    a,
    button {
        @apply no-underline;

        &:active {
            transform: translateY(1px);
        }
    }

    .v-button-ghost {
        border-color: transparent !important;
    }
</style>

<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { danger, disabled, icon, ghost, href, primary, to, type } = context.props;

        //
        // disabled
        //
        if (disabled) {
            bindings.class.push('cursor-default');
        } else {
            bindings.class.push('cursor-pointer');
        }

        //
        // theme
        //
        if (ghost) {
            // ghost
            bindings.class.push(`text-grey-7 ${disabled ? '' : 'hover:text-grey-8'}`);
        } else if (primary) {
            // primary
            bindings.class.push(`bg-primary-5 text-primary-10 ${disabled ? '' : 'hover:bg-primary-6 hover:text-grey-10'}`);
        } else if (danger) {
            // danger
            bindings.class.push(`v-button-danger bg-danger-6 text-danger-10 ${disabled ? '' : 'hover:bg-danger-7 hover:text-grey-10'}`);
        } else  {
            // default
            bindings.class.push(`bg-grey-5 text-grey-9 ${disabled ? '' : 'hover:bg-grey-6'}`);
        }

        //
        // spacing
        //
        if (ghost) {
            bindings.class.push('p-4');
        } else {
            bindings.class.push('px-8 py-4');
        }

        //
        // tag
        //
        let Tag = 'button';

        if (to) {
            Tag = 'router-link';
        } else if (href) {
            Tag = 'a';
        }

        return <Tag
            class="v-button font-bold inline-flex items-center justify-center leading-normal rounded-full text-center text-sm tracking-widest trans-bg trans-border trans-color"
            disabled={disabled}
            href={href}
            to={to}
            type={type}
            {...bindings}>
            {icon && <i class={['fa mr-4 text-lg', icon]} />}
            {context.slots().default}
        </Tag>;
    },
    functional: true,
    props: {
        danger: {
            default: false,
            type: Boolean,
        },
        disabled: {
            default: false,
            type: Boolean,
        },
        icon: {
            type: String,
        },
        ghost: {
            default: false,
            type: Boolean,
        },
        href: {
            type: String,
        },
        primary: {
            default: false,
            type: Boolean,
        },
        to: {
            type: Object,
        },
        type: {
            type: String,
        },
    },
};
</script>
