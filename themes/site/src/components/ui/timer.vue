<script>
export default {
    render(h, context) {
        const { time } = context.props;

        const min = Math.floor(time / 60000);
        const sec = (Math.floor(time / 1000) % 60).toString().padStart(2, '0');
        const ms = (time % 1000).toString().padStart(2, '0').slice(0, 2);

        return <div class="font-thin text-4xl text-grey-dark">
            {`${min}:${sec}.${ms}`}
        </div>;
    },
    functional: true,
    props: {
        time: {
            default: 0,
            type: Number,
        },
    },
};
</script>
