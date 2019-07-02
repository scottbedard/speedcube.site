<style lang="scss" scoped>
    .v-card-link + .v-card-link{
        border-top: 1px solid theme('colors.grey-2');
    }
</style>

<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { to } = context.props;

        return <router-link
            class="v-card-link block px-6 py-4 trans-bg hover:bg-grey-4"
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
