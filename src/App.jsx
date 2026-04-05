import { Routes, Route } from 'react-router-dom'
import React, { useState } from 'react';
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Category from './pages/Category'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import SearchResults from './components/SearchResults'
import Login from './pages/LogIn';
import Signup from './pages/Signup'

function App() {

  const [cart, setCart] = useState([]);

  const changeQuantity = (product, quantity) => {
    setCart(cart.map(item => 
      item.id === product.id ? { ...item, quantity: +quantity } : item
    ));
  };

  const removeItem = (item) => {
    setCart(cart.filter(product => product.id !== item.id));
  };

  


  return (
    <div>
      <Nav />

      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path="/search" element={<SearchResults />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path='/cart' element={<Cart 
          cart={cart} 
          changeQuantity={changeQuantity} 
          removeItem={removeItem} />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App