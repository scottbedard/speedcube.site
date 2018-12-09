import alertComponent from './ui/alert.vue';
import buttonComponent from './ui/button.vue';
import cardComponent from './ui/card.vue';
import checkboxComponent from './ui/checkbox.vue';
import collapseTransitionComponent from './transitions/collapse.vue';
import countdownComponent from './ui/countdown.vue';
import cubeColorPickerComponent from './ui/cube_color_picker.vue';
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
import puzzleControllerComponent from './puzzle/controller.vue';
import spinnerComponent from './ui/spinner.vue';
import tableComponent from './ui/table.vue';
import timerComponent from './ui/timer.vue';

export default {
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
    'v-puzzle-controller': puzzleControllerComponent,

    //
    // transitions
    //
    'v-collapse-transition': collapseTransitionComponent,
    'v-fade-transition': fadeTransitionComponent,

    //
    // ui
    //
    'v-alert': alertComponent,
    'v-button': buttonComponent,
    'v-card': cardComponent,
    'v-checkbox': checkboxComponent,
    'v-countdown': countdownComponent,
    'v-cube-color-picker': cubeColorPickerComponent,
    'v-error-message': errorMessageComponent,
    'v-form': formComponent,
    'v-form-field': formFieldComponent,
    'v-input': inputComponent,
    'v-spinner': spinnerComponent,
    'v-table': tableComponent,
    'v-timer': timerComponent,
};
