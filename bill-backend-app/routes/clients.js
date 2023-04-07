const express = require('express')
const router = express.Router()

// on charge les middlewares externe
const verifyId = require ("../middleware/verifyId")
const verifyClientMandatoryParams = require ("../middleware/verifyClientMandatoryParams")


// we import the route controller
const clientController = require("../controllers/client")

router.get('/', clientController.getClients)

router.get('/limit', clientController.getLastFiveClients)

router.get('/:id', verifyId, clientController.getClient)

router.patch('/:id', verifyId, verifyClientMandatoryParams, clientController.patchClient)

router.post('/', verifyClientMandatoryParams, clientController.postClient)

router.delete('/:id', verifyId, clientController.deleteClient)

module.exports = router