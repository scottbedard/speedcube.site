/* eslint-disable */
import axios from 'axios';
import merge from 'deepmerge';
import boot from '@/app/boot';
import modules from '@/app/store';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import routes from '@/app/routes';
import { get, isFunction, noop } from 'lodash-es';
import { when } from 'jest-when';
import { createLocalVue, mount as testUtilsMount } from '@vue/test-utils';

// axios is mocked globally throughout our application
// if you import axios in a test, you will actually
// get one of these mock implementations instead.
jest.mock('axios');

axios.mockImplementation(function () {
    this.prototype.delete = jest.fn();
    this.prototype.get = jest.fn();
    this.prototype.patch = jest.fn();
    this.prototype.post = jest.fn();
    this.prototype.put = jest.fn();
});

//
// click an element
//
global.click = function click(el) {
    if (typeof el.click === 'function') {
        el.click();
    } else {
        global.simulate('click', el);
    }
};

//
// vue factory
//
function findModule(store, namespace) {
    return namespace.split('/').reduce((obj, key) => {
        // root modules will exist directly on the store
        if (obj && obj[key]) {
            return obj[key];
        }

        // child stores will exist in a modules object
        if (obj && obj.modules && obj.modules[key]) {
            return obj.modules[key];
        }

        // if we couldn't find the module, throw an error
        // istanbul ignore next
        throw new Error(`Could not find module "${namespace}" in store.`);
    }, store);
}

function normalizeModules(modules) {
    const normalized = {};

    Object.keys(modules).forEach((key) => {
        const module = modules[key];

        // make sure each vuex module has all keys defined
        normalized[key] = {
            actions: module.actions || {},
            getters: module.getters || {},
            modules: module.modules ? normalizeModules(module.modules) : {},
            mutations: module.mutations || {},
            namespaced: module.namespaced || false,
            state: {},
        };

        // make sure our state is a fresh object
        if (typeof module.state === 'function') {
            normalized[key].state = module.state();
        } else if (typeof module.state === 'object') {
            normalized[key].state = JSON.parse(JSON.stringify(module.state));
        }
    });

    return normalized;
}

function mergeTestState(modules, state) {
    Object.keys(state).forEach((key) => {
        const module = findModule(modules, key);

        if (module) {
            module.state = merge(module.state, state[key]);
        }
    });

    return modules;
}

global.mount = function mount(options, initialState = {}) {
    const localVue = createLocalVue();

    boot(localVue);

    function walk(children) {
        return children.reduce((acc, route) => {
            if (typeof route.name === 'string') {
                acc.push({
                    ...route,
                    beforeEnter: undefined,
                    component: { render: noop },
                });
            }

            if (Array.isArray(route.children)) {
                acc.push(...walk(route.children));
            }

            return acc;
        }, []);
    }

    const store =  new Vuex.Store({
        modules: mergeTestState(normalizeModules(modules), initialState),
    });

    const router = new VueRouter({
        mode: 'abstract',
        routes: walk(routes(store)),
    });

    // sync(store, router);

    return testUtilsMount({
        router,
        store,
        ...options,
    }, { localVue });
}

//
// simulate an input event
//
global.input = function (value, el, setupFn) {
    return global.simulate('input', el, (e) => {
        e.target.value = value;

        if (setupFn) {
            setupFn(e);
        }
    });
};

//
// no-op
//
global.noop = noop;

//
// prevent store interactions before a component is mounted
//
window.preventInitialActions = function (vm) {
    const dispatch = jest.spyOn(vm.$store, 'dispatch');

    vm.$once('hook:mounted', dispatch.mockRestore);
};

global.preventInitialMutations = function (vm) {
    const commit = jest.spyOn(vm.$store, 'commit');

    vm.$once('hook:mounted', commit.mockRestore);
};

global.preventInitialization = function (vm) {
    global.preventInitialActions(vm);
    global.preventInitialMutations(vm);
};

//
// simulate an event
//
global.simulate = function (name, el, setupFn, val) {
    const event = new Event(name);

    Object.defineProperty(event, 'target', {
        value: el,
        enumerable: true,
    });

    if (setupFn) {
        setupFn(event);
    }

    return el.dispatchEvent(event);
};

//
// stub xhr requests
//
global.stubRequests = function (requests = {}) {
    requests = {
        delete: {},
        get: {},
        patch: {},
        post: {},
        put: {},
        ...requests,
    };

    Object.keys(requests).forEach((method) => {
        Object.keys(requests[method]).forEach((endpoint) => {
            const fixture = get(requests, `${method}[${endpoint}]`);
            const response = isFunction(fixture) ? fixture() : fixture;

            when(axios[method])
                .calledWith(endpoint)
                .mockImplementation(() => {
                    return typeof response === 'boolean'
                        ? (response ? Promise.resolve({ data: {} }) : Promise.reject())
                        : Promise.resolve({ data: response });
                });
        });
    });
};

//
// submit a form
//
global.submit = function (el, setupFn) {
    global.simulate('submit', el, setupFn);
};

//
// timeout
//
global.timeout = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

//
// user
//
global.user = function() {
    return {  
        activatedAt: '2019-03-26 18:15:03',
        avatar: null,
        configs: [],
        createdAt: '2019-03-26 18:15:03',
        deletedAt: null,
        email: 'user@example.com',
        id: 1,
        isActivated: true,
        isGuest: 0,
        isSuperuser: 0,
        keyboardConfigs: [],
        lastLogin: '2019-06-22 20:03:15',
        lastSeen: '2019-06-22 21:30:11',
        name: null,
        permissions: null,
        profile: {
            id: 2,
            userId: 2,
            twitterBroadcasting: false,
            twitterHandle: '',
            createdAt: '2019-06-22 21:15:44',
            updatedAt: '2019-06-22 21:15:44',
        } ,
        surname: null,
        updatedAt: '2019-06-22 20:03:15',
        username: 'scott',
    }
}