<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { primary, size } = context.props;

        // append size classes
        if (size === 'sm') {
            bindings.class.push('v-button-sm p-2 text-xs');
        } else if (size === 'md') {
            bindings.class.push('v-button-md p-4 text-sm');
        }

        // primary
        if (primary) {
            bindings.class.push('bg-blue-darker text-grey-lightest hover:bg-blue-darkest hover:text-white');
        } else {
            bindings.class.push('bg-grey-light text-grey-darker hover:bg-grey hover:text-grey-darkest');
        }

        return <button
            class="cursor-pointer font-bold rounded tracking-wide trans-bg trans-color uppercase focus:outline-none"
            {...bindings}>
            {context.slots().default}
        </button>;
    },
    functional: true,
    props: {
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
