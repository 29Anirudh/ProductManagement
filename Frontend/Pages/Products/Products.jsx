import ProductCard from '../../components/ProductCard/ProductCard'
import Header from '../../components/Header/Header'

import './Products.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Notification from '../../components/Notification/Notification'
import { useNavigate } from 'react-router-dom'

const Products = () => {
  const [deleteNotification,setDeleteNotification]=useState({message:null,type:''});
  const [products,setProducts]=useState([]);
  const API_URL=import.meta.env.VITE_BACKEND_URL;
  useEffect(()=>{
    window.scrollTo(0, 0);
    axios.get(`${API_URL}`)
      .then(response=>setProducts(response.data.data))
      .catch(err=>console.log(err));
  },[]);
  function handleDeleteInUI(id){
    setProducts((products)=>products.filter((product)=>product._id!==id));
  }
  const navigate=useNavigate();
  return (
    <>
        {deleteNotification.message&&<Notification notification={deleteNotification} closeNotification={()=>setDeleteNotification({message:null,type:''})}/>}
        <div className="products">
            <Header title="Discover Amazing Products" subtitle="Explore our curated collection of high-quality products designed to enhance your lifestyle and productivity"/>
            {products.length===0?(
              <>
                <h1 style={{textAlign:"center",alignContent:"center"}}>
                  No products found!!!
                </h1>
                <a style={{cursor:"pointer",color:"green",fontSize:"large",fontWeight:"bold",textDecoration:"underline"}} onClick={()=>navigate('/upload-product')}>Upload New Products</a>
              </>):
            (<ul className='all-products-cards'>
              {products.map((product,index)=>(
                <ProductCard key={index} product={product} handleDeleteInUI={handleDeleteInUI}  setDeleteNotification={setDeleteNotification}/>
              ))}
            </ul>)
}
        </div>
    </>
  )
}

export default Products