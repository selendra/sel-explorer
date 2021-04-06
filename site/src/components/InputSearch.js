import React, { useState, useCallback } from 'react'
import api from '../services/api'
import $t from '../locale'
import { Row } from 'antd'

export default function InputSearch(props) {
  const { history } = props

  const [str, setStr] = useState('')
  const width = document.documentElement.clientWidth
  const style = 
    width < 1024 ? { width: '60vw' } : { width: '30vw', paddingRight: '3vw' }
  const search = useCallback(
    async str => {
      const result = await api.search(str)
      if (result.error) {
        alert(result.error.message)
      } else {
        history.push(result.result)
        setStr('')
      }
    },
    [api]
  )
  return (
    <span className="navbar-search">
      <Row align='middle'>
        <input
          value={str}
          onChange={e => setStr(e.target.value)}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              search(str)
            }
          }}
          style={style}
          className="input is-rounded"
          type="text"
          placeholder={
            $t('search') +
            $t('block_height') +
            '/' +
            $t('hash') +
            '/' +
            $t('ex_hash') +
            '/' +
            $t('address_item')
          }
        />
        <i
          className="iconfont icon-search search"
          style={{marginLeft: 10}}
          onClick={() => {
            search(str)
          }}
        />
      </Row>
    </span>
  )
}
