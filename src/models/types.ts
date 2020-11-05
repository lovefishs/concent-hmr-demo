import {
  cst,
  StateType,
  ReducerType,
  ComputedValType,
  MODULE_VOID,
  MODULE_DEFAULT,
  ICtx,
  IAnyObj,
} from 'concent'

import * as models from './index'

const allModels = { ...models }

type Models = typeof allModels

export type AnyObject = Record<string, any>

export type RootSt = {
  [cst.MODULE_DEFAULT]: IAnyObj
  [cst.MODULE_VOID]: IAnyObj
} & { [key in keyof Models]: StateType<Models[key]['state']> }

export type RootRd = {
  [cst.MODULE_VOID]: IAnyObj
  [cst.MODULE_DEFAULT]: IAnyObj
} & {
  [key in keyof Models]: 'reducer' extends keyof Models[key]
    ? Models[key]['reducer'] extends IAnyObj
      ? ReducerType<Models[key]['reducer']>
      : IAnyObj
    : IAnyObj
}

export type RootCu = {
  [cst.MODULE_VOID]: IAnyObj
  [cst.MODULE_DEFAULT]: IAnyObj
} & {
  [key in keyof Models]: 'computed' extends keyof Models[key]
    ? Models[key]['computed'] extends IAnyObj
      ? ComputedValType<Models[key]['computed']>
      : IAnyObj
    : IAnyObj
}

export type Modules = keyof RootSt

// ********************************
// 一些常用的基于 Ctx 封装的辅助类型
// P: Packages
// M: Module Name
// St: State
// Se: SettingsType<typeof setup>
// RefCu: refComputed
// ********************************

// 属于某个模块 CtxM<P, M, Se, RefCu>
export type CtxM<
  P = IAnyObj,
  M extends Modules = MODULE_DEFAULT,
  Se = IAnyObj,
  RefCu = IAnyObj
> = ICtx<RootSt, RootRd, RootCu, P, IAnyObj, M, MODULE_VOID, Se, RefCu>

// 属于某个模块，扩展了私有状态时 CtxMS<P, M, St, Se, RefCu>
export type CtxMS<
  P = IAnyObj,
  M extends Modules = MODULE_DEFAULT,
  St = IAnyObj,
  Se = IAnyObj,
  RefCu = IAnyObj
> = ICtx<RootSt, RootRd, RootCu, P, St, M, MODULE_VOID, Se, RefCu>

// 属于某个模块，连接了其他模块 CtxMConn<P, M, Conn, Se, RefCu>
export type CtxMConn<
  P = IAnyObj,
  M extends Modules = MODULE_DEFAULT,
  Conn extends Modules = MODULE_VOID,
  Se = IAnyObj,
  RefCu = IAnyObj
> = ICtx<RootSt, RootRd, RootCu, P, IAnyObj, M, Conn, Se, RefCu>

// 属于某个模块，扩展了私有状态，连接了其他模块 CtxMSConn<P, M, St, Conn, Se, RefCu>
export type CtxMSConn<
  P = IAnyObj,
  M extends Modules = MODULE_DEFAULT,
  St = IAnyObj,
  Conn extends Modules = MODULE_VOID,
  Se = IAnyObj,
  RefCu = IAnyObj
> = ICtx<RootSt, RootRd, RootCu, P, St, M, Conn, Se, RefCu>

// 扩展了私有状态，连接了其他模块 CtxMSConn<P, St, Conn, Se, RefCu>
export type CtxSConn<
  P = IAnyObj,
  St = IAnyObj,
  Conn extends Modules = MODULE_VOID,
  Se = IAnyObj,
  RefCu = IAnyObj
> = ICtx<RootSt, RootRd, RootCu, P, St, MODULE_DEFAULT, Conn, Se, RefCu>

// 连接了其他模块 CtxConn<P, Conn, Se, RefCu>
export type CtxConn<
  P = IAnyObj,
  Conn extends Modules = MODULE_VOID,
  Se = IAnyObj,
  RefCu = IAnyObj
> = ICtx<RootSt, RootRd, RootCu, P, IAnyObj, MODULE_DEFAULT, Conn, Se, RefCu>

// default 系列，没有指定连接模块的组件默认属于 $$default 模块
// 属于 $$default 模块 CtxM<P, M, Se, RefCu>
export type CtxDe<P = IAnyObj, Se = IAnyObj, RefCu = IAnyObj> = CtxM<P, MODULE_DEFAULT, Se, RefCu>
export type CtxDeS<P = IAnyObj, St = IAnyObj, Se = IAnyObj, RefCu = IAnyObj> = CtxMS<
  P,
  MODULE_DEFAULT,
  St,
  Se,
  RefCu
>
export type CtxDeSConn<
  P = IAnyObj,
  St = IAnyObj,
  Conn extends Modules = MODULE_VOID,
  Se = IAnyObj,
  RefCu = IAnyObj
> = CtxMSConn<P, MODULE_DEFAULT, St, Conn, Se, RefCu>
export type CtxDeConn<
  P = IAnyObj,
  Conn extends Modules = MODULE_VOID,
  Se = IAnyObj,
  RefCu = IAnyObj
> = CtxSConn<P, MODULE_DEFAULT, Conn, Se, RefCu>

// export type ItemsType<Arr> = Arr extends ReadonlyArray<infer E> ? E : never
