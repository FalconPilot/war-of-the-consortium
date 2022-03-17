import * as React from 'react'

import { useForm } from 'react-ux-form'

import { CurrentForm, LoginForm, SignupForm } from './types'

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

  return {
    ['login']: (
      <LoginView form={loginForm} />
    ),
    ['signup']: (
      <SignupView form={signupForm} />
    )
  }[currentForm]
}
