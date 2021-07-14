const mongoose=require('mongoose')
const categoriesSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String
    },
    categoryImage:{type:String},
    parentId:{
        type:String
    }
},{timestamps:true});

module.exports=mongoose.model('Category',categoriesSchema);