import React, { useMemo, useState } from 'react'
import api from '../../services/api'
import { Amount, Table } from '../../components'
import $t from '../../locale'
import AccountLink from '../../components/AccountLink'
import { useLoad } from '../../utils/hooks'

export default function({ blockHeight }) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const params = useMemo(() => {
    return blockHeight
      ? { block: blockHeight, page, pageSize }
      : { page, pageSize }
  }, [blockHeight, page, pageSize])

  const width = document.documentElement.clientWidth
  const simple = width < 1024

  const { items: accounts, loading, total } = useLoad(api.fetchAccounts, params)

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
      pagination={{ current: page, pageSize, total, simple: simple }}
      dataSource={accounts.map(item => {
        return {
          key: item._id,
          address: <AccountLink value={item.address} />,
          avalibleBalance: (
            <Amount minDigits={3} value={item.data.free - item.data.miscFrozen} />
          ),
          totalBalance: (
            <Amount minDigits={3} value={item.data.free + item.data.reserved} />
          )
        }
      })}
      columns={[
        {
          title: $t('address_item'),
          dataIndex: 'address'
        },
        {
          title: $t('usable'),
          dataIndex: 'avalibleBalance'
        },
        {
          title: $t('total_balance_item'),
          dataIndex: 'totalBalance'
        }
      ]}
    />
  )
}
