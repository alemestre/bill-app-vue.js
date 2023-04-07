const express = require('express')
const router = express.Router()

// on charge les middlewares externe
const verifyId = require ("../middleware/verifyId")
const verifyBillMandatoryParams = require ("../middleware/verifyBillMandatoryParams")

// we import the route controller

const billController = require("../controllers/bill")

router.get('/', billController.getItems)

router.get('/limit', billController.getLastFiveItems )

router.get('/:id', verifyId, billController.getItem)

router.patch('/:id', verifyId, verifyBillMandatoryParams,  billController.patchItem)

router.post('/', verifyBillMandatoryParams, billController.postItem)

router.delete('/:id', verifyId, billController.deleteItem)

module.exports = router