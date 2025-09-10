import { useEffect } from 'react'
import Header from '../../components/Header/Header'
import ProductForm from '../../components/UploadProductForm/ProductForm'

import './UploadProducts.css'

export const UploadProducts = ({products,setProducts}) => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);
  
  return (
    <div className='upload-product'>
       <Header title="Upload New Product" subtitle="Add your product details to showcase in our marketplace"/>
       <ProductForm products={products} setProducts={setProducts}/>
    </div>
  )
}
