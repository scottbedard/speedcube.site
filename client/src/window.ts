import { User } from '@/app/types/models'

declare global {
  interface Window {
    context: {
      user: User | null
    }
  }
}

export {}
