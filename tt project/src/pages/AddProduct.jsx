import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { apiCall } from '../utils/api'
import './AddProduct.css'

export default function AddProduct() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    cropName: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    unit: 'kg',
    harvestDate: '',
    location: '',
    image: '',
    certifications: ''
  })

  const categories = [
    'Vegetables',
    'Fruits',
    'Grains',
    'Dairy',
    'Honey',
    'Organic',
    'Spices',
    'Herbs'
  ]

  const units = ['kg', 'quintal', 'ton', 'liter', 'dozen', 'piece']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await apiCall('POST', '/products', formData)
      setSuccess('Product added successfully!')
      setTimeout(() => navigate('/farmer-dashboard'), 2000)
    } catch (err) {
      setError(err.message || 'Failed to add product')
    } finally {
      setLoading(false)
    }
  }

  if (user?.role !== 'farmer') {
    return (
      <div className="add-product-container">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>Only farmers can add products</p>
        </div>
      </div>
    )
  }

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h2>Add New Product</h2>
        <p className="subtitle">List your agricultural products on the marketplace</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="cropName">Crop Name *</label>
              <input
                type="text"
                id="cropName"
                name="cropName"
                value={formData.cropName}
                onChange={handleChange}
                placeholder="e.g., Organic Tomatoes"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price per Unit (₹) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity *</label>
              <div className="input-group">
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="100"
                  min="0"
                  required
                />
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="unit-select"
                >
                  {units.map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="harvestDate">Harvest Date *</label>
              <input
                type="date"
                id="harvestDate"
                name="harvestDate"
                value={formData.harvestDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Farm Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Punjab, India"
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product, farming methods, certifications, etc."
                rows="4"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="image">Product Image URL</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="certifications">Certifications</label>
              <input
                type="text"
                id="certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                placeholder="e.g., Organic, Fair Trade, Rainforest Alliance"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/farmer-dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
