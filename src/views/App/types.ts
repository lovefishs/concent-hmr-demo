import { AnyObject, CtxM } from '@/models/types'
import { SettingsType } from 'concent';
import { setup } from './setup';

type Se = SettingsType<typeof setup>;

// setup 参数里用的Ctx 还没有settings
export type CtxPre = CtxM<AnyObject, 'user'>

// 组件 用的Ctx 已有了settings
export type Ctx = CtxM<AnyObject, 'user', Se>

