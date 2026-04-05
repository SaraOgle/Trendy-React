import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { products } from '../Data/products'
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Header from './Header';

const SearchResults = () => {
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query');

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  const [search, setSearch] = useState('')
  
    const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/search?query=${search}`);
      setSearch("");
    }
  };
  
    const categories = ["All", "Men's Clothing", "Women's Clothing", "Jewelry", "Accessories"];
  
    const onSort = (sortType) => {
  let sorted = [...featuredProducts]; // copy original products

  if (sortType === "LOW_TO_HIGH") {
    sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  } else if (sortType === "HIGH_TO_LOW") {
    sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  }

  setSortedProducts(sorted);
};

  return (
    <div className="main container">
      <div className="row">

        <Header />

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

        <h2 className="search__results">Search Results for "{query}"</h2>
        <p>{filteredProducts.length} products found</p>
      </div>

      <div className="row">
        {/* 2. Use the product-list class to enable the flexbox grid */}
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              /* 3. Use the ProductCard component instead of manual divs */
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;