import { Route, Routes,Navigate } from 'react-router-dom'

import './App.css'

import Navbar from '../components/NavBar/Navbar'

import Products from '../Pages/Products/Products'
import { UploadProducts } from '../Pages/UploadProducts/UploadProducts'
import Footer from '../components/Footer/Footer'
import ErrorPage from '../Pages/ErrorPage/ErrorPage'
import { EditProduct } from '../Pages/EditProduct/EditProduct'
import SearchProducts from '../Pages/SearchProducts/SearchProducts'
import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const [products,setProducts]=useState([]);
  const [sortedProducts,setSortedProducts]=useState([]);
   const API_URL=import.meta.env.VITE_BACKEND_URL;
  const navItems=[
          {
              name:'Products',
              route:'/products',
          },
          {
              name:'Upload Products',
              route:'/upload-product'
          }
  
      ]
    useEffect(()=>{
      axios.get(`${API_URL}`)
      .then(response=>setProducts(response.data.data))
      .catch(err=>console.log(err));
    },[]);
    useEffect(() => {
      if (products.length > 0) {
        const sorted = [...products].sort((a, b) => a.price - b.price);
        setSortedProducts(sorted);
      }
    }, [products]);
  return (
    <>
    <Navbar navItems={navItems}/>
    <Routes>
      <Route path='/' element={<Navigate to='/products'/>}/>
      <Route path='/products' element={<Products products={sortedProducts} setProducts={setProducts}/>}/>
      <Route path='/upload-product' element={<UploadProducts/>}/>
      <Route path='/edit-product/:id' element={<EditProduct/>}/>
      <Route path='/search-product' element={<SearchProducts products={sortedProducts} setProducts={setProducts}/>}/>
      <Route path='*' element={<ErrorPage/>}/>
    </Routes>
    <Footer navItems={navItems}/>
    </>
  )
}

export default App
