import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../Data/products'

const Header = () => {

const [search, setSearch] = useState('')
const categories = ["All", ...new Set(products.map(p => p.category))];
const navigate = useNavigate();

const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "All") {
      navigate('/category/all');
    } else {
      navigate(`/category/${selectedCategory}`);
    }
  };


  return (
    <header>
    <div className="row header__row">
      <div className="btn__container">
    <button className="category__btn" onClick={() => navigate('/category/all')}>All Products</button>
        <button className="category__btn" onClick={() => navigate("/category/Men's Clothing")}>Men's Clothing</button>
        <button className="category__btn" onClick={() => navigate("/category/Women's Clothing")}>Women's Clothing</button>
        <button className="category__btn" onClick={() => navigate('/category/Accessories')}>Accessories</button>
        <button className="category__btn" onClick={() => navigate('/category/Jewelry')}>Jewelry</button>
    </div>
    </div>
</header>
  )
}

export default Header
