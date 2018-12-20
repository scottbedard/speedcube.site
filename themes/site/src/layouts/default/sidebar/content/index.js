export default {
    customize: () => import('./customize/customize.vue' /* webpackChunkName: 'sidebarCustomize' */),
    puzzles: () => import('./puzzles/puzzles.vue' /* webpackChunkName: 'sidebarPuzzles' */),
}
