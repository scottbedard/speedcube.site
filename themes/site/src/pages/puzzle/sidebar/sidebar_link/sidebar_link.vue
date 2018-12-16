<style lang="scss" scoped>
    a {
        .copy {
            opacity: 0;
        }

        &:hover .copy {
            opacity: 100;
        }
    }
    
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
            class="text-grey-6"
            href="#"
            {...bindings}>
            <span class="bg-grey-3 h-8 inline-flex items-center justify-center mr-2 rounded-full w-8">
                <i class={`fa ${icon}`} />
            </span>
            <span class="copy text-xs tracking-wide trans-opacity trans-transform uppercase">
                {context.slots().default}
            </span>
        </a>;
    },
    functional: true,
    props: [
        'icon',
    ],
};
</script>
