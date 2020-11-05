import { IActionCtxBase as AC } from 'concent'

import { UserSt, UserParams } from './types'
import { userLogin } from './services'

type PartialState = Partial<UserSt>

export function initState(): PartialState {
  return { token: '', user: null, errorMsg: '' }
}

export async function login(params: UserParams): Promise<PartialState> {
  const result = {}

  try {
    const { data, success, errorMsg } = await userLogin(params)

    Object.assign(
      result,
      success
        ? { token: new Date().valueOf().toString(), user: data, errorMsg: 'login successful' }
        : { errorMsg: `${errorMsg}_1234`, token: '', user: null }
    )
  } catch (error) {
    Object.assign(result, { errorMsg: error.toString() })
  }

  return result
}

export function logout(): PartialState {
  return { token: '', user: null }
}
