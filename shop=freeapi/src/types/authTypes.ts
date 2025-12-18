export type User = {
  _id: string
  username: string
  email: string
  role: string
  avatar: { url: string }
}

export type SignupPayload = {
  username: string
  email: string
  password: string
  role: 'ADMIN' | 'USER'
}

export type LoginPayload = {
  username: string
  password: string
}

export type TokenResponse = {
  accessToken: string
  refreshToken: string
}
