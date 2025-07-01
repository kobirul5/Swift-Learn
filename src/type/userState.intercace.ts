export interface UserState {
  user: {
    name: string
    email: string
    token?: string
  } | null
}