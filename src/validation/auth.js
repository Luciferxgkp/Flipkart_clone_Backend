const {check, validationResult}=require('express-validator');
exports.validatesignupRequest=[
    check('firstName').notEmpty().withMessage("firstname is required"),
    check('lastName').notEmpty().withMessage("lastname is required"),
    check('email').notEmpty().withMessage("email is required"),
    check('password').isLength({min:6}).withMessage("password must be 6 character long")
];
exports.validatesigninRequest=[
    check('email').notEmpty().withMessage("email is required"),
    check('password').isLength({min:6}).withMessage("password must be 6 character long")
];


exports.isRequestValidated=(req,res,next)=>{
    const errors =   validationResult(req);
    if(errors.array().length>0){
        return res.status(400).json({error:errors.array()[0].msg})
    }
    next();
}