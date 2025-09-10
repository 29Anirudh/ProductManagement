import './ProductsSort.css';
import { BiSortUp } from "react-icons/bi";

const ProductsSort = ({length,order=false,handleOrder}) => {
  const buttonText=["( Low to High )","( High to Low )"]
  return (
    <div className='product-sort'>
        <span className='product-sort-text'>Showing Products({length})</span>
        <button className='product-sort-btn' onClick={handleOrder}><BiSortUp size={25}/>Sort By Price {buttonText[Number(order)]}</button>
    </div>
  )
}

export default ProductsSort