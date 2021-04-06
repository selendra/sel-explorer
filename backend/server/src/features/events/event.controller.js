const { isNum } = require('../../utils')
const { isHash } = require('../../utils')
const { getExtrinsicCollection } = require('../../services/mongo')
const { isEventId, extractEvent } = require('./utils')
const { isMongoId } = require('../../utils')
const { extractPage } = require('../../utils')
const { getEventCollection } = require('../../services/mongo')
const { ObjectID } = require('mongodb')
class EventController {
  async getEvents(ctx) {
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0) {
      ctx.status = 400
      return
    }
    const col = await getEventCollection()
    const total = await col.estimatedDocumentCount()
    const blocks = await col
      .find({})
      .sort({ 'indexer.blockHeight': -1 })
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray()

    ctx.body = {
      items: blocks,
      page,
      pageSize,
      total
    }
  }

  async getBlockEvents(ctx) {
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0) {
      ctx.status = 400
      return
    }
    const { block } = ctx.query
    let query = {}
    if (block) {
      query = { 'indexer.blockHeight': parseInt(block) }
    }
    const col = await getEventCollection()
    const total = await col.countDocuments(query)
    const extrinsics = await col
      .find(query)
      .sort({ sort: 1 })
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray()

    ctx.body = {
      items: extrinsics,
      page,
      pageSize,
      total
    }
  }

  async getExtrinsicEvents(ctx) {
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0) {
      ctx.status = 400
      return
    }
    const { extrinsic_hash } = ctx.query
    let query = {}
    if (extrinsic_hash) {
      query = { extrinsicHash: extrinsic_hash }
    }
    const col = await getEventCollection()
    const total = await col.countDocuments(query)
    const events = await col
      .find(query)
      .sort({ 'indexer.blockHeight': -1, 'indexer.index': -1 })
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray()

    ctx.body = {
      items: events,
      page,
      pageSize,
      total
    }
  }

  async getEvent(ctx) {
    const { id } = ctx.params
    let query = {}
    if (isMongoId(id)) {
      query = ObjectID(id)
    } else if (isEventId(id)) {
      const { blockHeight, eventIndex } = extractEvent(id)
      query = { 'indexer.blockHeight': blockHeight, sort: eventIndex }
    }

    const col = await getEventCollection()
    ctx.body = await col.findOne(query)
  }
  async getSearchEvent(ctx) {
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0) {
      ctx.status = 400
      return
    }
    let { search } = ctx.params
    search = new RegExp(["^", search, "$"].join(""), "i");
    const col = await getEventCollection()
    const total = await col.find({$or:[{"method":search},{"section": search}]}).count()
    const data = await col
        .find({$or:[{method:search},{section: search}]})
        .sort({ 'indexer.blockHeight': -1})
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .toArray()
    ctx.body = {
      data,
      page,
      pageSize,
      total
    }
  }
}

module.exports = new EventController()
