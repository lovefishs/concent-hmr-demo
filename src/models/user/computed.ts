import { UserSt } from './types'

// 推荐使用 ComputedFnDesc 方式声明 computed 函数，显示指定 depKeys 依赖属性
export const isLogin = {
  fn: ({ user }: UserSt): boolean => Boolean(user),
  depKeys: ['user'],
}
