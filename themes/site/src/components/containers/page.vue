<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { padded } = context.props;

        // padded
        if (padded) {
            bindings.class.push('px-4 md:px-8');
        }

        return <main class="trans-padding" role="main" {...bindings}>
            {context.slots().default}
        </main>;
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
