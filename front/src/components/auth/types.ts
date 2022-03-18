import { Form } from 'react-ux-form'

export type CurrentForm = 'login' | 'signup'

export type SignupForm = Form<{
  name: string,
  email: string,
  password: string,
  passwordCheck: string,
}>

export type LoginForm = Form<{
  email: string,
  password: string,
}>

export interface CommonProps {
  switchForm: (fk: CurrentForm) => () => void
}
