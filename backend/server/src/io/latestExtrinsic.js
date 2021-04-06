const { FEED_INTERVAL } = require('./constant')
const { setLatestExtrinsics } = require('../store')
const { latestExtrinsicsRoom } = require('./constant')
const { getExtrinsicCollection } = require('../services/mongo')

const extrinsicSize = 10

async function feedLatestExtrinsics(io) {
  try {
    const col = await getExtrinsicCollection()
    let query = {
      $nor: [
        { section: 'timestamp' },
        { section: 'finalityTracker' },
        { section: 'imOnline' },
        { name: 'set' },
        { name: 'finalHint' },
        { name: 'heartbeat' }
      ]
    }

    const total = await col.countDocuments(query)
    if (total === 0) {
      query = {}
    }

    const extrinsics = await col
      .find(query)
      .sort({ 'indexer.blockHeight': -1, 'indexer.index': -1 })
      .limit(extrinsicSize)
      .toArray()

    const simpleExtrinsics = extrinsics.map(
      ({ signer, hash, section, name }) => {
        return {
          signer,
          hash,
          section,
          name
        }
      }
    )

    if (simpleExtrinsics.length > 0) {
      io.to(latestExtrinsicsRoom).emit('latestExtrinsics', simpleExtrinsics)
      setLatestExtrinsics(simpleExtrinsics)
    }
  } catch (e) {
    console.error(e)
  } finally {
    setTimeout(feedLatestExtrinsics.bind(null, io), FEED_INTERVAL)
  }
}

module.exports = {
  feedLatestExtrinsics
}
