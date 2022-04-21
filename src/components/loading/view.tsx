import * as React from 'react'

import { useTranslations } from 'hooks'

export const LoadingView: React.FunctionComponent = () => {
  const [t] = useTranslations()

  return (
    <div>{t('loading')}</div>
  )
}
