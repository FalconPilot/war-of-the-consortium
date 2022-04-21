import * as React from 'react'

import { CommonProps, SignupForm } from './types'

import { useTranslations } from '../../hooks'

import { Form } from './styled'

export const SignupView: React.FunctionComponent<CommonProps & {
  form: SignupForm,
  onSubmit: React.FormEventHandler<HTMLFormElement>
}> = ({ form, onSubmit, switchForm }) => {
  const [t] = useTranslations()

  return (
    <div>
      <h2>{t('signup')}</h2>
      <Form onSubmit={onSubmit}>
        <form.Field name='email'>
          {props => (
            <input
              type='text'
              value={props.value}
              onChange={({ target }) => { props.onChange(target.value) }}
            />
          )}
        </form.Field>
        <form.Field name='name'>
          {props => (
            <input
              type='text'
              value={props.value}
              onChange={({ target }) => { props.onChange(target.value) }}
            />
          )}
        </form.Field>
        <form.Field name='password'>
          {props => (
            <input
              type='password'
              value={props.value}
              onChange={({ target }) => { props.onChange(target.value) }}
            />
          )}
        </form.Field>
        <form.Field name='passwordCheck'>
          {props => (
            <input
              type='password'
              value={props.value}
              onChange={({ target }) => { props.onChange(target.value) }}
            />
          )}
        </form.Field>
        <button type='submit'>Submit</button>
      </Form>
      <button onClick={switchForm('login')}>{t('login')}</button>
    </div>
  )
}
