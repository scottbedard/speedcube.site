<script>
import { Scatter, mixins } from 'vue-chartjs';

export default {
    extends: Scatter,
    mixins: [
        mixins.reactiveProp,
    ],
    props: [
        'chartData',
        'options',
    ],
    mounted() {
        this.renderChart(this.chartData, this.options);
    },
};
</script>
