import Vue from 'vue/dist/vue.common.js';
import axios from 'axios';
import boot from '@/app/boot';
import modules from '@/app/store';
import routes from '@/app/routes';
import { factory as spyfuVueFactory } from 'spyfu-vue-factory';
import { get, isFunction } from 'lodash-es';
import { when } from 'jest-when';

Vue.config.productionTip = false;
Vue.config.devtools = false;
// //
// // test sandbox
// // these are reset after each test
// //
// window.sandbox = sinon.createSandbox();
// window.spy = sandbox.spy;
// window.stub = sandbox.stub;

//
// mock axios
//
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
        simulate('click', el);
    }
}

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

    return spyfuVueFactory({
        Vue,
        modules,
        routes: walk(routes()),
        ...options,
    });
}

//
// simulate an input event
//
global.input = function (value, el) {
    el.value = value;

    return simulate('input', el);
}

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
    const dispatch = stub(vm.$store, 'dispatch');

    vm.$once('hook:mounted', dispatch.restore);
};

global.preventInitialMutations = function (vm) {
    const commit = stub(vm.$store, 'commit');

    vm.$once('hook:mounted', commit.restore);
};

global.preventInitialization = function (vm) {
    global.preventInitialActions(vm);
    global.preventInitialMutations(vm);
};

//
// simulate an event
//
global.simulate = function (name, el, setupFn) {
    const e = new Event(name);

    if (setupFn) {
        setupFn(e);
    }

    return el.dispatchEvent(e);
};

//
// stub xhr requests
//
global.stubRequests = function(requests = {}) {
    requests = {
        delete: {},
        get: {},
        patch: {},
        post: {},
        put: {},
        ...requests,
    }

    Object.keys(requests).forEach(method => {
        Object.keys(requests[method]).forEach(endpoint => {
            const fixture = get(requests, `${method}[${endpoint}]`);
            const response = isFunction(fixture) ? fixture() : fixture;

            when(axios[method])
                .calledWith(endpoint)
                .mockReturnValue(
                    typeof response === 'boolean'
                        ? (response ? Promise.resolve({ data: {} }) : Promise.reject())
                        : Promise.resolve({ data: response })
                );
        });
    });
}

//
// submit a form
//
global.submit = function (el, setupFn) {
    simulate('submit', el, setupFn);
};

//
// timeout
//
global.timeout = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
