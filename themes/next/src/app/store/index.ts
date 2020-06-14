import Vuex from 'vuex';
import { isProduction } from '@/app/constants';

/**
 * Root state.
 */
export type RootState = {
  foo: number;
};

/**
 * Create a new store.
 */
export function createStore() {
  return new Vuex.Store<RootState>({
    modules: {},
    strict: !isProduction,
  });
}
