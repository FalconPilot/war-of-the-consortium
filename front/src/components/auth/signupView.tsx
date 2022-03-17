import * as React from 'react'

import { SignupForm } from './types'

import { useTranslations } from '../../hooks'

export const SignupView: React.FunctionComponent<{ form: SignupForm }> = ({ form }) => {
  const [t] = useTranslations()

  return (
    <div>
      <h2>{t('signup')}</h2>
    </div>
  )
}
