import { AnyObject, CtxM } from '@/models/types'
import { UserParams } from '@/models/user/types'

export type Ctx = CtxM<AnyObject, 'user'>

export type InstSettings = {
  handleSubmit: (data: UserParams) => Promise<void>
}
