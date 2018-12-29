<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);

        return <div
            class="leading-normal text-danger-7 text-sm"
            {...bindings}>
            {context.slots().default}
        </div>;
    },
    functional: true,
};
</script>
