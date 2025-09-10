import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header'


import './EditProduct.css'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import ProductForm from '../../components/UploadProductForm/ProductForm';

export const EditProduct = () => {
    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);
    const { id } = useParams(); 
    const API_URL=import.meta.env.VITE_BACKEND_URL;
    const [product,setProduct]=useState(null);
    useEffect(()=>{
        axios.get(`${API_URL}${id}`)
            .then(response=>setProduct(response.data.data))
            .catch(err=>console.log(err));
    },[]);
  return (
    <div className='edit-product'>
       <Header title="Edit the Product" subtitle="Edit your already existing products"/>
       <ProductForm editing={1} productData={product}/>
    </div>
  )
}