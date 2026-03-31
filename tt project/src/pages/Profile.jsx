import { useState, useEffect, useContext } from 'react'
import Header from '../components/Header'
import AuthContext from '../context/AuthContext'
import api from '../utils/api'
import './Profile.css'

export default function Profile() {
  const { user, setUser } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || ''
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await api.put('/profile', formData)
      setUser(response.data.user)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      setMessage('Profile updated successfully!')
      setIsEditing(false)
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile')
      console.log('[v0] Profile update error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="profile-page">
        <Header />
        <div className="profile-container">
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <Header />
      
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <h1>{user.name}</h1>
              <p className="role">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            </div>
          </div>

          {message && (
            <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State"
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows="4"
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="detail-group">
                <label>Email</label>
                <p>{user.email}</p>
              </div>

              <div className="detail-group">
                <label>Phone</label>
                <p>{user.phone || 'Not provided'}</p>
              </div>

              <div className="detail-group">
                <label>Location</label>
                <p>{user.location || 'Not provided'}</p>
              </div>

              <div className="detail-group">
                <label>Bio</label>
                <p>{user.bio || 'No bio added yet'}</p>
              </div>

              {user.role === 'farmer' && (
                <>
                  <div className="detail-group">
                    <label>Total Products</label>
                    <p>{user.total_products || 0}</p>
                  </div>

                  <div className="detail-group">
                    <label>Rating</label>
                    <p>{user.rating || 0}/5 ⭐</p>
                  </div>
                </>
              )}

              <div className="profile-actions">
                <button onClick={() => setIsEditing(true)} className="btn-edit">
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>

        {user.role === 'farmer' && (
          <div className="stats-section">
            <h2>Your Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Sales</h3>
                <p className="stat-value">₹{user.total_sales || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Active Products</h3>
                <p className="stat-value">{user.active_products || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Orders Fulfilled</h3>
                <p className="stat-value">{user.orders_fulfilled || 0}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
