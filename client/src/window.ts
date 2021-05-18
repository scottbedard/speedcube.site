import { RawKeyboardConfig, RawPuzzleConfig, User } from '@/app/types/models'

declare global {
  interface Window {
    context: {
      keyboardConfigs: RawKeyboardConfig[]
      puzzleConfigs: RawPuzzleConfig[]
      user: User | null
    }
  }
}

export {}
