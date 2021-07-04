import { clamp } from 'lodash-es'
import { computed, Ref, ref, unref, watch } from 'vue'
import { Cube } from '@bedard/twister'
import { Keybinding } from '@/app/types/puzzle'
import { MaybeRef, useTransition } from '@vueuse/core'
import { useKeybindings } from './use-keybindings'

const defaultTurnDuration = 150

type PuzzleTurningParams = {
  config: MaybeRef<Record<string, unknown> | null>
  keybindings: MaybeRef<Record<string, string>>
  model: Cube
  scrambling: Ref<boolean>
}

/**
 * Turning logic for puzzle component
 */
export function usePuzzleTurning({ 
  config, 
  keybindings,
  model,
  scrambling,
}: PuzzleTurningParams) {
  const queue = ref<Keybinding[]>([])

  const turnIndex = ref(0)

  const turnDuration = computed(() => Number(unref(config)?.turnDuration ?? defaultTurnDuration))

  const turnTransition = useTransition(turnIndex, {
    duration: turnDuration,
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
    try {
      model.parse(keybinding.turn)

      queue.value.push(keybinding)
    } catch {}
  })

  /**
   * Begin next turn by incrementing turn index
   */
  watch(currentKeybinding, () => {
    if (currentTurn.value) {
      turnIndex.value++
    }
  })

  /**
   * Execute random turns while scrambling
   */
  watch(scrambling, () => {
    if (scrambling.value) {
      console.log('scrambling')
    } else {
      console.log('done scrambling')
    }
  })

  return {
    currentTurn,
    turnProgress,
  }
}
