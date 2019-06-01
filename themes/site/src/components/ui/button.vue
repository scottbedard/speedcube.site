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
        const { danger, icon, ghost, href, primary, size, to, type } = context.props;

        //
        // theme
        //
        if (primary) {
            bindings.class.push('v-button-primary');
        
            if (ghost) {
                bindings.class.push('border-2 border-primary-5 text-primary-10 hover:border-primary-6 hover:text-grey-10');
            } else {
                bindings.class.push('bg-primary-5 text-primary-10 hover:bg-primary-6 hover:text-grey-10');
            }
        } else if (danger) {
            bindings.class.push('v-button-danger');
        
            if (ghost) {
                bindings.class.push('border-2 border-danger-6 text-danger-10 hover:border-danger-7 hover:text-grey-10');
            } else {
                bindings.class.push('bg-danger-6 text-danger-10 hover:bg-danger-7 hover:text-grey-10');
            }
        } else {
            if (ghost) {
                bindings.class.push('text-grey-6 hover:text-grey-8');
            } else {
                bindings.class.push('bg-grey-5 text-grey-10 hover:bg-grey-7 hover:text-grey-10');
            }
        }

        //
        // size
        //
        if (!ghost) {
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
            class="cursor-pointer font-bold inline-flex items-center justify-center leading-normal rounded-full text-center text-sm tracking-wide trans-bg trans-border trans-color uppercase focus:outline-none"
            href={href}
            to={to}
            type={type}
            {...bindings}>
            {icon && <i class={['fa mr-2 text-lg', icon]} />}
            {context.slots().default}
        </Tag>;
    },
    functional: true,
    props: {
        danger: {
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
