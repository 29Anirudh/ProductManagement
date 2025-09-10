import { Route, Routes,Navigate } from 'react-router-dom'

import './App.css'

import Navbar from '../components/NavBar/Navbar'

import Products from '../Pages/Products/Products'
import { UploadProducts } from '../Pages/UploadProducts/UploadProducts'
import Footer from '../components/Footer/Footer'
import ErrorPage from '../Pages/ErrorPage/ErrorPage'
import { EditProduct } from '../Pages/EditProduct/EditProduct'
import Notification from '../components/Notification/Notification'
function App() {
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
  return (
    <>
    <Navbar navItems={navItems}/>
    <Routes>
      <Route path='/' element={<Navigate to='/products'/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/upload-product' element={<UploadProducts/>}/>
      <Route path='/edit-product/:id' element={<EditProduct/>}/>
      <Route path='*' element={<ErrorPage/>}/>
    </Routes>
    <Footer navItems={navItems}/>
    </>
  )
}

export default App
