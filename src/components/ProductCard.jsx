import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'


function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="product">
      <figure className="product__img--wrapper">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.title} />
        </Link>
      </figure>
      <div className="product__title">
        <h3>{product.title}</h3>
      </div>
      <div className="price__add">
        <div className="product__price">
          <p>${Number(product.price).toFixed(2)}</p>
        </div>
        <button className="btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}


export default ProductCard