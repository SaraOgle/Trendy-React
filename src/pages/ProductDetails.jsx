import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState(null)
  const [recommended, setRecommended] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductAndRecommended = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await res.json()
        
        
        const formattedProduct = {
          ...data,
          name: data.title,
          image: data.thumbnail
        }
        setProduct(formattedProduct)

        
        const recRes = await fetch(`https://dummyjson.com/products/category/${data.category}`)
        const recData = await recRes.json()
        
        const formattedRecs = recData.products
          .filter(item => item.id !== Number(id)) // Remove current product
          .slice(0, 4) // Limit to 4 items
          .map(item => ({
            id: item.id,
            name: item.title,
            price: item.price,
            image: item.thumbnail
          }))
        
        setRecommended(formattedRecs)
      } catch (err) {
        console.error("Error fetching product details:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProductAndRecommended()
  }, [id])

  if (loading) return <div className="container"><h2>Loading Product...</h2></div>
  if (!product) return <div className="container"><h2>Product not found.</h2></div>

  return (
    <section id="products">
      <div className="container">
        <div className="row target__row">
          <div className="targetproduct">
            <div className="targetproduct__container">
              <div className="targetpropduct__img--container">
                <img className="targetproduct__img" src={product.image} alt={product.name} />
              </div>

              <div className="targetproduct__description--list">
                <div className="targetproduct__title">
                  <h2>{product.name}</h2>
                </div>
                <div className="targetproduct__description">
                  <p>{product.description}</p>
                </div>
                <div className="pricing">
                  <div className="targetprice">
                    <p>${product.price}</p>
                  </div>
                  <button className="btn add__btn" onClick={() => addToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="products__container">
          <div className="row">
            <div className="product__selected--top">
              <h2 className="recommended">Recommended For You</h2>
            </div>

            <div className="row">
              <div className="product-list">
                {recommended.map((item) => (
                  <ProductCard product={item} key={item.id} />
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