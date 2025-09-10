import dotenv from "dotenv";
dotenv.config();
import express from "express";

import cors from "cors";
import { connectDB } from "./config/dbconnect.js";
import productRoutes from "./routes/productRoutes.js"



const app=express();

connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use('/api/products',productRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port ${process.env.PORT}`)
})