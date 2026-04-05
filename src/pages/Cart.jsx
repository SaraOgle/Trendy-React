import { Link } from 'react-router-dom'
import { useCart } from '../../src/context/CartContext'

const Cart = () => {
  const { cart, changeQuantity, removeItem } = useCart();
  

  if (!cart) return null;
  
    const total = () => {
        let price = 0;
        cart.forEach((item) => {
            price += (item.salePrice || item.originalPrice || item.price) * item.quantity;
        });
        return price;
    };

  return (
    <div id="products__body">
        <main id="products__main">
            <div className="products__container">
                <div className="row">
                    <div className="product__selected--top">
                        <h2 className="cart__title">Cart</h2>
                    </div>
                    <div className="cart">
  {cart.length > 0 ? (
    <>
      <div className="cart__header">
        <span className="cart__product">Products</span>
        <span className="cart__quantity">Quantity</span>
        <span className="cart__total">Price</span>
      </div>

      <div className="cart__body">
        {cart.map((item) => {
          const itemTotal =
            (item.salePrice || item.originalPrice || item.price) *
            item.quantity;

          return (
            <div className="cart__item" key={item.id}>
              <div className="cart__product">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="cart__product--img"
                />

                <div className="cart__product--info">
                  <span className="cart__product--title">
                    {item.title}
                  </span>

                  <span className="cart__product--price">
                    ${(item.salePrice || item.originalPrice || item.price).toFixed(2)}
                  </span>

                
                </div>
              </div>

              <div className="cart__quantity">
                <input
                  type="number"
                  min={0}
                  max={99}
                  className="cart__input"
                  value={item.quantity}
                  onChange={(e) =>
                    changeQuantity(item.id, Number(e.target.value))
                  }
                />
                <button
                    className="cart__product--remove"
                    onClick={() => removeItem(item)}
                  >
                    Remove
                  </button>
                  
              </div>

              <div className="cart__total">
                ${itemTotal.toFixed(2)}
              </div>
            </div>

          );
        })}

        {cart.length > 0 && (
                        <div className="total">
                        <div className="total__item total__subtotal">
                            <span>Subtotal</span>
                            <span>${(total()).toFixed(2)}</span>
                        </div>
                        <div className="total__item total__tax">
                            <span>Tax</span>
                            <span>${(total() * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="total__item total__price">
                            <span>Total</span>
                            <span>${(total() * 1.1).toFixed(2)}</span>
                        </div>
                        <Link to='/checkout' >
                        <button className="btn btn__checkout no-cursor">
                            Proceed to checkout
                        </button>
                        </Link>
                    </div>
                )}


      </div>
    </>
  ) : (
    <div className="cart__empty">
      <h2>Your cart is empty!</h2>
      <Link to="/">
        <button className="btn shop__btn">Shop Now</button>
      </Link>
    </div>
  )}
</div>
                    
                  
                </div>
            </div>
        </main>
    </div>
  )
}

export default Cart