import { InjectionKey } from '@vue/composition-api';
import { PerspectiveCamera, Scene } from 'three';

/**
 * Methods exposed on renderer api.
 */
export type RendererApi = {
  addScene: (sceneFn: SceneFactory) => void;
  removeScene: (sceneFn: SceneFactory) => void;
};

/**
 * Scene api object used by the renderer
 */
export type SceneApi = {
  camera: PerspectiveCamera;
  el: Element | undefined;
  scene: Scene;
};

export type SceneFactory = () => SceneApi;

/**
 * Symbol to access the global renderer.
 */
export const RendererSymbol: InjectionKey<RendererApi> = Symbol('RendererSymbol');
