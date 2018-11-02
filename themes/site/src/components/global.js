import buttonComponent from './ui/button.vue';
import cardComponent from './ui/card.vue';
import collapseTransitionComponent from './transitions/collapse.vue';
import fadeTransitionComponent from './transitions/fade.vue';
import gridComponent from './containers/grid.vue';
import gridCellComponent from './containers/grid_cell.vue';
import inputComponent from './ui/input.vue';
import marginComponent from './containers/margin.vue';

export default {
    //
    // containers
    //
    'v-grid': gridComponent,
    'v-grid-cell': gridCellComponent,
    'v-margin': marginComponent,

    //
    // transitions
    //
    'v-collapse-transition': collapseTransitionComponent,
    'v-fade-transition': fadeTransitionComponent,

    //
    // ui
    //
    'v-button': buttonComponent,
    'v-card': cardComponent,
    'v-input': inputComponent,
};
