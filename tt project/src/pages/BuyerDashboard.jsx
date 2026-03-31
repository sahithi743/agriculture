import { useState, useEffect } from 'react'
import Header from '../components/Header'
import api from '../utils/api'
import './Dashboard.css'

export default function BuyerDashboard() {
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [ordersRes, statsRes] = await Promise.all([
        api.get('/orders/buyer'),
        api.get('/buyer/stats')
      ])
      setOrders(ordersRes.data.orders || [])
      setStats(statsRes.data || {})
    } catch (error) {
      console.log('[v0] Failed to fetch dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}/cancel`)
      fetchDashboardData()
    } catch (error) {
      console.log('[v0] Failed to cancel order:', error)
    }
  }

  const handleRateOrder = async (orderId) => {
    const rating = prompt('Rate this order (1-5):')
    if (rating && rating >= 1 && rating <= 5) {
      try {
        await api.post(`/orders/${orderId}/rate`, { rating })
        fetchDashboardData()
      } catch (error) {
        console.log('[v0] Failed to rate order:', error)
      }
    }
  }

  return (
    <div className="dashboard-page">
      <Header />
      
      <div className="dashboard-container">
        <h1>Buyer Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p className="stat-value">{stats.total_orders || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Total Spent</h3>
            <p className="stat-value">₹{stats.total_spent || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Active Orders</h3>
            <p className="stat-value">{stats.active_orders || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Saved Items</h3>
            <p className="stat-value">{stats.saved_items || 0}</p>
          </div>
        </div>

        <div className="section">
          <h2>My Orders</h2>
          {orders.length === 0 ? (
            <p className="empty">No orders yet. Start shopping!</p>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p className="seller">From: {order.farmer_name}</p>
                    <p className="description">{order.products_count} items • ₹{order.total}</p>
                    <p className="date">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="order-actions">
                    <span className={`status ${order.status}`}>{order.status}</span>
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="btn-small"
                      >
                        Cancel
                      </button>
                    )}
                    {order.status === 'delivered' && (
                      <button
                        onClick={() => handleRateOrder(order.id)}
                        className="btn-small"
                      >
                        Rate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
