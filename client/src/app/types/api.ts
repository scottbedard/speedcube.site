import { User } from './models'

// post: /api/users
export type CreateUserResponse = {
  user: User
}

// post: /api/auth/login
export type LoginResponse = {
  user: User
}
