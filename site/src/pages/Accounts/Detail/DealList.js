import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchDeals,
  dealsSelector,
  fetchPairs,
  pairsSelector
} from '@src/store/reducers/accountSlice'
import Table from '@components/Table'
import Amount from '@components/Amount'
import $t from '@src/locale'
import AddressLink from '@components/AddressLink'
import DateShow from '@components/DateShow'
import AccountLink from '../../../components/AccountLink'

export default function DealList({ address }) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const width = document.documentElement.clientWidth
  const simple = width < 1024
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPairs())
  }, [dispatch])
  const pairs = useSelector(pairsSelector)

  useEffect(() => {
    dispatch(fetchDeals(address, setLoading, page - 1, pageSize))
  }, [address, dispatch, page, pageSize])

  const { items = [], total } = useSelector(dealsSelector) || {}

  return (
    <Table
      loading={loading}
      onChange={({ current, pageSize: size }) => {
        setPage(current)
        setPageSize(size)
      }}
      scroll={{
        x: '100vh'
      }}
      pagination={{ current: page, pageSize, total, simple }}
      dataSource={items.map(fill => {
        const currentPair = pairs.find(item => item.pairId === fill.pairId)
        const { pipDecimals = 0, tickDecimals = 0 } = currentPair || {}
        return {
          key: fill.tradingHistoryIdx,
          id: fill.tradingHistoryIdx,
          price: (
            <Amount
              value={fill.price}
              precision={pipDecimals}
              minDigits={pipDecimals - tickDecimals}
              symbol={'PCX'}
              hideSymbol
            />
          ),
          amount: (
            <Amount
              value={fill.turnover}
              symbol={'PCX'}
              hideSymbol
              style={{ whiteSpace: 'nowrap' }}
            />
          ),
          maker: (
            <AccountLink
              style={{ maxWidth: 136 }}
              className="text-truncate"
              value={fill.maker}
            />
          ),
          taker: (
            <AccountLink
              style={{ maxWidth: 136 }}
              className="text-truncate"
              value={fill.taker}
            />
          ),
          maker_user_order_index: fill.makerOrderId,
          taker_user_order_index: fill.takerOrderId,
          createTime: <DateShow value={fill.blockTime} />
        }
      })}
      columns={[
        {
          title: <>ID</>,
          dataIndex: 'id'
        },
        {
          title: <div style={{ whiteSpace: 'nowrap' }}>{$t('dex_price')}</div>,
          dataIndex: 'price'
        },
        {
          title: (
            <div style={{ whiteSpace: 'nowrap' }}>{$t('dex_fill_amount')}</div>
          ),
          dataIndex: 'amount'
        },
        {
          title: <>{$t('dex_maker_account')}</>,
          dataIndex: 'maker'
        },
        {
          title: $t('dex_maker_order_id'),
          dataIndex: 'maker_user_order_index'
        },
        {
          title: <>{$t('dex_taker_account')}</>,
          dataIndex: 'taker'
        },
        {
          title: $t('dex_taker_order_id'),
          dataIndex: 'taker_user_order_index'
        },
        {
          title: $t('common_time'),
          dataIndex: 'createTime'
        }
      ]}
    />
  )
}
