import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Header = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categorySlug) => {
    navigate(`/category/${categorySlug}`);
  };


  // Mapping the buttons to the actual DummyJSON category names
  return (
    <header>
      <div className="row header__row">
        <div className="btn__container">
          <button className="category__btn" onClick={() => navigate('/category/all')}>
            All Products
          </button>
          
          
          <button className="category__btn" onClick={() => navigate("/category/mens-clothing")}>
            Men's Clothing
          </button>
          
        
          <button className="category__btn" onClick={() => navigate("/category/womens-clothing")}>
            Women's Clothing
          </button>
          
          
          <button className="category__btn" onClick={() => navigate('/category/accessories')}>
            Accessories
          </button>
          
         
          <button className="category__btn" onClick={() => navigate('/category/beauty')}>
            Beauty
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;