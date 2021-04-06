import React, { useMemo, useState } from 'react'
import api from '../../../services/api'
import { Table } from '../../../components'
import $t from '../../../locale'
import DateShow from '../../../components/DateShow'
import TxLink from '../../../components/TxLink'
import BlockLink from '../../../components/BlockLink'
import TxAction from '../../../components/TxAction'
import { useLoad } from '../../../utils/hooks'
import arrayObjectDeDuplication from '../../../utils/arrayObjectDeDuplication'
export default function({ blockHeight }) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const params = useMemo(() => {
    return blockHeight
      ? { block: blockHeight, page, pageSize }
      : { page, pageSize }
  }, [blockHeight, page, pageSize])

  const { items: events, loading, total } = useLoad(
    api.fetchBlockEvents,
    params
  )
  const width = document.documentElement.clientWidth
  const simple = width < 1024
  /*
  let list = arrayObjectDeDuplication(extrinsics, 'extrinsicHash')
  const renderList = list.sort(function(a, b) {
    return a.phase.value - b.phase.value
  })
  */
  const renderList = events
  return (
    <Table
      loading={loading}
      onChange={({ current, pageSize: size }) => {
        setPage(current)
        setPageSize(size)
      }}
      pagination={{ current: page, pageSize, total, simple }}
      scroll={{
        x: '100vh'
      }}
      expandedRowRender={data => {
        return (
          <div>
            <pre style={{ textAlign: 'right' }}>
              {'args:' + JSON.stringify(data.args, null, 0)}
              {', data: ' + JSON.stringify(data.data)}
            </pre>
          </div>
        )
      }}
      dataSource={renderList.map(item => {
        return {
          key: item._id,
          extrinsicHash: (
            <TxLink
              style={{ width: 136 }}
              className="text-truncate"
              value={item.extrinsicHash}
            />
          ),
          sort: item.sort,
          blockHeight: <BlockLink value={item.indexer.blockHeight} />,
          blockTime: <DateShow value={item.indexer.blockTime} />,
          action: <TxAction module={item.section} call={item.method} />,
          number: item.phase.value,
          method: $t(item.method) || item.method,
          type: $t(item.phase.type),
          args: item.meta.args,
          data: item.data
        }
      })}
      columns={[
        {
          title: $t('event_number'),
          dataIndex: 'sort'
        },
        {
          title: $t('ex_hash'),
          dataIndex: 'extrinsicHash'
        },
        {
          title: $t('event_action'),
          dataIndex: 'action'
        }
        /*
        {
          title: $t('stage'),
          dataIndex: 'type'
        },
        {
          title: $t('kind'),
          dataIndex: 'method'
        }
        */
      ]}
    />
  )
}
