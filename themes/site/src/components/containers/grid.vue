<style lang="scss" scoped>
    .v-grid-padded {
        margin: -1rem;

        /deep/ > .v-grid-cell {
            padding: 1rem;
        }
    }
</style>

<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { padded } = context.props;

        if (padded) {
            bindings.class.push('v-grid-padded');
        }

        return <div class="v-grid flex flex-wrap" {...bindings}>
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
