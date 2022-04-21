import * as React from 'react'

import { useForm } from 'react-ux-form'

import { API } from 'wotc-common'
import { UserCodec } from 'wotc-database'

import { CommonProps, CurrentForm, LoginForm, SignupForm } from './types'

import { LoginView } from './loginView'
import { SignupView } from './signupView'

export const Auth: React.FunctionComponent = () => {
  const [currentForm, setCurrentForm] = React.useState<CurrentForm>('login')

  const signupForm: SignupForm = useForm({
    name: {
      initialValue: ''
    },
    email: {
      initialValue: '',
    },
    password: {
      initialValue: ''
    },
    passwordCheck: {
      initialValue: ''
    }
  })

  const loginForm: LoginForm = useForm({
    email: {
      initialValue: ''
    },
    password: {
      initialValue: ''
    }
  })

  const submitLoginForm: React.FormEventHandler<HTMLFormElement> = React.useCallback(evt => {
    evt.preventDefault()
    loginForm.submitForm(values => {
      if (values.email) {
        API.post(`/api/users/${encodeURIComponent(values.email)}/login`, UserCodec)
          .withBody(values)
          .execute()
          .then(console.log)
          .catch(console.error)
      }
    }, err => {
      console.error(err)
    })
  }, [loginForm])

  const submitSignupForm: React.FormEventHandler<HTMLFormElement> = React.useCallback(evt => {
    evt.preventDefault()
    signupForm.submitForm(values => {
      API.post('/api/users', UserCodec)
        .withBody(values)
        .execute()
        .then(console.log)
        .catch(console.error)
    }, err => {
      console.error(err)
    })
  }, [signupForm])

  const switchForm = (formKey: CurrentForm) => (): void => {
    setCurrentForm(formKey)
  }

  const commonProps: CommonProps = {
    switchForm,
  }

  return {
    ['login']: (
      <LoginView
        {...commonProps}
        form={loginForm}
        onSubmit={submitLoginForm}
      />
    ),
    ['signup']: (
      <SignupView
        {...commonProps}
        form={signupForm}
        onSubmit={submitSignupForm}
      />
    )
  }[currentForm]
}
