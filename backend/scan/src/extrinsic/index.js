const { extractUserTransfer } = require('../account')
const ignoreSectionNames = ['timestsamp']
const { extractVoteInfo, extractOrder } = require('../account')
const { isTransferExtrinsic } = require('./util')
const { extractCrossBlock } = require('./crossblock')
const { extractCrossTransaction } = require('./crosstransaction')

async function extractExtrinsicBusinessData(
  extrinsic,
  indexer,
  events,
  isSuccess
) {
  const hash = extrinsic.hash.toHex()
  const section = extrinsic.method.sectionName.toLowerCase()
  if (ignoreSectionNames.includes(section)) {
    return
  }

  const methodName = extrinsic.method.methodName.toLowerCase()
  const { args } = extrinsic.method.toJSON()
  const signer = extrinsic._raw.signature.get('signer').toString()

  console.log(`.....${section, methodName}.....`);

  if (!signer) {
    console.log('!signer')
    return
  }

  // if (isTransferExtrinsic(section, methodName)) {
  if (isTransferExtrinsic(section, methodName)) {
    console.log('Enter isTransferExtrinsic')
    await extractUserTransfer(extrinsic, indexer, signer, args, events)
  } else if (section === 'xStaking') {
    // Update xStaking list
    await extractVoteInfo(extrinsic, hash, indexer, signer, args)
  } else if (section === 'xSpot') {
    // Update Order
    await extractOrder(extrinsic, hash, indexer, name, signer, args)
    // } else if (section === 'xGatewayBitcoin' && methodName === 'pushHeader') {
  } else if (
    section === 'xgatewaybitcoin' &&
    methodName === 'pushheader' &&
    isSuccess === true
  ) {
    // 更新Bitcoin转接桥- 区块列表
    await extractCrossBlock(events, hash, indexer, signer)
  } else if (
    section === 'xgatewaybitcoin' &&
    methodName === 'pushtransaction' &&
    isSuccess === true
  ) {
    // 更新Bitcoin转接桥- 交易列表
    await extractCrossTransaction(events, hash, indexer, signer)
  }
}

module.exports = {
  extractExtrinsicBusinessData
}
