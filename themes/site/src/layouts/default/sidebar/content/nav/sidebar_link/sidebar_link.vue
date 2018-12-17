<style lang="scss" scoped>
    a {
        &.router-link-active {
            // ...
        }
        
        &:hover i {
            color: config('colors.grey-8');
        } 
    }

    a + a {
        margin-top: 0.25rem;
    }
</style>

<script>
import { bindAll } from 'spyfu-vue-functional';
import { isFunction } from 'lodash-es';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { copy, icon, to } = context.props;

        // classes
        bindings.class.push(
            'flex font-bold h-10 items-center pr-4 rounded text-sm tracking-wide trans-bg trans-color text-grey-7 hover:bg-grey-4 hover:text-grey-9'
        );

        // use a <router-link> or an <a> tag
        const Tag = to ? 'router-link' : 'a';

        if (isFunction(bindings.on.click)) {
            bindings.attrs.href = '#';

            bindings.on.click = e => {
                e.preventDefault();

                context.listeners.click();
            }
        }

        return <Tag
            to={to}
            {...bindings}>
            <i class={[
                icon,
                'fa inline-block text-center text-grey-6 text-lg trans-color w-12',
            ]} />
            {copy}
        </Tag>;
    },
    functional: true,
    props: [
        'copy',
        'icon',
        'to',
    ],
};
</script>
