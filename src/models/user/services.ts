import { UserParams, UserInfo, Response } from './types'

export const userLogin = async (params: UserParams): Promise<Response<UserInfo | null>> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const validUser = params.email === 'test@mail.com' && params.password === '12345'

  return {
    success: validUser,
    errorMsg: validUser ? '' : '用户邮箱或密码错误',
    data: validUser
      ? {
          ...params,
          id: 1,
          phone: '',
          username: 'admin',
        }
      : null,
  }
}
