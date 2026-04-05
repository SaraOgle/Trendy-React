import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../Data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext'
import Header from '../components/Header';

const Category = () => {
  const { name } = useParams();
  const { addToCart } = useCart()
  const [search, setSearch] = useState('')
  const featuredProducts = products
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true); // loading state
  const filteredProducts = name.toLowerCase() === "all" 
    ? products 
    : products.filter(p => p.category.toLowerCase() === name.toLowerCase());
  
  const [sortedProducts, setSortedProducts] = useState([]);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setSortedProducts(filteredProducts);
      setLoading(false);
    }, 1500); // 1.5s skeleton
    return () => clearTimeout(timer);
  }, [filteredProducts]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/search?query=${search}`);
      setSearch("");
    }
  };

  const onSort = (sortType) => {
    let sorted = [...filteredProducts];

    if (sortType === "LOW_TO_HIGH") {
      sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortType === "HIGH_TO_LOW") {
      sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    }

    setSortedProducts(sorted);
  };

  return (
    <div className="main container">
      <Header />
      <div className="row">
        <div className="">
          <h1>{name.toLowerCase() === "all" ? "All Products" : `Results for "${name}"`}</h1>
          <p>{filteredProducts.length} products found</p>
        </div>

        <div className="search__filter">
          <div className="searchbar">
            <input
              type="text"
              className="nav__search--input"
              placeholder="Search..."
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          <select
            id="filter"
            defaultValue=""
            onChange={(event) => onSort(event.target.value)}
          >
            <option value="" disabled>
              Sort
            </option>
            <option value="LOW_TO_HIGH">Price, Low to High</option>
            <option value="HIGH_TO_LOW">Price, High to Low</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="product-list">
          {loading 
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="product-skeleton"></div>
              ))
            : sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default Category;