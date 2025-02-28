const express = require('express');
const { getOrderInformation } = require('../controllers/orders');
const router = express.Router();

router.route('/:id').get(getOrderInformation);

module.exports = router;
