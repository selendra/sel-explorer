const { updateDepthByEvents } = require('./dex/depth')
const { deleteDataFrom } = require('./rollback')
const { isExtrinsicSuccess } = require('./events/utils')
const { u8aToHex } = require('@polkadot/util')
const { sleep, logger } = require('./util')
const { extractExtrinsicBusinessData } = require('./extrinsic')
const { extractExtrinsicEvents } = require('./events/utils')
const { init } = require('./init')

const {
  getExtrinsicCollection,
  getBlockCollection,
  getEventCollection,
  getErrorBlockCollection,
  getFirstScanHeight,
  updateScanHeight,
  updateLatestHeight,
  updateIndexedHeight
} = require('./mongoClient')
const { getApi, disconnect } = require('./api')
const {
  updateHeight,
  getLatestHeight,
  getUnSubscribeNewHeadFunction
} = require('./latestHead')
const { updateAssetsInfo } = require('./assetsInfo')
const { updateChainProperties } = require('./chainProperties')
const {
  extractAuthor,
  extractBlockTime,
  findNonForkHeight
} = require('./block')
const {
  listenAndUpdateValidators,
  getUnSubscribeValidatorsFunction
} = require('./validatorsInfo')

const { extractEventBusinessData } = require('./events')

const { updateTrusteeList, updateDepositMineInfo } = require('./updateData')

let preBlockHash = null

async function main() {
  // Update block height
  console.time('a')
  await updateHeight()
  console.timeEnd('a')
  // Initialize the SDK
  console.time('b')
  let api
  let apiLoop = true
  while (apiLoop) {
    try {
      api = await getApi()
      apiLoop = false
    } catch (e) {
      logger.info('get API failed: ', e.message)
      await sleep(1000)
      continue
    }
  }
  console.timeEnd('b')
  console.time('c')
  await updateChainProperties()
  console.timeEnd('c')
  // Monitor and update validators
  // await listenAndUpdateValidators()
  // Get the height of the first scan block
  console.time('d')
  let scanHeight = await getFirstScanHeight()
  console.timeEnd('d')
  console.log('scanHeight', scanHeight)
  console.time('e')
  await deleteDataFrom(scanHeight)
  await init(scanHeight)
  console.timeEnd('e')

  while (true) {
    console.time('f')
    const chainHeight = getLatestHeight()
    console.timeEnd('f')
    if (scanHeight > chainHeight) {
      // If the height to be retrieved is greater than the current maximum height, wait a while
      console.log('scanHeigth > chainHeight')
      await sleep(1000)
      continue
    }

    console.time('g')
    let blockHash
    try {
      blockHash = await api.rpc.chain.getBlockHash(scanHeight)
      console.log('try blockhash end')
    } catch (e) {
      console.log(e.message)
      console.log('try blochash failed')
      await sleep(1000)
      continue
    }
    console.timeEnd('g')

    if (!blockHash) {
      // Under normal circumstances, this situation should not occur. The above has already judged `scanHeight> chainHeight`
      console.log('blockhash null')
      await sleep(1000)
      continue
    }

    console.time('h')
    let block
    try {
      block = await api.rpc.chain.getBlock(blockHash)
      console.log('try get block end')
    } catch (e) {
      logger.info('get block failed: ', e.message)
      await sleep(1000)
      continue
    }
    console.timeEnd('h')

    if (
      preBlockHash &&
      block.block.header.parentHash.toString('hex') !== preBlockHash
    ) {
      // A fork occurs, the parentHash of the current block is not equal to the hash of the previous block in the database
      console.log('fork happened')
      const nonForkHeight = await findNonForkHeight(scanHeight)
      await updateScanHeight(nonForkHeight)
      scanHeight = nonForkHeight + 1
      preBlockHash = null
      await deleteDataFrom(scanHeight)
      continue
    }

    console.time('i')
    const validators = await api.query.session.validators.at(blockHash)
    console.timeEnd('i')
    console.time('j')
    const author = extractAuthor(validators, block.block.header)
    console.timeEnd('j')

    logger.info('indexing block:', block.block.header.number.toString())
    let indexedBlockHeight
    indexedBlockHeight = await block.block.header.number.toNumber()

    console.time('k')
    try {
      console.log('try handle block start')
      await handleBlock(block.block, author)
      console.log('try handle block end')
    } catch (e) {
      logger.info('handle block failed: ', e.message)
      /*
      const errorBlockCol = await getErrorBlockCollection()
      const errMessage = e.message
      const errorBlock = block.block
      const doc = {
        errorBlock,
        author,
        errMessage
      }
      await errorBlockCol.insertOne(doc)
      scanHeight = scanHeight + 1
      await updateScanHeight(scanHeight)cd
      */
      // await sleep(1000)
      // continue
    }
    preBlockHash = block.block.hash.toHex()
    console.timeEnd('k')

    console.time('l')
    await updateIndexedHeight(indexedBlockHeight)
    await updateLatestHeight(chainHeight)
    await updateAssetsInfo(scanHeight)

    await updateScanHeight(scanHeight++)
    console.timeEnd('l')
    console.time('m')
    if (chainHeight % 4 === 0) {
      await updateTrusteeList(blockHash)
      await updateDepositMineInfo(blockHash)
      await listenAndUpdateValidators(chainHeight)
    }
    console.timeEnd('m')
  }
}

