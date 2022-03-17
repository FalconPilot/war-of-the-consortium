import * as React from 'react'

import { LoginForm } from './types'

import { useTranslations } from '../../hooks'

export const LoginView: React.FunctionComponent<{ form: LoginForm }> = ({ form }) => {
  const [t] = useTranslations()

  return (
    <div>
      <h2>{t('login')}</h2>
      
    </div>
  )
}
