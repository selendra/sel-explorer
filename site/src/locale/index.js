import messages from './messages'
import { store } from '../index'
import * as format from 'string-template'

export default function $t(key, args) {
  // const locale = store.getState().settings.locale
  const locale = 'en'
  const reversedLocale = locale === 'en'
  const value = messages[key]
  if (!value) {
    return ''
  }

  const reversedValue = value[reversedLocale]
  const message = value[locale]

  const msg = message ? message : reversedValue ? reversedValue : ''
  return format(msg, args)
}

export function getLocale() {
  return store.getState().settings.locale
}
