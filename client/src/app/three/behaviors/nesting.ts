import { Object3D } from 'three';
import { inject, InjectionKey, onMounted, onUnmounted, provide } from 'vue';

const ParentSymbol: InjectionKey<{
  add(obj: Object3D): void,
  remove(obj: Object3D): void,
}> = Symbol('ParentSymbol');


/**
 * Nesting context
 */
export function useNesting(obj: Object3D, isRoot: boolean = false) {
  if (!isRoot) {
    useChildContext(obj);
  }

  useParentContext(obj);
}

/**
 * Object is child of parent object
 */
export function useChildContext(obj: Object3D) {
  const parent = inject(ParentSymbol);

  if (parent) {
    onMounted(() => parent.add(obj));
    onUnmounted(() => parent.remove(obj));
  }
}

/**
 * Object is parent to child objects
 */
export function useParentContext(obj: Object3D) {
  provide(ParentSymbol, {
    add: (child) => obj.add(child),
    remove: (child) => obj.remove(child),
  });
}
