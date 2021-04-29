import { KeyboardConfig, PuzzleConfig, User } from '@/app/types/models'

declare global {
  interface Window {
    context: {
      keyboardConfigs: KeyboardConfig[]
      puzzleConfigs: PuzzleConfig[]
      user: User | null
    }
  }
}

export {}
