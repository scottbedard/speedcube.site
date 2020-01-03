import defaultLayoutComponent from '@/layouts/default/default.vue';

export default function (store) {
    return [
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
                            name: 'account:notifications',
                            path: 'notifications',
                            component: () => import('@/pages/account/notifications/notifications.vue' /* webpackChunkName: "accountNotifications" */),
                        },
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
                // forgot password
                //
                {
                    meta: {
                        auth: false,
                    },
                    name: 'forgot-password',
                    path: '/forgot-pasesword',
                    component: () => import('@/pages/forgot_password/forgot_password.vue' /* webpackChunkName: "forgotPassword" */),
                },

                //
                // home
                //
                {
                    beforeEnter(to, from, next) {
                        if (store.getters['user/isAuthenticated']) {
                            next({ name: 'solve', params: { puzzle: '3x3' } });
                        } else {
                            next();
                        }
                    },
                    meta: {
                        auth: false,
                    },
                    name: 'home',
                    path: '/',
                    component: () => import('@/pages/home/home.vue' /* webpackChunkName: "home" */),
                },

                //
                // records
                //
                {
                    name: 'records',
                    path: '/records',
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
                // reset password
                //
                {
                    meta: {
                        auth: false,
                    },
                    name: 'reset-password',
                    path: '/reset-password',
                    component: () => import('@/pages/reset_password/reset_password.vue' /* webpackChunkName: "resetPassword" */),
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
                // terms
                //
                {
                    name: 'terms',
                    path: '/terms',
                    component: () => import('@/pages/terms/terms.vue' /* webpackChunkName: "terms" */),
                },

                //
                // training
                //
                {
                    name: 'training',
                    path: '/training',
                    component: () => import('@/pages/training/browse/browse.vue' /* webpackChunkName: "trainingBrowse" */),
                },

                {
                    name: 'trainingAdd',
                    path: '/training/add',
                    component: () => import('@/pages/training/add/add.vue' /* webpackChunkName: "trainingAdd" */),
                },

                //
                // users
                //
                {
                    name: 'users',
                    path: '/users',
                    component: () => import('@/pages/users/users.vue' /* webpackChunkName: "users" */),
                },

                //
                // user
                //
                {
                    name: 'users:show',
                    path: 'users/:username',
                    component: () => import('@/pages/users/user/user.vue' /* webpackChunkName: "user" */),
                },

                //
                // 404
                //
                {
                    name: '404',
                    path: '*',
                    component: () => import('@/pages/404/404.vue' /* webpackChunkName: "404" */),
                },
            ],
            path: '',
            component: defaultLayoutComponent,
        },
    ];
}
