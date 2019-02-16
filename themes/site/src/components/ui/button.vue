<style lang="scss" scoped>
    a,
    button {
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
        const { danger, ghost, href, primary, size, to, type } = context.props;

        //
        // theme
        //
        if (primary) {
            bindings.class.push('v-button-primary border-grey-7 text-grey-7 hover:border-primary-6 hover:text-primary-6');
        } else if (danger) {
            bindings.class.push('v-button-danger border-grey-7 text-grey-7 hover:border-danger-7 hover:text-danger-7');
        } else {
            bindings.class.push('border-grey-7 text-grey-7 hover:border-grey-7 hover:text-grey-8');
        }

        //
        // ghost
        //
        if (ghost) {
            bindings.class.push('v-button-ghost');
        }

        //
        // size
        //
        if (size === 'sm') {
            bindings.class.push('min-h-10 px-4 py-2');
        } else if (size === 'md') {
            bindings.class.push('min-h-12 px-8 py-2');
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
            class="border border-solid inline-flex items-center justify-center leading-normal rounded text-center text-xs tracking-wide trans-border trans-color uppercase focus:outline-none"
            href={href}
            to={to}
            {...bindings}>
            {context.slots().default}
        </Tag>;
    },
    functional: true,
    props: {
        danger: {
            default: false,
            type: Boolean,
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
        size: {
            default: 'md',
            type: String,
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