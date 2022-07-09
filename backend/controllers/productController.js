import asyncHandler from "express-async-handler";
import Product from '../models/productModel.js'

const getProducts= asyncHandler(async (req,res)=>{
    const products=await Product.find({});
    res.json(products);
})

const getProductById=asyncHandler(async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }else{
            res.status(404).json({message:'Product Not Found'});
        }
    }catch(error){
        console.error(`${error}.red.bold`);
        res.status(500).json({message:'something went wrong'})

    }
})

const deleteProduct=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({message:'Product Removed'})

    }else{
        res.status(404)
        throw new Error('product not found')
    }
})

const createProduct=asyncHandler(async(req,res)=>{
    const product=new Product({
        name:'sample Product',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'sample brand',
        category:'sample category',
        countInStock:0,
        numReviews:0,
        description:'sample description',
    })

    const createdProduct=await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct=asyncHandler(async(req,res)=>{
    const {name,price,description,image,brand,category,countInStock}=req.body

    const product=await Product.findById(req.params.id)

    if (product){
        product.name=name,
        product.price=price,
        product.description=description,
        product.image=image,
        product.brand=brand,
        product.category=category,
        product.countInStock=countInStock

        const updateProduct=await product.save()
        res.json(updateProduct)

    }else{
        res.status(404)
        throw new Error('product not found')
    }
})

const createProductReview=asyncHandler(async(req,res)=>{
    const {rating,comment}=req.body

    const product=await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed=product.reviews.find((review)=>
        review.user.toString()=== req.user._id.toString())

        if(alreadyReviewed){
            res.status(400);
            throw new Error('Product Already Exists')
        }

        const review={
            name:req.user.name,
            rating:+rating,
            comment,
            user:req.user._id,
        }

        product.reviews.push(review)
        product.numReviews=product.reviews.length

        product.rating=product.reviews.reduce((acc,curval)=>curval.rating+acc,0)/product.reviews.length;

        await product.save()
        res.status(201).json({message:'Review Added'})
    }else{
        res.status(404)
        throw new Error('product not found')
    }
})
export {getProducts,getProductById,deleteProduct,createProduct,updateProduct,createProductReview}