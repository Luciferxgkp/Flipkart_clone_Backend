//Importing Components
const express = require('express');
const env=require('dotenv');
const app=express();
const mongoose = require('mongoose');
const authRoutes=require('./routes/auth');
const adminRoutes=require('./routes/admin/auth');
const categoryRoutes=require('./routes/categories')
const productRoutes=require('./routes/product')
const cartRoutes=require('./routes/cart');
const addressRoutes = require('./routes/address');
const path=require('path')
const cors =require('cors');
const pageRoutes = require('./routes/admin/page')
const initialDataRoutes = require('./routes/admin/initData');

mongoose.connect(
    `mongodb+srv://lucifer:lucifer@cluster0.z30px.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: false
    }
).then(()=>{
    console.log('Database Created');
}).catch((error)=>{
    console.log(error);
});


app.use(cors())
app.use(express.json())
env.config();
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',initialDataRoutes);
app.use('/api',pageRoutes);
app.use('/api',addressRoutes);


//Listning the port 
app.listen(2000,()=>{
    console.log(`Server is running at 2000`);
});

