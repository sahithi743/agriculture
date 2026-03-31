import { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { apiCall } from '../utils/api'
import './Reviews.css'

export default function Reviews() {
  const { productId } = useParams()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [userReview, setUserReview] = useState(null)
  const [showForm, setShowForm] = useState(false)
  
  const [formData, setFormData] = useState({
    rating: 5,
    comment: ''
  })

  useEffect(() => {
    fetchProductAndReviews()
  }, [productId])

  const fetchProductAndReviews = async () => {
    try {
      setLoading(true)
      const [productRes, reviewsRes] = await Promise.all([
        apiCall('GET', `/products/${productId}`),
        apiCall('GET', `/products/${productId}/reviews`)
      ])
      setProduct(productRes.data)
      setReviews(reviewsRes.data || [])
      
      // Check if user already reviewed
      if (user) {
        const existing = reviewsRes.data?.find(r => r.userId === user.id)
        setUserReview(existing)
      }
    } catch (err) {
      setError('Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      if (userReview) {
        await apiCall('PUT', `/reviews/${userReview.id}`, formData)
        setSuccess('Review updated successfully!')
      } else {
        await apiCall('POST', `/products/${productId}/reviews`, formData)
        setSuccess('Review added successfully!')
      }
      setTimeout(() => fetchProductAndReviews(), 1500)
    } catch (err) {
      setError(err.message || 'Failed to submit review')
    } finally {
      setSubmitting(false)
    }
  }

  const getRatingColor = (rating) => {
    if (rating >= 4) return '#16a34a'
    if (rating >= 3) return '#f59e0b'
    return '#dc2626'
  }

  const renderStars = (rating, interactive = false, onChange) => {
    return (
      <div className="star-rating" style={{ display: 'flex', gap: '0.25rem' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
            onClick={() => interactive && onChange && onChange(star)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  if (loading) {
    return <div className="reviews-container"><p>Loading reviews...</p></div>
  }

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <h2>{product?.cropName} - Reviews & Ratings</h2>
      </div>

      <div className="reviews-layout">
        {/* Sidebar with Product Info */}
        <div className="reviews-sidebar">
          <div className="product-summary">
            {product?.image && <img src={product.image} alt={product.cropName} />}
            <h3>{product?.cropName}</h3>
            <div className="rating-summary">
              <div className="average-rating">
                {reviews.length > 0 ? (
                  <>
                    <span className="big-rating">
                      {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
                    </span>
                    <span className="rating-text">out of 5</span>
                  </>
                ) : (
                  <span className="no-rating">No ratings yet</span>
                )}
              </div>
              <p className="review-count">{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="reviews-content">
          {/* Rating Distribution */}
          {reviews.length > 0 && (
            <div className="rating-distribution">
              <h3>Rating Distribution</h3>
              {[5, 4, 3, 2, 1].map(rating => {
                const count = reviews.filter(r => r.rating === rating).length
                const percentage = (count / reviews.length) * 100
                return (
                  <div key={rating} className="distribution-row">
                    <span className="rating-label">{rating} ★</span>
                    <div className="bar">
                      <div className="fill" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="count">{count}</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Review Form */}
          {user && (
            <div className="review-form-section">
              {!showForm && (
                <button 
                  className="btn btn-primary btn-write-review"
                  onClick={() => setShowForm(true)}
                >
                  {userReview ? 'Edit Your Review' : 'Write a Review'}
                </button>
              )}

              {showForm && (
                <div className="review-form">
                  <h3>{userReview ? 'Edit Your Review' : 'Share Your Experience'}</h3>
                  
                  {error && <div className="alert alert-error">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Your Rating</label>
                      {renderStars(
                        formData.rating,
                        true,
                        (rating) => setFormData(prev => ({ ...prev, rating }))
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="comment">Your Comment</label>
                      <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder="Share your experience with this product..."
                        rows="4"
                        required
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit Review'}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => {
                          setShowForm(false)
                          setFormData({ rating: 5, comment: '' })
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* Reviews List */}
          <div className="reviews-list">
            <h3>Customer Reviews ({reviews.length})</h3>
            {reviews.length === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
            ) : (
              reviews.map(review => (
                <div key={review.id} className={`review-item ${review.id === userReview?.id ? 'your-review' : ''}`}>
                  <div className="review-header">
                    <div className="reviewer-info">
                      <p className="reviewer-name">{review.userName}</p>
                      {review.id === userReview?.id && <span className="your-review-badge">Your Review</span>}
                    </div>
                    <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  {review.farmerResponse && (
                    <div className="farmer-response">
                      <p className="response-label">Farmer's Response</p>
                      <p>{review.farmerResponse}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
