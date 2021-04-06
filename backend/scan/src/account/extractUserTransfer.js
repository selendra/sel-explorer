const { getTransferColCollection } = require('../mongoClient')
const { isExtrinsicSuccess } = require('../events/utils')
const { getAssetInfoById } = require('../dbService')
const { getChainProperties } = require('../chainProperties')

module.exports = async function extractUserTransfer(
  extrinsic,
  indexer,
  signer,
  args,
  events
) {
  if (!isExtrinsicSuccess(events)) {
    // The transaction was not executed successfully
    console.log('The transaction was not executed successfully')
    return
  }

  const properties = getChainProperties()
  let [token, assetId] = [properties.tokenSymbol, 0]

  const section = extrinsic.method.sectionName.toLowerCase()
  if (section === 'xassets') {
    assetId = args.id + ''
    const asset = await getAssetInfoById(assetId)
    if (!asset) {
      throw new Error(`Can not find asset for asset id: ${assetId}`)
    }
    token = asset.info.token
  }

  const hash = extrinsic.hash.toHex()
  const exCol = await getTransferColCollection()
  const data = {
    indexer,
    extrinsicHash: hash,
    assetId,
    token,
    from: signer,
    to: args.dest,
    value: args.value
  }
  const result = await exCol.insertOne(data)
  if (result.result && !result.result.ok) {
    // TODO: Handling the unsuccessful insert
  }
}
