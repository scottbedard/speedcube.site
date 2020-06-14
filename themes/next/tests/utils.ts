import { noop } from 'lodash-es';
import { createLocalVue, mount as testUtilsMount } from '@vue/test-utils';
import { createStore } from '@/app/store';
import { createRouter } from '@/app/router';
import { boot } from '@/app/boot';

/**
 * Click an element.
 */
export function click(el: Element) {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    simulate('click', el);
  }
}

/**
 * Mount a component within our application context.
 */
export function mount(component: Object, options = {}) {
  const localVue = createLocalVue();

  boot(localVue);

  const store = createStore();

  const router = createRouter(store);

  return testUtilsMount(component, {
    localVue,
    router,
    store,
    ...options,
  });
}

/**
 * Simulate a DOM event.
 */
export function simulate(name: string, el: Element, setupFn: Function = noop) {
  const event = new Event(name);

  Object.defineProperty(event, 'target', {
    enumerable: true,
    value: el,
  });

  setupFn(event);

  return el.dispatchEvent(event);
}