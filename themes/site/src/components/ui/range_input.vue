<script>
import { bindAll } from 'spyfu-vue-functional';
import { isFunction } from 'lodash-es';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { value } = context.props;

        // interface with v-model
        if (isFunction(context.listeners.input)) {
            bindings.on.input = e => context.listeners.input(Number(e.target.value));
        }

        return <input
            domPropsValue={value}
            {...bindings}
        />
    },
    functional: true,
    props: {
        value: {
            default: 0,
            type: Number,
        },
    },
};
</script>
