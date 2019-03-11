<style lang="scss" scoped>
    .v-card {
        /deep/ > .v-table tr {
            td:first-child, th:first-child {
                @apply pl-6;
            }

            td:last-child, th:last-child {
                @apply pr-6;
            }
        }
    }
</style>

<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { padded } = context.props;

        // padding
        if (padded) {
            bindings.class.push('px-8 py-10');
        }

        return <div class="v-card bg-grey-3 overflow-hidden rounded shadow-sm" {...bindings}>
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
