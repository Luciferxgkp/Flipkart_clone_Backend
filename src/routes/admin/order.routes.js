const express = require('express');
const router = express.Router();
const { requireSignin , adminMiddleware} = require('../../common-middleware');
const { updateOrder } = require('../../controller/admin/order.admin');

router.post(`/order/update`,requireSignin,adminMiddleware,updateOrder);
module.exports = router;