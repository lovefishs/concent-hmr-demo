export type UserSt = {
  token: string
  user: UserInfo | null
  errorMsg: string
}

export type UserParams = {
  email: string
  password: string
}

export type UserInfo = {
  id: number
  email: string
  password: string
  phone: string
  username: string
}

export type Response<T = any> = {
  data: T,
  success: boolean,
  errorMsg: string
}
