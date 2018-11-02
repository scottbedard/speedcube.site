import defaultLayoutComponent from '@/layouts/default/default.vue';

export default [

    //
    // default layout
    //
    {
        children: [
            //
            // components
            //
            {
                name: 'components',
                path: '/components',
                component: () => import('@/pages/components/components.vue' /* webpackChunkName: "components" */),
            },

            //
            // home
            //
            {
                name: 'home',
                path: '/',
                component: () => import('@/pages/home/home.vue' /* webpackChunkName: "home" */),
            },

            //
            // signin
            //
            {
                meta: {
                    auth: false,
                },
                name: 'signin',
                path: '/signin',
                component: () => import('@/pages/signin/signin.vue' /* webpackChunkName: "signin" */),
            },
        ],
        path: '',
        component: defaultLayoutComponent,
    },
];
