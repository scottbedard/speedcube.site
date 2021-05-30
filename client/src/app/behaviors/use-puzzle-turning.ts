import { clamp } from 'lodash-es'
import { computed, ref, watch } from 'vue'
import { Cube } from '@bedard/twister'
import { Keybinding } from '@/app/types/puzzle'
import { MaybeRef, useTransition } from '@vueuse/core'
import { useKeybindings } from './use-keybindings'

/**
 * Turning logic for puzzle component
 */
export function usePuzzleTurning(
  model: Cube,
  keybindings: MaybeRef<Record<string, string> | null>
) {
  const queue = ref<Keybinding[]>([])

  const turnIndex = ref(0)

  const turnTransition = useTransition(turnIndex, {
    duration: 100,
    onFinished: () => {
      model.turn(currentTurn.value)
      queue.value.shift()
    },
  })

  const currentKeybinding = computed(() => queue.value?.[0] ?? { key: '', turn: '' })

  /**
   * Current turn to apply to puzzle
   */
  const currentTurn = computed(() => currentKeybinding.value.turn)

  /**
   * Turn progress represented 0 to 1
   */
  const turnProgress = computed(() => 1 - clamp(turnIndex.value - turnTransition.value, 0, 1))

  /**
   * Listen for turn events and execute turn
   */
  useKeybindings(keybindings, keybinding => {
    let valid = true

    try {
      model.parse(keybinding.turn)
    } catch {
      valid = false
    }

    if (valid) {
      queue.value.push(keybinding)
    }
  })

  /**
   * Begin next turn by incrementing turn index
   */
  watch(currentKeybinding, () => {
    if (currentTurn.value) {
      turnIndex.value++
    }
  })

  return {
    currentTurn,
    turnProgress,
  }
}
