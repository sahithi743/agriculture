import { useState, useEffect } from 'react'
import Header from '../components/Header'
import api from '../utils/api'
import './Dashboard.css'

export default function FarmerDashboard() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({})
  const [showProductForm, setShowProductForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: 'vegetables',
    price: '',
    quantity: '',
    description: '',
    is_organic: false
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes, statsRes] = await Promise.all([
        api.get('/products/my-products'),
        api.get('/orders/farmer'),
        api.get('/farmer/stats')
      ])
      setProducts(productsRes.data.products || [])
      setOrders(ordersRes.data.orders || [])
      setStats(statsRes.data || {})
    } catch (error) {
      console.log('[v0] Failed to fetch dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      await api.post('/products', formData)
      setFormData({
        name: '',
        category: 'vegetables',
        price: '',
        quantity: '',
        description: '',
        is_organic: false
      })
      setShowProductForm(false)
      fetchDashboardData()
    } catch (error) {
      console.log('[v0] Failed to add product:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="dashboard-page">
      <Header />
      
      <div className="dashboard-container">
        <h1>Farmer Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Products</h3>
            <p className="stat-value">{stats.total_products || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Total Sales</h3>
            <p className="stat-value">₹{stats.total_sales || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Orders</h3>
            <p className="stat-value">{stats.pending_orders || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Ratings</h3>
            <p className="stat-value">{stats.average_rating || 0}/5</p>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h2>My Products</h2>
            <button
              onClick={() => setShowProductForm(!showProductForm)}
              className="btn-primary"
            >
              {showProductForm ? 'Cancel' : '+ Add Product'}
            </button>
          </div>

          {showProductForm && (
            <form className="product-form" onSubmit={handleAddProduct}>
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    <option>vegetables</option>
                    <option>fruits</option>
                    <option>grains</option>
                    <option>dairy</option>
                    <option>organic</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Quantity (kg)</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                ></textarea>
              </div>

              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  name="is_organic"
                  checked={formData.is_organic}
                  onChange={handleInputChange}
                />
                <label>Certified Organic</label>
              </div>

              <button type="submit" className="btn-submit">Add Product</button>
            </form>
          )}

          {products.length === 0 ? (
            <p className="empty">No products yet</p>
          ) : (
            <div className="products-list">
              {products.map(product => (
                <div key={product.id} className="product-item">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.category} • ₹{product.price} • {product.quantity}kg</p>
                  </div>
                  <button className="btn-action">View Details</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="section">
          <h2>Recent Orders</h2>
          {orders.length === 0 ? (
            <p className="empty">No orders yet</p>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-item">
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p>{order.buyer_name} • {order.quantity} items • ₹{order.total}</p>
                    <p className="date">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className={`status ${order.status}`}>{order.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
