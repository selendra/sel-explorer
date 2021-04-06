const { getExtrinsicCount } = require('./utils')
const { encodeAddress } = require('../../utils')
const { getNativeAsset } = require('./utils')
const { safeAdd } = require('../../utils')
const { getDb } = require('../../services/mongo')
const { getApi } = require('../../api')
const { extractPage } = require('../../utils')

const { Account } = require('@chainx-v2/account')

class AccountsController {
  async getAccounts(ctx) {
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0) {
      ctx.status = 400
      return
    }

    const db = await getDb()
    const col = await db.collection('accounts')

    const query = {}

    const total = await col.estimatedDocumentCount(query)

    let items = await col
      .find(query)
      .sort({ blockHeight: -1 })
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray()

    const api = await getApi()
    let addressArray = []
    for (let i = 0; i < items.length; i++) {
      const addr = items[i].address
      addressArray.push(addr)
    }
    const allAccountInfo = await api.query.system.account.multi(addressArray)
    // console.log('all account info', allAccountInfo)

    /*
    for (let i = 0; i < items.length; i++) {
      const addr = items[i].address
      const accountInfo = await api.query.system.account(addr)
      const json = accountInfo.toJSON()
      items[i].data = json.data
    }
    */

    for (let i = 0; i < items.length; i++) {
      items[i].data = allAccountInfo[i].data
    }

