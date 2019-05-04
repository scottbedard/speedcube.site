import axios from 'axios';

//
// boot up our application
//
import '@/app/boot';

//
// import unit testing helpers
//
import './helpers';

// global vm containers, these will be automatically cleaned up
// and fire their destroy lifecycle hooks to prevent memory leaks
const vms = ['vm' /* 'vm1', 'vm2', etc... */];

//
// global setup
//
beforeEach(function() {
    vms.forEach(name => window[name] = undefined);
});

//
// global teardown
//
afterEach(function() {
    axios.reset();
    sandbox.reset();

    vms.forEach(name => {
        if (window[name] && typeof window[name].$destroy === 'function') {
            window[name].$destroy();
        }
    });
});

//
// require all spec files
//
const specs = require.context('./specs', true, /\.spec\.js$/);

specs.keys().forEach(specs);

//
// require all files that should be included in code coverage
//
const coverageBlacklist = [
    './main.js',
    './app/routes.js',
];

const files = require.context('../../src', true, /^\.\/(.*)(\.vue$|\.js$)/);

files.keys().filter(file => coverageBlacklist.indexOf(file) === -1).forEach(files);