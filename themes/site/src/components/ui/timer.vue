<script>
import { formatTime } from '@/app/utils/string';

export default {
    render(h, context) {
        const { time } = context.props;

        return <div class="font-thin text-4xl text-grey-dark">
            {formatTime(time)}
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
