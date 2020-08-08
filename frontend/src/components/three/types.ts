import { PerspectiveCamera, Scene } from 'three';

/**
 * Methods exposed on renderer api.
 */
export type RendererApi = {
  addScene: (scene: Scene) => void;
  removeScene: (scene: Scene) => void;
};

/**
 * User data attached to scenes
 */
export type SceneData = {
  camera: PerspectiveCamera,
  el: HTMLElement;
};
