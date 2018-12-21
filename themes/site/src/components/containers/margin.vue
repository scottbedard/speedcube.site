<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { dark, padded } = context.props;

        if (padded) {
            bindings.class.push('px-6 trans-padding md:px-8');
        }

        return <div
            class="max-w-4xl mx-auto"
            {...bindings}>
            {context.slots().default}
        </div>;
    },
    functional: true,
    props: {
        padded: {
            default: false,
            type: Boolean,
        },
    },
};
</script>
