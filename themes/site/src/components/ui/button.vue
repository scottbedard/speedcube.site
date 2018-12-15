<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { disabled, loading, outlined, primary, size, to } = context.props;

        //
        // primary
        //
        if (primary) {
            if (outlined) {
                bindings.class.push('border-2 border-primary-5 text-primary-6 trans-border hover:border-primary-6');
            } else {
                bindings.class.push('bg-primary-4 text-primary-10 trans-bg hover:bg-primary-5')
            }
        } else {
            if (outlined) {
                bindings.class.push('border-2 border-grey-5 text-grey-7 trans-border trans-color hover:border-primary-5 hover:text-primary-7');
            } else {
                // ...
            }
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
        let Tag = 'button';

        if (to) {
            Tag = 'router-link';
        }

        return <Tag
            class="font-bold inline-flex items-center rounded-full text-xs tracking-wide uppercase focus:outline-none"
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
        disabled: {
            default: false,
            type: Boolean,
        },
        loading: {
            default: false,
            type: Boolean,
        },
        outlined: {
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
        to: {
            type: [Object, String],
        },
    },
};
</script>
