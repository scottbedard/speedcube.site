<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { to } = context.props;

        return <router-link
            class="block px-6 py-4 trans-bg hover:bg-grey-4"
            to={to}
            {...bindings}>
            {context.slots().default}
        </router-link>;
    },
    functional: true,
    props: {
        to: {
            required: true,
            type: Object,
        },
    },
};
</script>
