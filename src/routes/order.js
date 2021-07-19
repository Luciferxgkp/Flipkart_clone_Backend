const { addOrder, getOrder } = require("../controller/order");
const {requireSignin,userMiddleware} =  require('../common-middleware')
const router = require("express").Router();

router.post('/addOrder',requireSignin,userMiddleware,addOrder);
router.get('/getOrders',requireSignin,userMiddleware,getOrder);

module.exports=router