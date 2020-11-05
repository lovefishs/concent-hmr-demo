import { Ctx, InstSettings } from './types'

export function setup(ctx: Ctx): InstSettings {
  const { setState, moduleReducer } = ctx

  return {
    handleSubmit: async (data) => {
      setState({ errorMsg: '' })

      const state = await moduleReducer.login(data)
      const isLogin = Boolean(state.user)

      if (isLogin) {
        console.log('login successful')
      }
    },
  }
}
