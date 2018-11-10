import alertComponent from './ui/alert.vue';
import buttonComponent from './ui/button.vue';
import cardComponent from './ui/card.vue';
import checkboxComponent from './ui/checkbox.vue';
import collapseTransitionComponent from './transitions/collapse.vue';
import errorMessageComponent from './ui/error_message.vue';
import fadeTransitionComponent from './transitions/fade.vue';
import formComponent from './ui/form.vue';
import formFieldComponent from './ui/form_field.vue';
import gridCellComponent from './containers/grid_cell.vue';
import gridComponent from './containers/grid.vue';
import inputComponent from './ui/input.vue';
import marginComponent from './containers/margin.vue';
import puzzleComponent from './puzzle/puzzle.vue';

export default {
    //
    // containers
    //
    'v-grid': gridComponent,
    'v-grid-cell': gridCellComponent,
    'v-margin': marginComponent,

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
    'v-button': buttonComponent,
    'v-card': cardComponent,
    'v-checkbox': checkboxComponent,
    'v-error-message': errorMessageComponent,
    'v-form': formComponent,
    'v-form-field': formFieldComponent,
    'v-input': inputComponent,
};
