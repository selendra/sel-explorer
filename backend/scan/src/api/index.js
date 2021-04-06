const { ApiPromise, WsProvider } = require('@polkadot/api')
const { logger } = require('../util')

let provider = null
let api = null

async function getApi() {
  if (!api) {
    const ws_endpoint = 'wss://rpc-testnet.selendra.org'
    const ws_dev = 'ws://127.0.0.1:9944'
    provider = new WsProvider(ws_endpoint)
    logger.info('Connecting to Node at ', ws_endpoint)
    api = await ApiPromise.create({ provider })
  }

  return api
}

async function disconnect() {
  if (provider) {
    provider.disconnect()
  }
}

module.exports = {
  getApi,
  disconnect
}
