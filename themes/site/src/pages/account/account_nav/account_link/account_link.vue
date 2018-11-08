<style lang="scss" scoped>
    a + a {
        border-top: 1px solid config('colors.grey-lighter');
    }
</style>

<script>
export default {
    render(h, context) {
        const { icon, to } = context.props;
        const currentRoute = context.parent.$route.name;

        const classes = [
            'block',
            'border-l-2',
            'flex',
            'h-12',
            'items-center',
            'px-4',
            'trans-border',
            'trans-color',
            'hover:no-underline',
            'hover:text-blue-dark',
        ];
        
        // active / inactive
        if (currentRoute === to.name) {
            classes.push('border-blue text-blue');
        } else {
            classes.push('border-grey-lighter text-grey-dark');
        }

        return <router-link class={classes} to={to}>
            <i class={['fa mr-4 text-center text-md w-5', icon]} />
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
