

import { Link } from 'react-router-dom'
import { useCart } from '../../src/context/CartContext'

function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart()

  return (
    <div className='cart-page'>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div className='cart-item' key={item.id}>
              <img src={item.image} alt={item.title} />

              <div>
                <h3>{item.title}</h3>
                <p>${item.price}</p>

                <input
                  type='number'
                  min='1'
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                />

                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2>Total: ${totalPrice.toFixed(2)}</h2>

          <Link to='/checkout'>
            <button>Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  )
}

export default Cart