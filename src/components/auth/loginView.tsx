import * as React from 'react'

import { useTranslations } from 'hooks'

import { CommonProps, LoginForm } from './types'
import { Form } from './styled'

export const LoginView: React.FunctionComponent<CommonProps & {
  form: LoginForm,
  onSubmit: React.FormEventHandler<HTMLFormElement>
}> = ({ form, onSubmit, switchForm }) => {
  const [t] = useTranslations()

  return (
    <div>
      <h2>{t('login')}</h2>
      <Form onSubmit={onSubmit}>
        <form.Field name='email'>
          {props => (
            <input type='text' value={props.value} onChange={({ target }) => {
              props.onChange(target.value)
            }} />
          )}
        </form.Field>
        <form.Field name='password'>
          {props => (
            <input type='password' value={props.value} onChange={({ target }) => {
              props.onChange(target.value)
            }} />
          )}
        </form.Field>
        <button type='submit'>Submit</button>
      </Form>
      <button onClick={switchForm('signup')}>{t('signup')}</button>
    </div>
  )
}
