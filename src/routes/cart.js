const express=require('express')
const router=express.Router();
const slugify=require('slugify');
const { requireSignin, userMiddleware } = require('../common-middleware');
const {addItemToCart  ,getCartItems} = require('../controller/cart');

router.post('/user/cart/addtocart',requireSignin,userMiddleware,addItemToCart);
router.post('/user/cart/getCartItems',requireSignin,userMiddleware,getCartItems);

module.exports=router;