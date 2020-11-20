import { CtxPre } from './types'
import { UserParams } from '@/models/user/types'

export function setup(ctx: CtxPre) {
  const { setState, moduleReducer } = ctx

  return {
    handleSubmit: async (data: UserParams) => {
      setState({ errorMsg: '' })

      const state = await moduleReducer.login(data)
      const isLogin = Boolean(state.user)

      if (isLogin) {
        console.log('login successful')
      }
    },
  }
}
