<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const slots = context.slots();
        const { type } = context.props;

        // types
        if (type === 'success') {
            bindings.class.push('border-green');
        } else if (type === 'error') {
            bindings.class.push('border-red');
        }

        return <v-card>
            <div class="p-4" {...bindings}>
                {slots.default}
            </div>
        </v-card>;
    },
    functional: true,
    props: {
        type: {
            type: String,
        },
    },
};
</script>
