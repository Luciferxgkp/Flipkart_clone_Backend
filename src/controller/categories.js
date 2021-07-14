const slugify=require('slugify');
const categories = require('../models/categories');
const shortid =require('shortid');

function createCategories(category,parentId=null){
    const categoryList  = [];
    let categories;
    if(parentId==null){
        categories=category.filter(cat => cat.parentId==undefined);
    }else{
        categories=category.filter(cat => cat.parentId==parentId);
    }
    for(let cate of categories){
        categoryList.push({
            _id:cate._id,
            name:cate.name,
            slug:cate.slug,
            parentId:cate.parentId,
            type:cate.type,
            children:createCategories(category,cate._id)
        })
    }
    return categoryList
}

exports.addCategory=(req,res)=>{
    const categoryObj= {
        name:req.body.name,
        slug:`${slugify(req.body.name)}-${shortid.generate()}`
    }

    if(req.file){
        categoryObj.categoryImage='http://localhost:2000/public/'+req.file.filename;
    }

    if(req.body.parentId){
         categoryObj.parentId=req.body.parentId;
         console.log()
    }
    const cat= new categories(categoryObj);
    console.log(cat);
    cat.save((error,categories)=>{
        if(error) return res.status(400).json({error});
        if(categories){
            return res.status(200).json({categories});
        }
    })
}


exports.getCategory=(req,res)=>{
    categories.find({})
    .exec((error,category)=>{
        if(error) return res.status(400).json({error});

        if(category){
            const categoryList=createCategories(category);
            res.status(200).json({categoryList});
        }
    })
}

exports.updateCategories = async  (req,res)=>{
    const {_id ,name,parentId,type} = req.body;
    const updatedCategories=[];
    if(name instanceof Array){
        for(let i=0; i< name.length ; i++){
            const category={
                name:name[i],
                type:type[i]
            };
            if(parentId[i] !== ""){
                category.parentId=parentId[i];
            }
            const updatedCategory=await categories.findOneAndUpdate({_id:_id[i]},category,{new:true});
            updatedCategories.push(updatedCategory);
            
        }
        res.status(201).json({updatedCategories});
    }else{
        const category={
            name,
            type
        };
        if(parentId !== ""){
            category.parentId=parentId;
        }
        const updatedCategory=await categories.findOneAndUpdate({_id},category,{new:true});
        updatedCategories.push(updatedCategory);
        return res.status(201).json({updatedCategories});
    }

}
exports.deleteCategories=async (req,res)=>{
    const {ids}=req.body.payload;
    const deletedCategories=[];
    for(let i=0;i<ids.length;i++){
        const deleteCategory= await categories.findOneAndDelete({_id:ids[i]._id});
        deletedCategories.push(this.deleteCategory);
    }
    if(deletedCategories.length == ids.length){
        res.status(200).json({message: 'Categories removed'});
    }
    else{
        res.status(400).json({message :"Something went wrong"});
    }
    
}