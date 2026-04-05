import React  from 'react'
import { assets } from '../assets/assets'
import { products } from '../Data/products'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Nav({ onSort }) {

 const { cart } = useCart()

 const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
    
    <nav>
      <figure>
        <Link to="/">
        <img src={assets.TrendyLogo} className="nav__logo" alt="logo" />
        </Link>
      </figure>
      <ul className="nav__link--list ">
        <Link className="nav__link nav__link--anchor">
            About
        </Link>
        <Link to="/signup" className="nav__link nav__link--anchor">    
            Sign Up
        </Link>
        <Link to="/login" className="nav__link nav__link--anchor nav__link--primary-anchor">
            Log In
        </Link>
        <div className="cart__icon--container">
        <Link to='/cart'> <img src={assets.shopping_cart} alt="" className="nav__cart--icon icon" />
        </Link>
        {cartItemCount > 0 && (<span className="cart__length">{cartItemCount}</span>)}
      </div>
      </ul>
        </nav>
        
    </>

  )
}

export default Nav