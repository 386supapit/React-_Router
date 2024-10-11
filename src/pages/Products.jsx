import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

  // State สำหรับฟอร์มเพิ่มสินค้า
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    const productId = productList.length + 1; // สร้าง ID ใหม่
    dispatch(addProduct({ ...newProduct, id: productId }));
    setNewProduct({ name: '', price: '', description: '' }); // รีเซ็ตฟอร์มหลังการเพิ่มสินค้า
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {productList.map(product => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              {product.name} - {product.price}
            </Link>
            <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Add New Product</h3>
      <form onSubmit={handleAddProduct}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
            style={{ width: '100%', height: '20px' }} 
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
            style={{ width: '100%', height: '20px' }} 
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
            style={{ width: '100%', height: '25px' }} 
          ></textarea>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Products;
