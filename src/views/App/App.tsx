import React from 'react'
import { useConcent } from 'concent'

import { AnyObject } from '@/models/types'
import { UserParams } from '@/models/user/types'

import { Ctx } from './types'
import { setup } from './setup'

const App: React.FC<unknown> = () => {
  const { settings, moduleState, mr } = useConcent<AnyObject, Ctx>({ setup, module: 'user' })
  const [params, setParams] = React.useState<UserParams>({
    email: '',
    password: '',
  })
  const handleFieldChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { field } = event.currentTarget.dataset
    const value = event.currentTarget.value

    setParams((prevState) => ({ ...prevState, [field as string]: value }))
  }, [])
  const handleBtnClick = React.useCallback(() => {
    settings.handleSubmit(params)
  }, [params])

  return (
    <div className="container">
      <div>valid email & password: test@mail.com / 12345</div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          required={true}
          data-field="email"
          onChange={handleFieldChange}
        />
      </div>
      <div>
        <label>Password--:</label>
        <input
          type="password"
          name="password"
          required={true}
          data-field="password"
          onChange={handleFieldChange}
        />
      </div>
      <div>
        <button type="button" onClick={handleBtnClick}>
          Submit
        </button>
      </div>

      <h1>{moduleState.token}</h1>
      <button onClick={mr.combineOtherReducer}>change token</button>
      {moduleState.errorMsg && <div>Message: {moduleState.errorMsg}</div>}
    </div>
  )
}

export default App
