<style lang="scss" scoped>
    a + a {
        margin-top: 1rem;
    }
</style>

<script>
export default {
    render(h, context) {
        const { to } = context.props;

        return <router-link
            class="block px-6 hover:underline"
            to={to}>
            {context.slots().default}
        </router-link>;
    },
    functional: true,
    props: [
        'to',
    ],
};
</script>
