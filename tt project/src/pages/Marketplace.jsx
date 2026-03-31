import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import api from '../utils/api'
import './Marketplace.css'

export default function Marketplace() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortBy, setSortBy] = useState('latest')

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [searchQuery, selectedCategory, products, priceRange, sortBy])

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      setProducts(response.data.products || [])
    } catch (error) {
      console.log('[v0] Failed to fetch products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = products

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase())
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        (p.cropName || p.name)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    setFilteredProducts(filtered)
  }

  const categories = ['all', 'vegetables', 'fruits', 'grains', 'dairy', 'organic']

  return (
    <div className="marketplace-page">
      <Header />
      
      <div className="marketplace-container">
        <section className="hero">
          <h1>Welcome to AgroMarket</h1>
          <p>Fresh produce directly from farmers to your table</p>
        </section>

        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Search products by name, location, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filters-row">
            <div className="categories">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            <div className="advanced-filters">
              <div className="price-filter">
                <label>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                />
              </div>

              <div className="sort-filter">
                <label htmlFor="sort">Sort By:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <p>No products found</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="product-card">
                <div className="product-image">
                  <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <p className="description">{product.description}</p>
                  <div className="product-footer">
                    <span className="price">₹{product.price}</span>
                    <span className="seller">{product.farmer_name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
