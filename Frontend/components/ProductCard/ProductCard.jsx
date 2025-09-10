import './ProductCard.css'
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DeleteBox from '../DeleteConfirmationBox/DeleteBox';
import axios from 'axios';

const ProductCard = ({product,handleDeleteInUI,setDeleteNotification}) => {
  const navigate=useNavigate();
  const [showDeleteBox,setShowDeleteBox]=useState(false);
  let API_URL=import.meta.env.VITE_BACKEND_URL;
  async function handleDelete() {
    try {
      const response = await axios.delete(`${API_URL}${product._id}`);
      if (response.data.success) {
        handleDeleteInUI(product._id);
        setShowDeleteBox(false);
        setDeleteNotification({ message: 'Deleted Successfully!', type: 'success' });
      } 
      else {
        setDeleteNotification({ message: 'Please try again later!!', type: 'error' });
      }
    } 
    catch (err) {
      setDeleteNotification({ message: 'Server error!!', type: 'error' });
    }
  }

  return (
    <>
    <div style={{position:"relative"}}>
      {showDeleteBox&&
        <DeleteBox 
          name={product.name} 
          setDelete={(confirm)=>{
            if(confirm) handleDelete()
            else setShowDeleteBox(false)
        }}
        />
      }
      <li className="product-card">
          <span className='product-category'>{product.category}</span>
          <img src={product.image} alt="PRODUCT-IMAGE" className="product-image"/>
          <div className='product-text'>
              <h2 className='product-name'>{product.name}</h2>
              <h2 className='product-price'>₹{product.price}</h2>
              <p className='product-desc'>{product.description}</p>
          </div>
          <div className="product-buttons">
            <FaRegEdit color='green' className='product-button' onClick={()=>navigate(`/edit-product/${product._id}`)}/>
            <MdDeleteForever size={20} color='red' className='product-button' onClick={()=>setShowDeleteBox(true)}/>
          </div>
      </li>
    </div>
    </>
  )
}

export default ProductCard