async function handleEvents(events, indexer, extrinsics) {
  if (events.length <= 0) {
    return
  }

  const eventCol = await getEventCollection()
  const bulk = eventCol.initializeOrderedBulkOp()
  for (let sort = 0; sort < events.length; sort++) {
    const { event, phase, topics } = events[sort]
    const phaseType = phase.type
    let [phaseValue, extrinsicHash, eventExtrinsic] = [null, null, null]
    if (!phase.isNull) {
      // phaseValue = phase.isNull ? null : phase.value
      phaseValue = phase.isNull ? null : phase.value.toNumber()
      extrinsicHash = extrinsics[phaseValue].hash.toHex()
      eventExtrinsic = extrinsics[phaseValue]
    }

    const index = parseInt(event.index)
    const meta = event.meta ? event.meta.toJSON() : {}
    const section = event.section
    const method = event.method
    const data = event.data.toHuman()

    await extractEventBusinessData(event, indexer, eventExtrinsic)

    bulk.insert({
      indexer,
      extrinsicHash,
      phase: {
        type: phaseType,
        value: phaseValue
      },
      sort,
      index,
      section,
      method,
      meta,
      data,
      topics
    })
  }

  const result = await bulk.execute()
  if (result.result && !result.result.ok) {
    // TODO: 处理插入不成功的情况
  }
}

async function handleBlock(block, author) {
  // Get the hash of the block
  const hash = block.hash.toHex()
  const blockJson = block.toJSON()
  // Get the height of the block
  const blockHeight = block.header.number.toNumber()
  // Get block transaction time
  const blockTime = extractBlockTime(block.extrinsics)
  // Assembly blockhHeight, blockHash, blockTime synthetic index
  const blockIndexer = { blockHeight, blockHash: hash, blockTime }

  const api = await getApi()
  let allEvents = {}
  try {
    allEvents = await api.query.system.events.at(hash)
  } catch (e) {
    logger.info('get all events failed: ', e.message)
    allEvents = {}
    // await sleep(1000)
  }
  await handleEvents(allEvents, blockIndexer, block.extrinsics)
  // await updateDepthByEvents(allEvents)

  const blockCol = await getBlockCollection()
  const result = await blockCol.insertOne({
    hash,
    blockTime,
    author,
    ...blockJson
  })
  if (result.result && !result.result.ok) {
    // FIXME: 处理插入不成功的情况
  }

  let index = 0
  for (const extrinsic of block.extrinsics) {
    const events = extractExtrinsicEvents(allEvents, index)

    await handleExtrinsic(
      extrinsic,
      {
        blockHeight,
        blockHash: hash,
        blockTime,
        index: index++
      },
      events
    )
  }

  //console.log(`block ${blockHeight} inserted.`)
}

/**
 *
 * Parse and process transactions
 *
 */
async function handleExtrinsic(extrinsic, indexer, events) {
  // TODO: Use events to determine whether the transaction is executed successfully
  const hash = extrinsic.hash.toHex()
  const callIndex = u8aToHex(extrinsic.callIndex)
  const { args } = extrinsic.method.toHuman()
  const name = extrinsic.method.methodName
  const section = extrinsic.method.sectionName
  let signer = extrinsic._raw.signature.get('signer').toString()
  // If the parsing length of the signer is incorrect, the transaction is an unsigned transaction
  if (signer.length < 48) {
    signer = ''
  }
  console.log(`${name, section}..!...`)
  const isSuccess = isExtrinsicSuccess(events)
  await extractExtrinsicBusinessData(extrinsic, indexer, events, isSuccess)

  const version = extrinsic.version
  const data = u8aToHex(extrinsic.data) // Raw data

  const doc = {
    hash,
    indexer,
    signer,
    section,
    name,
    callIndex,
    version,
    args,
    data,
    isSuccess
  }

  const exCol = await getExtrinsicCollection()
  const result = await exCol.insertOne(doc)
  if (result.result && !result.result.ok) {
    // FIXME: 处理交易插入不成功的情况
  }
}

main()
  .then(r => {
    // TODO:
  })
  .catch(err => {
    // TODO:
    console.error(err)
  })
  .finally(cleanUp)

function cleanUp() {
  console.log('clean up')
  const unsubscribeNewHead = getUnSubscribeNewHeadFunction()
  if (typeof unsubscribeNewHead === 'function') {
    unsubscribeNewHead()
  }
  const unSubscribeValidators = getUnSubscribeValidatorsFunction()
  if (typeof unSubscribeValidators === 'function') {
    unSubscribeValidators()
  }
  disconnect()
  process.exit(0)
}

process.on('SIGINT', cleanUp)
