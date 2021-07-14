const jwt=require('jsonwebtoken');
const multer=require('multer');
const path=require('path');
const shortid=require('shortid');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate()+'-'+file.originalname)
    }
  })
exports.upload=multer({storage});

exports.requireSignin=(req,res,next)=>{

    if(req.headers.authorization){
        const token=req.headers.authorization.split(" ")[1];
        const user=jwt.verify(token,'MERNSECRET');
        req.user=user;
        
    }else{
        return res.status(400).json({message:'authorization required'})
    }
    next();
   
}
exports.userMiddleware=(req,res,next)=>{
    if(req.user.role!=='user'){
        return res.status(400).json({message:'Access Denied'})
    
    }
    next()
}
exports.adminMiddleware=(req,res,next)=>{
    if(req.user.role!=='admin'){
        return res.status(400).json({message:'Access Denied'})
    
    }
    next()
}