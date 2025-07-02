export interface UserState {
  user: {
    name: string
    email: string
    role: string
  } | null
}