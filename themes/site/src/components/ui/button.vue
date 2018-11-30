<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { disabled, loading, primary, size } = context.props;

        // append size classes
        if (size === 'sm') {
            bindings.class.push('v-button-sm px-4 text-xs');
        } else if (size === 'md') {
            bindings.class.push('v-button-md h-12 px-8 text-sm');
        }

        // disabled
        if (disabled) {
            bindings.class.push('opacity-60 pointer-events-none');
        }

        // loading
        if (loading) {
            bindings.class.push('pointer-events-none');
        }

        // primary
        if (primary) {
            bindings.class.push('border-grey-dark text-grey-dark focus:border-primary focus:text-primary hover:border-primary hover:text-primary');
        } else {
            bindings.class.push('border-grey-dark text-grey-dark hover:border-grey-darker hover:text-grey-darker');
        }

        return <button
            class="border-2 cursor-pointer font-bold inline-flex items-center rounded tracking-wide uppercase focus:outline-none"
            {...bindings}>
            {
                loading
                    ? <v-spinner color="grey-dark" size="sm" />
                    : context.slots().default
            }
        </button>;
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
        primary: {
            default: false,
            type: Boolean,
        },
        size: {
            default: 'md',
            type: String,
        },
    },
};
</script>
