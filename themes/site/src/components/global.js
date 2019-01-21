import alertComponent from './ui/alert.vue';
import avatarComponent from './ui/avatar.vue';
import buttonComponent from './ui/button.vue';
import cardComponent from './ui/card.vue';
import cardLinkComponent from './ui/card_link.vue';
import checkboxComponent from './ui/checkbox.vue';
import collapseTransitionComponent from './transitions/collapse.vue';
import countdownComponent from './ui/countdown.vue';
import cubeColorPickerComponent from './ui/cube_color_picker.vue';
import doughnutChartComponent from './charts/doughnut_chart.vue';
import errorMessageComponent from './ui/error_message.vue';
import fadeTransitionComponent from './transitions/fade.vue';
import formComponent from './ui/form.vue';
import formFieldComponent from './ui/form_field.vue';
import gridCellComponent from './containers/grid_cell.vue';
import gridComponent from './containers/grid.vue';
import inputComponent from './ui/input.vue';
import marginComponent from './containers/margin.vue';
import pageComponent from './containers/page.vue';
import puzzleComponent from './puzzle/puzzle.vue';
import scatterChartComponent from './charts/scatter_chart.vue';
import selectComponent from './ui/select.vue';
import spinnerComponent from './ui/spinner.vue';
import tableComponent from './ui/table.vue';
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
    // puzzle
    //
    'v-puzzle': puzzleComponent,

    //
    // transitions
    //
    'v-collapse-transition': collapseTransitionComponent,
    'v-fade-transition': fadeTransitionComponent,

    //
    // ui
    //
    'v-alert': alertComponent,
    'v-avatar': avatarComponent,
    'v-button': buttonComponent,
    'v-card': cardComponent,
    'v-card-link': cardLinkComponent,
    'v-checkbox': checkboxComponent,
    'v-countdown': countdownComponent,
    'v-cube-color-picker': cubeColorPickerComponent,
    'v-error-message': errorMessageComponent,
    'v-form': formComponent,
    'v-form-field': formFieldComponent,
    'v-input': inputComponent,
    'v-select': selectComponent,
    'v-spinner': spinnerComponent,
    'v-table': tableComponent,
    'v-timer': timerComponent,
    'v-upload-button': uploadButtonComponent,
};
