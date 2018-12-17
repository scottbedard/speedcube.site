import navComponent from './nav/nav.vue';

export default {
    nav: navComponent,
    puzzles: () => import('./puzzles/puzzles.vue' /* webpackChunkName: 'sidebarPuzzles' */),
}
