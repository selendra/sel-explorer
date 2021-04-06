import React from 'react'
import { Result, Button } from 'antd'
import NoDataImg from '../assets/noData.jpg'
import { NavLink } from 'react-router-dom'
import $t from '../locale'

export default function NoData({ id }) {
  return (
    <div className="no-data" style={{ padding: '10%', textAlign: 'center' }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary"><NavLink to='/'>Back Home</NavLink></Button>}
      />,
    </div>
  )
}
