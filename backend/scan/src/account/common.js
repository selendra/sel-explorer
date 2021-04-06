const { getApi } = require('../api')
/**
 *
 * @return  balance { free, reserved, miscFrozen,feeFrozen }
 * */
async function getPCXAssetByAccount(address) {
  if (!address) {
    return
  }
  const api = await getApi()
  const balance = await api.query.system.account(address)
  return balance.data.toJSON()
}

async function getAllAssetByAccount(address) {}

module.exports = {
  getPCXAssetByAccount,
  getAllAssetByAccount
}
