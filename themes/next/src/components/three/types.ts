import { InjectionKey } from '@vue/composition-api';

/**
 * Methods exposed on renderer api.
 */
export type RendererApi = {
  addScene: () => void;
  removeScene: () => void;
};

/**
 * Symbol to access the global renderer.
 */
export const RendererSymbol: InjectionKey<RendererApi> = Symbol('RendererSymbol');
