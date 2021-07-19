const Products = require("../../models/products");
const Category = require("../../models/categories");
const Order = require('../../models/order');
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
            type: cate.type,
            children:createCategories(category,cate._id)
        })
    }
    return categoryList
}

exports.initialData = async (req, res) => {
    const categories = await Category.find({}).exec();
    const products = await Products.find({})
    .select('_id name price quantity slug description productPictures category')
    .populate({path:'category' , select:'_id name'})
    .exec();
    const orders = await Order.find({}).exec();
    res.status(200).json({
        categories:createCategories(categories),
        products,
        orders
    })
}