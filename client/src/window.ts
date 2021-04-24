import { PuzzleConfig, User } from '@/app/types/models'

declare global {
  interface Window {
    context: {
      puzzleConfigs: PuzzleConfig[]
      user: User | null
    }
  }
}

export {}
