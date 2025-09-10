import express from "express";
import parser from "../middleware/uploadImage.js";
import { getAllProducts,createProduct,updateProduct,deleteProduct, getEachProduct } from "../controllers/ProductController.js";

const router=express.Router();

router.get('/',getAllProducts);

router.get('/:id',getEachProduct)

router.post('/',parser.single("image"),createProduct);

router.put('/:id',parser.single("image"),updateProduct);

router.delete('/:id',deleteProduct);

export default router;