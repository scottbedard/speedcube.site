<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { size } = context.props;

        // append size classes
        if (size === 'sm') {
            bindings.class.push('v-button-sm p-2 text-xs');
        } else if (size === 'md') {
            bindings.class.push('v-button-md p-4 text-sm');
        }

        return <button
            class="border bg-grey-light cursor-pointer font-bold rounded text-grey-dark shadow tracking-wide transition-bg transition-color uppercase focus:outline-none hover:bg-grey hover:text-grey-darkest"
            {...bindings}>
            {context.slots().default}
        </button>;
    },
    functional: true,
    props: {
        size: {
            default: 'md',
            type: String,
        },
    },
};
</script>
