const express = require('express')
const router = express.Router()
const customController = require('../controllers/customController.js')

router.get('/customProduct', customController.index)

module.exports = router