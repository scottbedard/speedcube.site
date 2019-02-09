<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { danger, loading, primary, size, tag, to } = context.props;

        bindings.class.push('block border-2 border-grey-5 text-grey-7 trans-border trans-color');

        //
        // theme
        //
        if (danger) {
            // danger
            bindings.class.push('hover:border-danger-7 hover:text-danger-7');
        } else if (primary) {
            // primary
            bindings.class.push('bg-primary-4 text-primary-10 trans-bg hover:bg-primary-5');
        } else {
            // default
            bindings.class.push('hover:border-primary-5 hover:text-primary-7');
        }

        //
        // size
        //
        if (size === 'sm') {
            bindings.class.push('h-10 px-6');
        } else if (size === 'md') {
            bindings.class.push('h-12 px-8');
        }

        //
        // tag
        //
        let Tag = tag;

        if (to) {
            Tag = 'router-link';
        }

        return <Tag
            class="cursor-pointer font-bold inline-flex items-center justify-center rounded-full text-xs tracking-wide uppercase focus:outline-none"
            to={to}
            {...bindings}>
            {
                loading
                    ? <v-spinner color="grey-dark" size="sm" />
                    : context.slots().default
            }
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
        loading: {
            default: false,
            type: Boolean,
        },
        primary: {
            default: false,
            type: Boolean,
        },
        size: {
            default: 'md',
            type: String,
        },
        tag: {
            default: 'button',
            type: String,
        },
        to: {
            type: [Object, String],
        },
    },
};
</script>
