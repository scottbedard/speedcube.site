<style lang="scss" scoped>
    a + a {
        border-top: 1px solid config('colors.grey-lighter');
    }
</style>

<script>
export default {
    render(h, context) {
        const { icon, to } = context.props;

        return <router-link
            active-class="border-blue"
            class="block border-l-2 border-white flex h-12 items-center hover:no-underline px-6 trans-border trans-color hover:text-blue-dark"
            to={to}>
            <i class={['fa mr-2 text-center w-5', icon]} />
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
