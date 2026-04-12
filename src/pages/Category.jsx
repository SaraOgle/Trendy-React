import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';

const Category = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]); 
  const [sortedProducts, setSortedProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/search?query=${search}`);
      setSearch("");
    }
  };

  const onSort = (sortType) => {
    let sorted = [...products];
    if (sortType === "LOW_TO_HIGH") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "HIGH_TO_LOW") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setSortedProducts(sorted);
  };

  useEffect(() => {
  const fetchCategoryProducts = async () => {
    setLoading(true);
    try {
      let finalProducts = [];

      if (name === "mens-clothing") {
        const urls = [
          'https://dummyjson.com/products/category/mens-shirts',
          'https://dummyjson.com/products/category/mens-shoes'
        ];

  
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const dataResults = await Promise.all(responses.map(res => res.json()));
        finalProducts = dataResults.flatMap(result => result.products);
        
      } else if (name === "womens-clothing") {
        const urls = [
          'https://dummyjson.com/products/category/womens-dresses',
          'https://dummyjson.com/products/category/womens-shoes'
        ];
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const dataResults = await Promise.all(responses.map(res => res.json()));
        finalProducts = dataResults.flatMap(result => result.products);

      } else if (name === "accessories") {
        const urls = [
          'https://dummyjson.com/products/category/womens-bags',
          'https://dummyjson.com/products/category/mens-watches',
          'https://dummyjson.com/products/category/sunglasses',
          'https://dummyjson.com/products/category/womens-watches'
        ];
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const dataResults = await Promise.all(responses.map(res => res.json()));
        finalProducts = dataResults.flatMap(result => result.products);

      } else if (name === "beauty") {
        const urls = [
          'https://dummyjson.com/products/category/beauty',
          'https://dummyjson.com/products/category/fragrances',
          'https://dummyjson.com/products/category/skin-care'
        ];
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const dataResults = await Promise.all(responses.map(res => res.json()));
        finalProducts = dataResults.flatMap(result => result.products);

      } else if (name === "all") {
        const urls = [
          'https://dummyjson.com/products/category/beauty',
          'https://dummyjson.com/products/category/fragrances',
          'https://dummyjson.com/products/category/skin-care',
          'https://dummyjson.com/products/category/womens-bags',
          'https://dummyjson.com/products/category/mens-watches',
          'https://dummyjson.com/products/category/sunglasses',
          'https://dummyjson.com/products/category/womens-watches',
          'https://dummyjson.com/products/category/womens-dresses',
          'https://dummyjson.com/products/category/womens-shoes',
          'https://dummyjson.com/products/category/mens-shirts',
          'https://dummyjson.com/products/category/mens-shoes'
        ];
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const dataResults = await Promise.all(responses.map(res => res.json()));
        finalProducts = dataResults.flatMap(result => result.products);
      }

      const formatted = finalProducts.map(item => ({
        id: item.id,
        name: item.title,
        price: item.price,
        image: item.thumbnail
      }));

      setProducts(formatted);
      setSortedProducts(formatted);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchCategoryProducts();
}, [name]);

  return (
    <div className="main container">
      <Header />
      <div className="row">
        <div>
          <h1>{name.toLowerCase() === "all" ? "All Products" : `Results for "${name}"`}</h1>
          <p>{sortedProducts.length} products found</p>
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
          <select id="filter" defaultValue="" onChange={(event) => onSort(event.target.value)}>
            <option value="" disabled>Sort</option>
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