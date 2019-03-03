<script>
import { bindAll } from 'spyfu-vue-functional';
import { queryElementThen } from '@/app/utils/dom';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { accept, outlined, primary, size } = context.props;

        function onChange(e) {
            if (context.listeners.change) {
                context.listeners.change(e.target.files[0]);
            }
        }

        function onClick(e) {
            queryElementThen(e.target, 'input[type="file"]', el => el.click());
        }

        if (context.listeners.change) {
            delete bindings.on.change;
        }

        return <v-button
            outlined={outlined}
            primary={primary}
            size={size}
            tag="label"
            onClick={onClick}
            {...bindings}>
            <input
                accept={accept}
                class="hidden"
                type="file"
                onChange={onChange}
            />
            {context.slots().default}
        </v-button>;
    },
    functional: true,
    model: {
        event: 'change',
    },
    props: {
        accept: {
            default: '',
            type: String,
        },
        outlined: {
            type: Boolean,
        },
        primary: {
            type: Boolean,
        },
        size: {
            type: String,
        },
    },
};
</script>
