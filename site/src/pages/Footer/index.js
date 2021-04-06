import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import weixin from '../../assets/weixin.jpg'
import classnames from 'classnames'
import { ReactComponent as Up } from '../../assets/open.svg'
import $t from '../../locale'
import { changeLocale, localeSelector } from '@src/store/reducers/settingsSlice'

export const LangChanger = function() {
  const languages = ['中文', 'English']
  let activeLanguageIndex = 0
  const [active, setActive] = useState(false)

  const dispatch = useDispatch()

  const handleChange = language => {
    if (language === '中文') {
      dispatch(changeLocale('zh'))
    } else {
      dispatch(changeLocale('en'))
    }
    setActive(false)
  }

  const setNagtive = e => {
    try {
      if (e.toElement.className !== 'show-lang') setActive(false)
    } catch (e) {
      console.log('error')
    }
  }

  activeLanguageIndex = useSelector(localeSelector) === 'zh' ? 0 : 1

  useEffect(() => {
    var el = document.getElementById('langSelector')
    el.addEventListener('click', setNagtive)
    return () => el.removeEventListener('click', setNagtive)
  })

  return (
    <div className="lang-selector" id="langSelector">
      <div className="show-lang" onClick={() => setActive(!active)}>
        {languages[activeLanguageIndex]}{' '}
        <Up className={classnames('select-arrow', { active })} />
      </div>
      <ul className={classnames('selector', { active })}>
        {languages.map(item => (
          <li
            className={classnames('select-item')}
            onClick={() => handleChange(item)}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
const width = document.documentElement.clientWidth
export default function Footer() {
  if (width > 768) {
    return (
      <div className="page-footer">
        <div className="container" style={{padding: '0 10px'}}>
          <ul className="footer-start">
            <li>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
              >
                Selendra
              </a>
            </li>
            <li>
              <a
                href="https://testnet.selendra.org/#/explorer"
                target="_blank"
                rel="noopener noreferrer"
              >
                {$t('common_wallet')}
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/selendraorg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://github.com/selendra"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://t.me/selendraorg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
            </li>
            <li>
              <a href="mailto:info@selendra.org">info@selendra.org</a>
            </li>
            <li>
              <div className="footer-end">
                {/* <LangChanger /> */}
                Copyright © 2020 Selendra
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  } else {
    return (
      <div className="page-footer" style={{ height: '100px' }}>
        <div className="container">
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '10px'
            }}
          >
            <li>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
              >
                Selendra
              </a>
            </li>
            <li>
              <a
                href="https://testnet.selendra.org/#/explorer"
                target="_blank"
                rel="noopener noreferrer"
              >
                {$t('common_wallet')}
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/selendraio"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://github.com/selendra"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://t.me/selendraorg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
            </li>
            <li
              style={{
                // marginTop: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // marginLeft: '6vh'
              }}
            >
              <a href="mailto:info@selendra.org" style={{ marginRight: '15px' }}>
                info@selendra.org
              </a>
            </li>
            <div
              style={{
                paddingTop: '10px',
                paddingBottom: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              Copyright © 2020 Selendra
            </div>
          </ul>
        </div>
      </div>
    )
  }
}
