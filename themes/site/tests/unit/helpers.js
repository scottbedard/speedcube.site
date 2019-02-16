import Vue from 'vue';
import axios from 'axios';
import modules from '@/app/store';
import routes from '@/app/routes';
import sinon from 'sinon';
import { factory as spyfuVueFactory } from 'spyfu-vue-factory';

//
// test sandbox
// these are reset after each test
//
window.sandbox = sinon.createSandbox();
window.spy = sandbox.spy;
window.stub = sandbox.stub;

//
// click an element
//
window.click = function click(el) {
    if (typeof el.click === 'function') {
        el.click();
    } else {
        simulate('click', el);
    }
}

//
// create a vue factory
//
window.factory = function factory(options = {}) {
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
window.input = function (value, el) {
    el.value = value;

    return simulate('input', el);
}

//
// default mount function
//
window.mount = factory();

//
// no-op
//
window.noop = () => {};

//
// prevent store interactions before a component is mounted
//
window.preventInitialActions = function (vm) {
    const dispatch = stub(vm.$store, 'dispatch');

    vm.$once('hook:mounted', dispatch.restore);
};

window.preventInitialMutations = function (vm) {
    const commit = stub(vm.$store, 'commit');

    vm.$once('hook:mounted', commit.restore);
};

window.preventInitialization = function (vm) {
    preventInitialActions(vm);
    preventInitialMutations(vm);
};

//
// simulate an event
//
window.simulate = function (name, el, setupFn) {
    const e = new Event(name);

    if (setupFn) {
        setupFn(e);
    }

    return el.dispatchEvent(e);
};

//
// stub xhr requests
//
window.stubRequests = function (requests = {}) {
    Object.keys(requests).forEach((method) => {
        if (axios[method]) {
            Object.entries(requests[method] || {}).forEach(([endpoint, fixture]) => {
                if (fixture === true) {
                    // stub a success response
                    axios[method].withArgs(endpoint).resolves();
                } else if (fixture === false) {
                    // stub a failure response
                    axios[method].withArgs(endpoint).rejects();
                } else if (typeof fixture === 'object') {
                    // api for stubbing failed responses
                    if (fixture.status === 200) {
                        axios[method].withArgs(endpoint).resolves({ data: fixture.response() });
                    } else {
                        // api for stubbing failed responses
                        axios[method].withArgs(endpoint).rejects({
                            response: {
                                status: fixture.status,
                                data: fixture.response(),
                            },
                        });
                    }
                } else {
                    // stub a fixed response
                    axios[method].withArgs(endpoint).resolves({ data: fixture() });
                }
            });
        }
    });
};

//
// submit a form
//
window.submit = function (el, setupFn) {
    simulate('submit', el, setupFn);
};

//
// timeout
//
window.timeout = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
