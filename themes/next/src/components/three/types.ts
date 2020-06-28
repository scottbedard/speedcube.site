import { InjectionKey } from '@vue/composition-api';
import { Scene } from 'three';

/**
 * Methods exposed on renderer api.
 */
export type RendererApi = {
  addScene: (scene: Scene) => void;
  removeScene: (scene: Scene) => void;
};

/**
 * Symbol to access the global renderer.
 */
export const RendererSymbol: InjectionKey<RendererApi> = Symbol('RendererSymbol');
