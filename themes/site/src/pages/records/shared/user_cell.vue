<script>
import moment from 'moment';
import { timestampFormat } from '@/app/constants';

export default {
    render(h, context) {
        const { row, value } = context.props;

        return <div>
            <div class="font-bold mb-2">
                { value ? value.username : 'Guest' }
            </div>
            <div class="font-light text-xs text-grey-7">
                { moment(row.createdAt, timestampFormat).format('MMMM Do, YYYY') }
            </div>
        </div>;
    },
    functional: true,
    props: [
        'row',
        'value',
    ],
};
</script>
