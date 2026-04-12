import { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import ProductCard from '../components/ProductCard'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  const sliderImages = [
    assets.slider1,
    assets.slider2,
    assets.slider3,
    assets.slider4,
    assets.slider5,
    assets.slider6,
  ]

  
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [search, setSearch] = useState('');
  const [sortedProducts, setSortedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProducts = async () => {
  try {
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
    const combinedProducts = dataResults.flatMap(result => result.products);
    
    const formatted = combinedProducts.map(item => ({
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.thumbnail
    }));

    setProducts(formatted);
    setSortedProducts(formatted);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  fetchProducts()
}, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [sliderImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === sliderImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    )
  }

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/search?query=${search}`);
      setSearch("");
    }
  };

  const onSort = (sortType) => {
    let sorted = [...products];
    if (sortType === "LOW_TO_HIGH") {
      sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortType === "HIGH_TO_LOW") {
      sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    }
    setSortedProducts(sorted);
  };


  return (
    <div className='home'>
      <main>
        <Header />

        <div className="main__slider row">
          <button className="control__prev" onClick={prevSlide}>
            <img className="angle__icons angle__icons--left" src={assets.angle_left} alt="Previous" />
          </button>

          <button className="control__next" onClick={nextSlide}>
            <img className="angle__icons angle__icons--right" src={assets.angle_right} alt="Next" />
          </button>

          <div className="slider__image__container">
            {loading ? (
              <div className="slider__skeleton"></div>
            ) : (
              <img className="img__sliders" src={sliderImages[currentSlide]} alt="Slider" />
            )}
          </div>

          <div className="slider__dots">
            {sliderImages.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
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

        <section id="products">
          <div className="container">
            <div className="row">
              <div className="product-list">
                {loading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="product-skeleton"></div>
                    ))
                  : sortedProducts.map((product) => (
                      <ProductCard product={product} key={product.id} />
                    ))
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home