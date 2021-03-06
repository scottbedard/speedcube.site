import alertComponent from './ui/alert.vue';
import avatarComponent from './ui/avatar.vue';
import buttonComponent from './ui/button.vue';
import cardComponent from './ui/card.vue';
import cardLinkComponent from './ui/card_link.vue';
import checkboxComponent from './ui/checkbox.vue';
import collapseTransitionComponent from './transitions/collapse.vue';
import colorInputComponent from './ui/color_input.vue';
import commentsComponent from './ui/comments.vue';
import countdownComponent from './ui/countdown.vue';
import cubeColorPickerComponent from './ui/cube_color_picker.vue';
import dateInputComponent from './ui/date_input.vue';
import doughnutChartComponent from './charts/doughnut_chart.vue';
import errorMessageComponent from './ui/error_message.vue';
import fadeTransitionComponent from './transitions/fade.vue';
import formComponent from './ui/form.vue';
import formFieldComponent from './ui/form_field.vue';
import gridCellComponent from './containers/grid_cell.vue';
import gridComponent from './containers/grid.vue';
import inputComponent from './ui/input.vue';
import marginComponent from './containers/margin.vue';
import modalComponent from './ui/modal.vue';
import numberTransitionComponent from './transitions/number.vue';
import pageComponent from './containers/page.vue';
import rangeInputComponent from './ui/range_input.vue';
import scatterChartComponent from './charts/scatter_chart.vue';
import selectComponent from './ui/select.vue';
import spinnerComponent from './ui/spinner.vue';
import stopwatchComponent from './ui/stopwatch.vue';
import switchComponent from './ui/switch.vue';
import tableComponent from './ui/table/table.vue';
import textareaComponent from './ui/textarea.vue';
import timerComponent from './ui/timer.vue';
import uploadButtonComponent from './ui/upload_button.vue';

export default {
    //
    // charts
    //
    'v-doughnut-chart': doughnutChartComponent,
    'v-scatter-chart': scatterChartComponent,

    //
    // containers
    //
    'v-grid': gridComponent,
    'v-grid-cell': gridCellComponent,
    'v-margin': marginComponent,
    'v-page': pageComponent,

    //
    // transitions
    //
    'v-collapse-transition': collapseTransitionComponent,
    'v-fade-transition': fadeTransitionComponent,
    'v-number-transition': numberTransitionComponent,

    //
    // ui
    //
    'v-alert': alertComponent,
    'v-avatar': avatarComponent,
    'v-button': buttonComponent,
    'v-card': cardComponent,
    'v-card-link': cardLinkComponent,
    'v-checkbox': checkboxComponent,
    'v-color-input': colorInputComponent,
    'v-comments': commentsComponent,
    'v-countdown': countdownComponent,
    'v-cube-color-picker': cubeColorPickerComponent,
    'v-date-input': dateInputComponent,
    'v-error-message': errorMessageComponent,
    'v-form': formComponent,
    'v-form-field': formFieldComponent,
    'v-input': inputComponent,
    'v-modal': modalComponent,
    'v-range-input': rangeInputComponent,
    'v-select': selectComponent,
    'v-spinner': spinnerComponent,
    'v-stopwatch': stopwatchComponent,
    'v-switch': switchComponent,
    'v-table': tableComponent,
    'v-textarea': textareaComponent,
    'v-timer': timerComponent,
    'v-upload-button': uploadButtonComponent,
};
