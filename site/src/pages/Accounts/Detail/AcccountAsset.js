import React, { useMemo } from 'react'
import { Amount, Table } from '../../../components'
import api from '../../../services/api'

import { useLoadDetail } from '../../../utils/hooks'

import { useParams } from 'react-router-dom'
import $t from '../../../locale'
import { safeAdd } from '@src/shared'

export default function AccountAsset(props) {
  const { address } = useParams()
  const params = useMemo(() => [address], [address])

  const { detail: nativeAsset, loading } = useLoadDetail(
    api.fetchNativeAssets,
    params
  )
  const { detail: crossAsset, wait } = useLoadDetail(
    api.fetchCrossAssets,
    params
  )
  const width = document.documentElement.clientWidth
  const simple = width < 1024
  var display = 'none'
  if (crossAsset) {
    if (JSON.stringify(crossAsset[0]) === '{}') {
      display = 'none'
    } else {
      display = 'block'
    }
  }

  const nativeColumns = [
    {
      title: $t('ASSETNAME'),
      dataIndex: 'token'
    },
    {
      title: $t('usable'),
      dataIndex: 'usable',
      align: 'right'
    },
    {
      title: $t('reserved'),
      dataIndex: 'reserved',
      align: 'right'
    },
    {
      title: $t('frozen'),
      dataIndex: 'frozen',
      align: 'right'
    },
    // {
    //   title: $t('BLOCKTOTALBALANCE'),
    //   dataIndex: 'total',
    //   align: 'right'
    // }
  ]
  const otherColumns = [
    {
      title: $t('ASSETNAME'),
      dataIndex: 'token'
    },
    {
      title: $t('OriginChain'),
      dataIndex: 'originchain',
      align: 'right'
    },
    {
      title: $t('LOCKEDBALANCE'),
      dataIndex: 'lockedbalance',
      align: 'right'
    },
    {
      title: $t('ReservedBalance'),
      dataIndex: 'reversebalance',
      align: 'right'
    },
    {
      title: $t('DEXRESERVED'),
      dataIndex: 'dexspot',
      align: 'right'
    },
    {
      title: $t('withdrawalFreeze'),
      dataIndex: 'withdrawalFreeze',
      align: 'right'
    },
    {
      title: $t('usable'),
      dataIndex: 'usable',
      align: 'right'
    },
    {
      title: $t('BLOCKTOTALBALANCE'),
      dataIndex: 'total',
      align: 'right'
    }
  ]
  const OtherAsset = () => {
    return (
      <div>
        {display !== 'none' ? (
          <div>
            <div className="asset-title">{$t('CROSS_ASSET')}</div>
            <Table
              loading={loading}
              pagination={false}
              scroll={{
                x: '100vh'
              }}
              dataSource={
                crossAsset &&
                crossAsset.map(item => {
                  return {
                    key: item.token,
                    token: Object.keys(item)[0] === '1' ? 'BTC' : '',
                    originchain: 'Bitcoin',
                    lockedbalance: (
                      <Amount
                        value={item[1] ? item[1].Locked : '0'}
                        symbol={item.token}
                        hideSymbol={true}
                      />
                    ),
                    reversebalance: (
                      <Amount
                        value={item[1] ? item[1].Reserved : '0'}
                        symbol={item.token}
                        hideSymbol={true}
                      />
                    ),
                    dexspot: (
                      <Amount
                        value={item[1] ? item[1].ReservedDexSpot : '0'}
                        symbol={item.token}
                        hideSymbol={true}
                      />
                    ),
                    withdrawalFreeze: (
                      <Amount
                        value={item[1] ? item[1].ReservedWithdrawal : '0'}
                        symbol={item.token}
                        hideSymbol={true}
                      />
                    ),
                    usable: (
                      <Amount
                        value={item[1] ? item[1].Usable : '0'}
                        symbol={item.token}
                        hideSymbol={true}
                      />
                    ),
                    total: (
                      <Amount
                        value={
                          item[1]
                            ? item[1].Locked +
                              item[1].Reserved +
                              item[1].ReservedDexSpot +
                              item[1].ReservedWithdrawal +
                              item[1].Usable
                            : '0'
                        }
                        symbol={item.token}
                        hideSymbol={true}
                      />
                    )
                  }
                })
              }
              columns={otherColumns}
            />
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div>
        <Table
          loading={loading}
          pagination={false}
          scroll={{
            x: '100vh'
          }}
          dataSource={
            nativeAsset &&
            [{ ...nativeAsset, token: 'tSEL' }].map(item => {
              return {
                key: item.token,
                token: <div style={{ whiteSpace: 'nowrap' }}>{item.token}</div>,
                usable: (
                  // <Amount
                  //   value={item.data.free - item.data.miscFrozen}
                  //   symbol={item.token}
                  //   hideSymbol={true}
                  // />
                  <p>{item.data.free}</p> // from hash to toHuman()
                ),
                reserved: (
                  // <Amount
                  //   value={item.data.reserved}
                  //   symbol={item.token}
                  //   hideSymbol={true}
                  // />
                  <p>{item.data.reserved}</p> // from hash to toHuman()
                ),
                frozen: (
                  // <Amount
                  //   value={item.data.miscFrozen}
                  //   symbol={item.token}
                  //   hideSymbol={true}
                  // />
                  <p>{item.data.miscFrozen}</p> // from hash to toHuman()
                )
              }
            })
          }
          columns={nativeColumns}
        />
      </div>
      <div>
        <OtherAsset />
      </div>
    </div>
  )
}
