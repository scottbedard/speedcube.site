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
    const parent = inject(ParentSymbol);

    if (parent) {
      onMounted(() => parent.add(obj));
      onUnmounted(() => parent.remove(obj));
    }
  }

  provide(ParentSymbol, {
    add: (child) => obj.add(child),
    remove: (child) => obj.remove(child),
  });
}
