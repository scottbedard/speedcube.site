import { InjectionKey } from 'vue';
import { RendererApi } from '@/components/three/types';

/**
 * Global renderer symbol.
 */
export const RendererSymbol: InjectionKey<RendererApi> = Symbol('RendererSymbol');
