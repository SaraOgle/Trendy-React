import { useParams } from 'react-router-dom'
import { products } from '../Data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const product = products.find(item => item.id === Number(id))

  const featuredProducts = products

  return (
    <section id="products">
        <div className="container">
            <div className ="row target__row">
                <div className="targetproduct">


                    <div className="targetproduct__container">

                        <div className="targetpropduct__img--container" >
                <img className="targetproduct__img" src={product.image} alt={product.title} />
                </div>


                <div className="targetproduct__description--list">
                    <div className="targetproduct__title"><h2>{product.title}</h2></div>
                <div className="targetproduct__description"><p>{product.description}</p></div>
                <div className="pricing">
                    <div className="targetprice"><p>${product.price}</p></div>
                    <button className="btn add__btn" onClick={() => addToCart(product)}>Add To Cart</button>
                </div>
                </div>

                </div>

                </div>
            </div>

    <div className="products__container">
        <div className="row">
            <div className="product__selected--top">
          <h2 className="recommended">
            Recommended For You 
          </h2>
          </div>
          
        <div className="row">
      <div className="product-list">
        {featuredProducts 
              .filter((item) => {
                const isSameCategory = item.category === product.category;
                const isNotCurrentProduct = item.id !== product.id;
                return isSameCategory && isNotCurrentProduct;
              })
            .slice(0, 6)
            .map((product) => (
            <ProductCard  product={product} key={product.id} />
            ))}
      </div>
      </div>


        </div>
    </div>


            
        </div>
    </section>
  )
}





export default ProductDetails