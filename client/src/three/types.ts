import { InjectionKey } from 'vue'
import { PerspectiveCamera, Scene } from 'three'

/**
 * Renderer API
 */
export type RendererApi = {
  addScene: (sceneFn: SceneFactory) => void,
  removeScene: (sceneFn: SceneFactory) => void,
}

/**
 * Renderer symbol
 */
export const RendererSymbol: InjectionKey<RendererApi> = Symbol('RendererSymbol')

 /**
 * Scene API
 */
export type SceneApi = {
  camera: PerspectiveCamera;
  el: HTMLElement | undefined,
  scene: Scene,
};

/**
 * Scene factory
 */
export type SceneFactory = () => SceneApi
