import * as React from 'react'
import useCookie from 'react-use-cookie'

import { isLocale, Locale } from 'types'

import { translations } from 'gamedata/locales'

export const useTranslations = () => {
  const defaultLang = React.useMemo(() => {
    const lang = window.navigator.language
      ?.split('-')
      ?.[0]

    return isLocale(lang) ? lang : 'en'
  }, [])

  const [localeCookie, setLocaleCookie] = useCookie('locale', defaultLang)

  const locale = React.useMemo(() => (
    isLocale(localeCookie) ? localeCookie : 'en'
  ), [localeCookie])

  const getTranslation = React.useCallback((key: keyof typeof translations): string => (
    translations[key][locale]
  ), [locale])

  const switchLanguage = React.useCallback((lang: Locale): void => {
    setLocaleCookie(lang)
  }, [setLocaleCookie])

  return [getTranslation, switchLanguage] as const
}
