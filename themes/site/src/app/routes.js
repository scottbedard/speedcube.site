import defaultLayoutComponent from '@/layouts/default/default.vue';
import store from './store/store';

export default [

    //
    // default layout
    //
    {
        children: [

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
                meta: {
                    auth: false,
                },
                name: 'home',
                path: '/home',
                component: () => import('@/pages/home/home.vue' /* webpackChunkName: "home" */),
            },

            //
            // index
            //
            {
                path: '/',
                redirect: '/solve',
            },

            //
            // records
            //
            {
                name: 'records',
                path: '/records/:puzzle',
                component: () => import('@/pages/records/records.vue' /* webpackChunkName: "records" */),
            },

            //
            // replay
            //
            {
                name: 'replay',
                path: '/replay/:id',
                component: () => import('@/pages/replay/replay.vue' /* webpackChunkName: "replay" */),
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

            //
            // solve
            //
            {
                name: 'solve',
                path: 'solve/:puzzle',
                component: () => import('@/pages/solve/solve.vue' /* webpackChunkName: "solve" */),
            },

            {
                path: '/solve',
                redirect: '/solve/3x3',
            },

            //
            // users
            //
            {
                name: 'users',
                path: 'users/:username',
                component: () => import('@/pages/users/user/user.vue' /* webpackChunkName: "user" */),
            },
        ],
        path: '',
        component: defaultLayoutComponent,
    },
];
