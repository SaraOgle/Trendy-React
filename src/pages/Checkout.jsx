import { useCart } from '../context/CartContext'

function Checkout() {
  const { totalPrice } = useCart()

  const handleCheckout = () => {
    alert('Order placed successfully!')
  }

  return (
    <div className='checkout-page'>
      <h2>Checkout</h2>

      <input type='text' placeholder='Full Name' />
      <input type='text' placeholder='Address' />
      <input type='text' placeholder='Card Number' />

      <h3>Total: ${totalPrice.toFixed(2)}</h3>

      <button onClick={handleCheckout}>Place Order</button>
    </div>
  )
}

export default Checkout