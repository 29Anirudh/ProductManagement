import Product from "../models/Product.js";

export const getAllProducts = async(req,res)=>{
    try{
        
        const products= await Product.find().sort({createdAt:-1});
        if(products.length===0){
            return res.status(404).json({success:false,data:{},message:"No data found."});
        }
        res.status(200).json({success:true,data:products,message:"Fetched data succesfully."})
    }
    catch(err){
        res.status(500).json({success:false,data:{},message:"Server is not responding.Please try again."})
    }
}
export const getEachProduct=async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const createProduct=async(req,res)=>{
    try{
        const {name,price,description,category}=req.body;
        if(!req.file){
            return res.status(400).json({success:false,message:"Image not uploaded."});
        }
        const product=await Product.create({
            name,
            price,
            description,
            category,
            image:req.file.path,
        });
        res.status(201).json({success:true,data:product,message:"Created successfully."});
    }
    catch(err){
        res.status(500).json({success:false,message:"Server error."});
    }
}

export const updateProduct=async(req,res)=>{
    try{
        const updates=req.body;
        if(req.file){
            updates.image=req.file.path;
        }
        const updatedProduct=await Product.findByIdAndUpdate(req.params.id,updates,{new:true});
        if(!updatedProduct){
            return res.status(404).json({success:false,data:{},message:"No product found."})
        }
        res.status(200).json({success:true,data:updatedProduct,message:"Updated Successfully."})
    }
    catch(err){
        res.status(500).json({success:false,data:{},message:"Server error."});
    }
}

export const deleteProduct=async(req,res)=>{
    try{
        const deletedProduct=await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct){
            return res.status(404).json({success:false,data:{},message:"No product found!"});
        }
        res.status(200).json({success:true,data:deletedProduct,message:"Deleted successfully"});
    }
    catch(err){
        res.status(500).json({success:false,data:{},message:"Server error"});
    }
}