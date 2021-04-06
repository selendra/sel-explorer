import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { useRedux } from '../../shared'
import { latestChainStatusSelector } from '../../store/reducers/latestChainStatusSlice'
import api from '../../services/api'
import { Amount, NumberFormat, AntSpinner as Spinner } from '../../components'
import PCX from '../../assets/tokens/pcx.png'
import $t from '../../locale'
import { Col, Row, Card, Spin } from 'antd';

export default function ChainStatus() {
  const data = useSelector(latestChainStatusSelector) || {}
  const loading = (
    <div
      style={{
        background: '#fff',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Spin />
    </div>
  )

  return (
    <Row justify='space-between'>
      <Col xs={24} sm={24} md={12} lg={7} xl={7} style={{width: '100%'}}>
        <Card style={{ borderRadius: 8, minWidth: 300, Height: 120 }}>
          <p style={{ fontWeight: 600, fontSize: 18 }}>Latest Block / Finalized</p><br/>
          { data && data.best ? (
            <div>
              <NumberFormat value={data.best} /> /{' '}
              <NumberFormat value={data.finalized} />
            </div>
          ) : loading }
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={7} xl={7} style={{width: '100%'}}>
        <Card style={{ borderRadius: 8, minWidth: 300, minHeight: 120 }}>
          <p style={{ fontWeight: 600, fontSize: 18 }}>Transaction</p><br/>
          { data && data.best ? (
            <NumberFormat value={data.transfer_count} />
          ) : loading }
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={7} xl={7} style={{width: '100%'}}>
        <Card style={{ borderRadius: 8, minWidth: 300, minHeight: 120 }}>
          <p style={{ fontWeight: 600, fontSize: 18 }}>Scanned Block / Total Events</p><br/>
          { data && data.best ? ( 
            <div>
              <NumberFormat value={data.scan_height} /> /{' '}
              <NumberFormat value={data.event_count} />
            </div>
          ) : loading }
        </Card>
      </Col>
    </Row>
  )
}
