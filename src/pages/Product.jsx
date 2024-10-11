import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Product() {
  const { productId } = useParams(); // รับ productId จาก URL
  const productList = useSelector((state) => state.products); // ดึงข้อมูลสินค้าจาก Redux store
  const product = productList.find(p => p.id === parseInt(productId)); // ค้นหาสินค้าที่ตรงกับ productId

  if (!product) {
    return <h2>Product not found</h2>; // ถ้าหาสินค้าไม่พบ ให้แสดงข้อความ
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
    </div>
  );
}

export default Product;
