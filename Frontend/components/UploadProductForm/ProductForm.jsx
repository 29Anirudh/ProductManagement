import { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./ProductForm.css";
import { FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification";

const ProductForm = ({ editing = false, productData = null,products,setProducts }) => {
  const [uploadNotification,setUploadNotification]=useState({
    message:null,
    type:null
  });
  const navigate=useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [uploadButtonText, setUploadButtonText] = useState(null);
  const categories = [
    "Audio",
    "Wearables",
    "Accessories",
    "Furniture",
    "Smart Home",
    "Gaming",
    "Lifestyle",
    "Electronics",
    "Health",
    "Sports",
  ];

  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadProduct, setUploadProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const [uploadProductError, setUploadProductError] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(false);
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (editing && productData) {
      setUploadProduct({
        name: productData.name || "",
        price: productData.price || "",
        description: productData.description || "",
        category: productData.category || "",
        image: null,
      });
      setImagePreview(productData.image || "");
    }
  }, [editing, productData]);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setUploadProduct({ ...uploadProduct, image: imageFile });
      setImagePreview(URL.createObjectURL(imageFile));
    }
  };

  function handleImageClick() {
    fileInputRef.current.click();
  }

  function handleChange(e) {
    const updatedProduct = {
      ...uploadProduct,
      [e.target.name]: e.target.value,
    };
    setUploadProduct(updatedProduct);
    handleProductCheck(updatedProduct);
  }

  function handleProductCheck(updatedProduct) {
    let flag = 0;
    const err = {
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
    };

    if (!updatedProduct.name.trim()) {
      err.name = "Name required";
      flag = 1;
    }
    if (!updatedProduct.price || Number(updatedProduct.price) === 0) {
      err.price = "Price must be >0";
      flag = 1;
    }
    if (!/^\d+(\.\d+)?$/.test(updatedProduct.price)) {
      err.price = "Price must be a number";
      flag = 1;
    }
    if (!updatedProduct.description.trim()) {
      err.description = "Description required";
      flag = 1;
    }
    if (!updatedProduct.category.trim()) {
      err.category = "Select category";
      flag = 1;
    }
    if (!updatedProduct.image && !editing) {
      err.image = "Image required";
      flag = 1;
    }

    setUploadProductError(err);
    return flag === 0;
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!handleProductCheck(uploadProduct)){
      setUploadError('Something is wrong in the input.'); 
      setUploadSuccess(null);
      return;
    }

    setUploadButtonText(editing ? "Updating..." : "Submitting...");

    try {
      const formData = new FormData();
      formData.append("name", uploadProduct.name);
      formData.append("price", Number(uploadProduct.price));
      formData.append("description", uploadProduct.description);
      formData.append("category", uploadProduct.category);
      if (uploadProduct.image) formData.append("image", uploadProduct.image);

      const res = editing
        ? await axios.put(`${API_URL}${productData._id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await axios.post(`${API_URL}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });   

      setUploadSuccess(res.data.message);
      if (editing) {
        const updatedProducts = products.map((product) =>
          product._id === productData?._id ? res.data.data : product
        );
        setProducts(updatedProducts.sort((a, b) => a.price - b.price));
      } else {
        setProducts((prevProducts) =>
          [...prevProducts, res.data.data].sort((a, b) => a.price - b.price)
        );
      }

      
      setUploadNotification({message:"Uploaded successfully",type:"success"})
      setUploadError(null);
      setUploadButtonText(null);
      setTimeout(()=>navigate('/products'),3000);
      
    } catch (err) {
      console.error(err);
      setUploadNotification({message:"Upload Failed!",type:"error"})
      setUploadError(err.response?.data?.message || "Something went wrong");
      setUploadSuccess(null);
      setUploadButtonText(null);
    }
  };

  return (
    <>
    {uploadNotification.message&&<Notification notification={uploadNotification} closeNotification={()=>setUploadNotification({message:null,type:""})} />}
    <form className="upload-form">
      <div className="each-field">
        <label htmlFor="product-name">Product Name</label>
        <input
          type="text"
          id="product-name"
          placeholder="Enter product name"
          name="name"
          value={uploadProduct.name}
          onChange={handleChange}
          required
        ></input>
        <span className="product-err">{uploadProductError.name}</span>
      </div>
      <div className="each-field">
        <label htmlFor="product-price">Price(₹)</label>
        <input
          type="text"
          id="product-price"
          placeholder="0.00"
          value={uploadProduct.price}
          name="price"
          onChange={handleChange}
          required
        ></input>
        <span className="product-err">{uploadProductError.price}</span>
      </div>
      <div className="category">
        <span>Category</span>
        <ul className="category-list">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`each-category ${
                uploadProduct.category === category ? "choose-category" : ""
              }`}
              onClick={() =>
                setUploadProduct({ ...uploadProduct, category: category })
              }
            >
              {category}
            </li>
          ))}
        </ul>
        <span className="product-err">{uploadProductError.category}</span>
      </div>
      <div className="image-field">
        <span>Product Image (Upload 16:9 for better experience)</span>
        {imagePreview ? (
          <div
            onClick={handleImageClick}
            style={{
              position: "relative",
              border: "1px dashed gray",
              borderRadius: "25px",
            }}
          >
            <img
              src={imagePreview}
              alt="Preview Image"
              className="preview-image"
            />
            <span className="preview-image-toolkit">Change the image</span>
          </div>
        ) : (
          <label htmlFor="product-image" className="image-upload-custom">
            <FaImage size={40} />
            Click here to Upload the image (Maximum Size:10MB)
          </label>
        )}
        <input
          type="file"
          accept="image/*"
          id="product-image"
          ref={fileInputRef}
          required
          onChange={handleImageChange}
        />
        <span className="product-err">{uploadProductError.image}</span>
      </div>
      <div className="description-field">
        <label htmlFor="Description">Description</label>
        <textarea
          rows={7}
          className="product-description"
          value={uploadProduct.description}
          name="description"
          onChange={handleChange}
          placeholder="Describe your product features and benefits..."
          required
        />
        <span className="product-err">{uploadProductError.description}</span>
      </div>
      <button className="product-upload-button" onClick={handleProductSubmit}>
        {uploadButtonText || `Upload Product`}
      </button>
      {uploadError && <span className="upload-error">{uploadError}</span>}
      {uploadSuccess && <span className="upload-success">{uploadSuccess}</span>}
    </form>
    </>
  );
};

export default ProductForm;
