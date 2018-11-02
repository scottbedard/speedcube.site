# vuetober-spa

[![Build](https://img.shields.io/circleci/project/github/scottbedard/vuetober-spa.svg)](https://circleci.com/gh/scottbedard/vuetober-spa)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/scottbedard/vuetober-spa/blob/master/LICENSE)

### Getting Started

This project is an opinionated approach to SPAs within the awesome worlds of [October CMS](https://octobercms.com) and [Vue.js](https://vuejs.org), and is based off of [Vuetober](https://github.com/scottbedard/oc-vuetober-theme). To create a new SPA, clone this repository into your `/themes` directory.

```bash
# install dependencies
$ yarn install

# start development server and serve with hot reloading
$ yarn serve

# build production assets
$ yarn build

# lint and fix files
$ yarn lint

# run unit tests
$ yarn test:unit

# run unit tests, and watch for changes
$ yarn test:unit -w
```

### Routing & Layouts

To add routes to your application, register the component within [`src/app/routes.js`](https://github.com/scottbedard/vuetober-spa/blob/master/src/app/routes.js). For more information on routing, please refer to the [vue-router documentation](https://router.vuejs.org).

Layout components control how the page should appear, and should always contain a `<router-view />` component. Currently, there is only one layout located at [`src/layouts/default/default.vue`](https://github.com/scottbedard/vuetober-spa/blob/master/src/layouts/default/default.vue), which provides a basic header and footer. To register a route with this layout, simply add it to the `children` array in the routes file.

### Styling

This theme leverages [Tailwind CSS](https://tailwindcss.com), a utility-first framework that maximizes reuseability and rendering performance. If you've never used this framework before, I highly recommend giving it a try. If used properly, you can usually avoid writing CSS entirely, and your site will have a microscopic CSS footprint. Also being used is [Purgecss](https://github.com/FullHuman/purgecss), which removes any unused classes from built files. This means you can feel free to enable as many Tailwind utilities as you want with no performance overhead. The only downside to doing this, is that Purgecss is not able to recognize classes that are assembled at runtime. To get around this limitation, you may whitelist classes by adding them to [`src/scss/whitelist.js`](https://github.com/scottbedard/vuetober-spa/blob/master/src/scss/whitelist.js).

### Global Components

To register a component globally, simply add it to the [`src/components/global.js`](https://github.com/scottbedard/vuetober-spa/blob/master/src/components/global.js). The code below demonstrates how to register a global component that is loaded immediately, and one that is only loaded when needed.

```js
import marginComponent from './containers/margin.vue';

export default {
    // this component will not be bundle split, and will be available as <v-margin>
    'v-margin': marginComponent,
    
    // for components that aren't needed on the entry pages, or rely on heavy
    // third party libraries, it's best to lazy-load them with a dynamic import.
    'v-line-chart': () => import('./charts/line_chart.vue'),
}
```

### Unit Testing

This theme comes with several utilities to make testing easier. Make sure to review the [`tests/unit/helpers.js`](https://github.com/scottbedard/vuetober-spa/blob/master/tests/unit/helpers.js) file to see all the utility functions available. To render a component in a test, use the `factory` and `mount` functions. Note that if you're only testing a global component, you do not need to define a custom `mount` function.

```js
// import the components being tested
import blogComponent from '@/pages/blog/blog.vue';

// register them with a new vue factory
const mount = factory({
    components: {
        'v-blog': blogComponent,
    },
});

describe('blog page', function() {
    it('displays blog posts', () {
        // it's best to assign test components to the global "vm" variable
        // because these components will be destroyed after each test
        vm = mount({
            template: `<v-blog />`,
        });
        
        // make assertions here...
    });
});
```

One important thing to learn is that all XHR requests made via `axios` are stubbed in the test environment. This in combination with the `stubRequests` helper make it easy to assert your pages are doing what they're supposed to. Below is an example of how to stub an XHR request, and assert that it was made.

```js
import axios from 'axios';

describe('blog page', function() {

    // using stubRequests from a beforeEach hook is a handy way to reset
    // your stubs for every test. this helps prevent bad assertions
    beforeEach(function() {
        stubRequests({
            get: {
                '/api/rainlab/blog/posts': blogPostsFixture,
            },
        });
    });
    
    it('fetches blog posts when mounted', function() {
        vm = mount({
            template: `<v-blog />`,
        });
        
        expect(axios.get).to.have.been.calledWithMatch('/api/rainlab/blog/posts');
    });
});
```

### Production Builds

By default, building production assets will create two bundles. The first is a "modern" bundle, which is designed to target ever-green browsers (Chrome, Edge, Firefox, Safari, etc...). The second, is a "legacy" bundle, which transpiles code for older browsers like IE. To learn more about how this works, please refer to the [vue-cli documentation](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode).

Building these two bundles results in better runtime performance, but will increase the amount of time it takes to build. If you do not wish to use this feature, remove the [`--modern`](https://github.com/scottbedard/vuetober-spa/blob/master/package.json#L7) flag from the build command.

### Continuous Integration

This theme comes with integrations ready for circleci. To enable it for your repository, simply navigate to `https://circleci.com/gh/:owner/:repo` and click "Follow project".

### License

[MIT](https://github.com/scottbedard/vuetober-spa/blob/master/LICENSE)

Copyright (c) 2018-present, Scott Bedard
