const Router = require('koa-router')
const eventController = require('./event.controller')

const router = new Router()
router.get('/events', eventController.getEvents)
router.get('/events/:id', eventController.getEvent)
router.get('/blockEvents', eventController.getBlockEvents)
router.get('/extrinsicEvents', eventController.getExtrinsicEvents)
router.get(`/search/:search`,eventController.getSearchEvent)
module.exports = router