    ctx.body = {
      items,
      page,
      pageSize,
      total
    }
    /*
    const col = await db.collection('nativeAsset')
    // const total = await col.estimatedDocumentCount()
    const accounts = await new Promise((resolve, reject) => {
      col.aggregate(
        [
          { $sort: { blockHeight: -1 } },
          {
            $group: {
              _id: '$address',
              blockHeight: { $first: '$blockHeight' },
              free: { $first: '$free' },
              reserved: { $first: '$reserved' },
              miscFrozen: { $first: '$miscFrozen' },
              feeFrozen: { $first: '$feeFrozen' },
              dexReserved: { $first: '$dexReserved' },
              stakingReserved: { $first: '$stakingReserved' }
            }
          },
          { $sort: { free: -1 } },
          { $skip: page * pageSize },
          { $limit: pageSize }
        ],
        (err, cursor) => {
          if (err) {
            reject(err)
          } else {
            cursor.toArray((err, docs) => {
              if (err) {
                reject(err)
              } else {
                resolve(docs)
              }
            })
          }
        }
      )
    })

    const total = accounts.length

    ctx.body = {
      items: accounts.map(a => ({
        address: a._id,
        ...a,
        total: safeAdd(a.free, a.reserved)
      })),
      page,
      pageSize,
      total
    }
    */
  }

  async getAccount(ctx) {
    const { addressOrId } = ctx.params
    if (!addressOrId) {
      ctx.body = {
        errMsg: 'Invalid address or account id'
      }
      return
    }

    const isAddress = !addressOrId.startsWith('0x')
    if (isAddress && !Account.isAddressValid(addressOrId)) {
      ctx.body = {
        errMsg: 'illegal address or account id'
      }
      return
    }

    const address = isAddress ? addressOrId : encodeAddress(addressOrId)
    const extrinsicCount = await getExtrinsicCount(address)
    const nativeAsset = await getNativeAsset(addressOrId)

    ctx.body = {
      ...nativeAsset,
      extrinsicCount
    }
  }

  //TODO 获取资产信息
  async getAssets(ctx) {
    const { address: addressOrId } = ctx.params
    const isAddress = !addressOrId.startsWith('0x')
    if (isAddress && !Account.isAddressValid(addressOrId)) {
      ctx.body = {
        errMsg: 'illegal address or account id'
      }
      return
    }

    const address = isAddress ? addressOrId : encodeAddress(addressOrId)
    const api = await getApi()
    const accountInfo = await api.query.system.account(address)
    // console.log('account info', accountInfo.toJSON())

    // const assetInfo = await api.rpc.xassets.getAssetsByAccount(address)
    // console.log('foreign asset info', assetInfo.toJSON())

    ctx.body = await getNativeAsset(address)
    ctx.body = { ...accountInfo.toHuman() } // fix balance too big
  }
  //TODO 获取其他资产信息
  async getCrossAssets(ctx) {
    // const { address: addressOrId } = ctx.params
    // const isAddress = !addressOrId.startsWith('0x')
    // if (isAddress && !Account.isAddressValid(addressOrId)) {
    //   ctx.body = {
    //     errMsg: 'illegal address or account id'
    //   }
    //   return
    // }

    // const address = isAddress ? addressOrId : encodeAddress(addressOrId)
    // const api = await getApi()
    // const accountInfo = await api.rpc.xassets.getAssetsByAccount(address)
    // const accountInfoJSON = accountInfo.toJSON()
    // ctx.body = [accountInfoJSON]
  }

  async getAccountType(ctx) {
    const { address } = ctx.params
    const db = await getDb()
    const validatorCol = await db.collection('validators')
    const trusteeCol = await db.collection('trustees')

    const trustees = await trusteeCol.find({}).toArray()
    const trusteeAddressList = trustees.map(item => {
      return item.address
    })

    const validatorQuery = { isValidating: true }
    const validatorItems = await validatorCol.find(validatorQuery).toArray()
    const validatorAddressList = validatorItems.map(item => {
      return item.account
    })

    const unsettledQuery = { isValidating: false }
    const unsettledItems = await validatorCol.find(unsettledQuery).toArray()
    const unsettledAddressList = unsettledItems.map(item => {
      return item.account
    })

    let validator = false
    let unsettled = false
    let trust = false

    if (trusteeAddressList.includes(address)) {
      trsut = true
    }
    if (validatorAddressList.includes(address)) {
      validator = true
    }
    if (unsettledAddressList.includes(address)) {
      unsettled = true
    }
    let data = {
      trust,
      unsettled,
      validator
    }
    ctx.body = {
      data
    }
  }

  async getBalanceHistory(ctx) {
    const { account } = ctx.params
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0) {
      ctx.status = 400
      return
    }

    const api = await getApi()
    const db = await getDb()
    const col = await db.collection('status')
    const status = await col.find({}).toArray()

    const lastHeight = status[0].indexedHeight
    let HeightArray = []
    const firstHeight = lastHeight % 14400
    // HeightArray.push(firstHeight)
    const length = parseInt(lastHeight / 14400)
    for (let i = 0; i <= length; i++) {
      HeightArray.push(14400 * i)
    }
    HeightArray.push(lastHeight)

    function group(array, subGroupLength) {
      let index = 0
      let newArray = []
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)))
      }
      return newArray
    }
    let groupArray = group(HeightArray, 5) || []
    // console.log('group array', groupArray)
    // console.log('length', groupArray.length)
    let now = [...groupArray].pop()
    // console.log('page', page)
    if (page > 0 && page <= groupArray.length) {
      now = groupArray[groupArray.length - page]
    }
    // console.log('now', now)
    let hashArray = []
    for (let i = 0; i < now.length; i++) {
      const col = await db.collection('block')
      const hash = await col.find({ 'header.number': now[i] }).toArray()
      hashArray.push(...hash)
    }
    let newHash = hashArray.map(item => item.hash)
    let balance = []
    for (let i = 0; i < newHash.length; i++) {
      let scanvalue = await api.query.system.account.at(newHash[i], account)
      balance.push(
        (scanvalue.data.free.toNumber() + scanvalue.data.reserved.toNumber()) /
          100000000
      )
    }
    let data = []
    for (let i = 0; i < now.length; i++) {
      data.push({ height: now[i], balance: balance[i] })
    }
    ctx.body = {
      data
    }
  }
}

module.exports = new AccountsController()
