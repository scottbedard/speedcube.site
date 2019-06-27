<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { padded } = context.props;

        if (padded) {
            bindings.class.push('px-4 trans-padding md:px-6');
        }

        return <div
            class="max-w-6xl mx-auto"
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
