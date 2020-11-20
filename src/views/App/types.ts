import { AnyObject, CtxM } from '@/models/types'
import { SettingsType } from 'concent';
import { setup } from './setup';

// 使用SettingsType求出settings类型定义，传递给CtxM，方便用户可以在组件里使用 settins.{name}时 能够跳转到源码实现处
type Se = SettingsType<typeof setup>;

// setup 参数里用的Ctx 还没有settings
export type CtxPre = CtxM<AnyObject, 'user'>

// 组件 用的Ctx 已有了settings
export type Ctx = CtxM<AnyObject, 'user', Se>

