<style lang="scss" scoped>
    a + a {
        margin-top: 1rem;
    }
</style>

<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { icon } = context.props;

        return <a
            class="flex items-center text-sm text-grey-dark"
            href="#"
            {...bindings}>
            <i class={`fa ${icon} inline-block mr-2 text-center w-6`} />
            {context.slots().default}
        </a>;
    },
    functional: true,
    props: [
        'icon',
    ],
};
</script>
