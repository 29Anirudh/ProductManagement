import { useLocation, useNavigate } from 'react-router-dom';
import './SearchProducts.css'
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useEffect, useState } from 'react';

const SearchProducts = ({products,setProducts}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("query") || "";
  const navigate=useNavigate();
  const [deleteNotification,setDeleteNotification]=useState({message:null,type:''});
  const filteredProducts=products.filter((product)=>product.name.toLowerCase().includes(search.toLowerCase()));
  useEffect(()=>{
      window.scrollTo(0, 0);
    },[]);

  function handleDeleteInUI(id){
    setProducts((products)=>products.filter((product)=>product._id!==id));
  }
  return (
    <>
         {deleteNotification.message&&<Notification notification={deleteNotification} closeNotification={()=>setDeleteNotification({message:null,type:''})}/>}
        <div className="products">
            <Header title="Search Successful" subtitle={`Search Results for '${search}'`}/>
            {search.length!==0?(
                filteredProducts.length===0?(
                <>
                <h1 style={{textAlign:"center",alignContent:"center"}}>
                    No products found with name `{search}`
                </h1>
                <a style={{cursor:"pointer",color:"green",fontSize:"large",fontWeight:"bold",textDecoration:"underline"}} onClick={()=>navigate('/upload-product')}>Upload New Products</a>
                </>):
                (<ul className='all-products-cards'>
                    {filteredProducts.map((product,index)=>(
                    <ProductCard key={index} product={product} handleDeleteInUI={handleDeleteInUI}  setDeleteNotification={setDeleteNotification}/>
                    ))}
                </ul>)
            ):(
                <h1 style={{textAlign:"center",alignContent:"center"}}>
                    Nothing entered in Search
                </h1>
            )}
            
        </div>
    </>
  )
}

export default SearchProducts