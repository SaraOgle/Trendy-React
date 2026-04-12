import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query'); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const data = await res.json();

        const formatted = data.products.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price,
          image: item.thumbnail
        }));

        setProducts(formatted);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchSearchResults();
  }, [query]); 

  return (
    <div className="container">
      <h2>Results for "{query}"</h2>
      <div className="product-list">
        {loading ? (
          <p>Searching...</p>
        ) : products.length > 0 ? (
          products.map(product => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>No products found for "{query}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;