
import { UserSt, UserParams } from './types'
import { userLogin } from './services'
import { AC } from '@/models/types'

type PartialState = Partial<UserSt>
type IAC = AC<'user', UserSt>;

export function initState(): PartialState {
  return { token: '', user: null, errorMsg: '' }
}

export function randomToken(): PartialState {
  return { token: `to_${Date.now()}` };
}

export async function randomToken2(): Promise<PartialState> {
  await new Promise(r => setTimeout(r, 1000));
  return { token: `async_to_${Date.now()}` };
}

// p:payload m:moduleState ac:actionContext
// 组合调用其他reducer，本身也可以选择性的返回新状态
export async function combineOtherReducer(p: any, m: UserSt, ac: IAC) {
  await ac.dispatch(randomToken);
  await ac.dispatch(randomToken2);
  await new Promise(r => setTimeout(r, 1000));
  return { token: 'final' };
}

export async function login(params: UserParams): Promise<PartialState> {
  const result = {}

  try {
    const { data, success, errorMsg } = await userLogin(params)

    Object.assign(
      result,
      success
        ? { token: new Date().valueOf().toString(), user: data, errorMsg: 'login successful' }
        : { errorMsg: `${errorMsg}_1234xxee`, token: '', user: null }
    )
  } catch (error) {
    Object.assign(result, { errorMsg: error.toString() })
  }

  return result
}

export function logout(): PartialState {
  return { token: '', user: null }
}
