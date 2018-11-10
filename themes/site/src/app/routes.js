import defaultLayoutComponent from '@/layouts/default/default.vue';

export default [

    //
    // default layout
    //
    {
        children: [
            //
            // 2x2
            //
            {
                meta: {
                    cubeSize: 2,
                },
                name: 'puzzle:2',
                path:'2x2',
                component: () => import('@/pages/puzzle/puzzle.vue' /* webpackChunkName: "puzzle" */),
            },

            //
            // 3x3
            //
            {
                meta: {
                    cubeSize: 3,
                },
                name: 'puzzle:3',
                path:'3x3',
                component: () => import('@/pages/puzzle/puzzle.vue' /* webpackChunkName: "puzzle" */),
            },

            //
            // 4x4
            //
            {
                meta: {
                    cubeSize: 4,
                },
                name: 'puzzle:4',
                path:'4x4',
                component: () => import('@/pages/puzzle/puzzle.vue' /* webpackChunkName: "puzzle" */),
            },

            //
            // 5x5
            //
            {
                meta: {
                    cubeSize: 5,
                },
                name: 'puzzle:5',
                path:'5x5',
                component: () => import('@/pages/puzzle/puzzle.vue' /* webpackChunkName: "puzzle" */),
            },

            //
            // account
            //
            {
                children: [
                    {
                        meta: {
                            auth: true,
                        },
                        name: 'account:profile',
                        path: 'profile',
                        component: () => import('@/pages/account/profile/profile.vue' /* webpackChunkName: "accountProfile" */),
                    },
                    {
                        meta: {
                            auth: true,
                        },
                        name: 'account:security',
                        path: 'security',
                        component: () => import('@/pages/account/security/security.vue' /* webpackChunkName: "accountSecurity" */),
                    },
                ],
                meta: {
                    auth: true,
                },
                path: '/account',
                component: () => import('@/pages/account/account.vue' /* webpackChunkName: "account" */),
            },

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
                component: () => import('@/pages/signout/signout.vue' /* webpackChunkName: "signout" */),
            },
        ],
        path: '',
        component: defaultLayoutComponent,
    },
];
