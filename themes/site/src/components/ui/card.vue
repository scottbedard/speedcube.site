<style lang="scss" scoped>
    .v-card {
        /deep/ .v-input > div {
            box-shadow: none;
            background-color: config('colors.grey-lighter');

            input:-webkit-autofill {
                -webkit-box-shadow: 0 0 0 30px config('colors.grey-lighter') inset;
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
            bindings.class.push('p-4');
        }

        return <div class="v-card bg-white rounded shadow" {...bindings}>
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
