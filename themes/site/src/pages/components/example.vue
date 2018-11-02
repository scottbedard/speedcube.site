<style lang="scss" scoped>
    section {
        /deep/ > div > p {
            margin-bottom: 1rem;
        }
    }
</style>

<script>
export default {
    render(h, context) {
        const { title } = context.props;
        const slots = context.slots();

        return <section>
            <h3 class="font-mono font-thin mb-4">
                {title}
            </h3>
            <div>
                {slots.default}
            </div>
        </section>;
    },
    functional: true,
    props: {
        title: {
            type: String,
        },
    },
};
</script>
