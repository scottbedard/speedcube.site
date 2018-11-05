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
            // create account
            //
            {
                meta: {
                    auth: false,
                },
                name: 'create-account',
                path: '/create-account',
                component: () => import('@/pages/create_account/create_account.vue' /* webpackChunkName: "createAccount" */),
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

            //
            // signout
            //
            {
                name: 'signout',
                path: '/signout',
                component: () => import('@/pages/signout/signout.vue', /* webpackChunkName: "signout" */),
            },
        ],
        path: '',
        component: defaultLayoutComponent,
    },
];
