<script>
import { bindClasses } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const { icon, to } = context.props;
        const currentRoute = context.parent.$route.name;
        const bindings = bindClasses(context);

        // active / inactive
        if (currentRoute === to.name) {
            bindings.class.push('border-primary text-primary hover:text-primary');
        } else {
            bindings.class.push('border-grey-darker text-grey hover:text-grey-darker');
        }

        return <router-link
            class="block border-l-2 flex items-center trans-color p-4 hover:no-underline"
            to={to}
            {...bindings}>
            <i class={['fa mr-4 text-center text-lg w-5', icon]} />
            {context.slots().default}
        </router-link>;
    },
    functional: true,
    props: [
        'icon',
        'to',
    ],
};
</script>
