/* eslint-disable */
import Vue from 'vue/dist/vue.common.js';
import VueRuntime from 'vue/dist/vue.runtime.common.dev.js';
import axios from 'axios';
import boot from '@/app/boot';
import modules from '@/app/store';
import routes from '@/app/routes';
import { factory as spyfuVueFactory } from 'spyfu-vue-factory';
import { get, isFunction } from 'lodash-es';
import { when } from 'jest-when';

// these functions are exposed globally to aid in
// common testing tasks. they are designed to have
// our tests mimick the actual usage of the component.
// as an example of this, we render using dom apis.
//
// const vm = mount({
//     template: `<some-awesome-component />`,
// });
//
// the goal, is to have tests that not only feel more
// natural, but also double as examples of our to use
// the various components.

// ignore warnings that dont apply in tests
VueRuntime.config.productionTip = false;
VueRuntime.config.devtools = false;

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
// create a vue factory
//
global.factory = function factory(options = {}) {
    boot(Vue);

    function walk(children) {
        return children.reduce((acc, route) => {
            if (typeof route.name === 'string') {
                acc.push(route.name);
            }

            if (Array.isArray(route.children)) {
                acc.push(...walk(route.children));
            }

            return acc;
        }, []);
    }

    const vm = spyfuVueFactory({
        Vue,
        modules,
        routes: walk(routes()),
        ...options,
    });

    // @todo: figure out if theres a way to hook into
    // the end of the test so we can dispose of this vm

    return vm;
};

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
// default mount function
//
global.mount = global.factory();

//
// no-op
//
global.noop = () => {};

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
                .mockReturnValue(
                    typeof response === 'boolean'
                        ? (response ? Promise.resolve({ data: {} }) : Promise.reject())
                        : Promise.resolve({ data: response }),
                );
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