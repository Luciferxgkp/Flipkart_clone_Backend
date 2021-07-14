const express=require('express');
const { validatesignupRequest, isRequestValidated, validatesigninRequest } = require('../../validation/auth');
const router=express.Router();
const {signup,signin, signout}=require('../../controller/admin/auth');
const { requireSignin } = require('../../common-middleware');

router.post('/admin/signin',validatesigninRequest,isRequestValidated,signin);
router.post('/admin/signup',validatesignupRequest,isRequestValidated,signup);
router.post('/admin/signout',signout);

module.exports=router;