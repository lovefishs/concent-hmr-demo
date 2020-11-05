import { IDispatch as D } from 'concent'

import * as rd from './reducer'

export function loaded(dispatch: D): void {
  // 模块载入完毕时触发执行
  dispatch(rd.initState)
}
