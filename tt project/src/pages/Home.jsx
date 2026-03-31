import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import AuthContext from '../context/AuthContext'
import './Home.css'

export default function Home() {
  const { user } = useContext(AuthContext)

  return (
    <div className="home-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>🌾 Welcome to AgroMarket</h1>
          <p>Fresh farm products directly from farmers to your table</p>
          <div className="hero-buttons">
            {!user ? (
              <>
                <Link to="/marketplace" className="btn btn-primary btn-lg">
                  Start Browsing
                </Link>
                <Link to="/register" className="btn btn-outline btn-lg">
                  Join as Farmer
                </Link>
              </>
            ) : (
              <>
                <Link to="/marketplace" className="btn btn-primary btn-lg">
                  Browse Products
                </Link>
                {user.role === 'farmer' && (
                  <Link to="/add-product" className="btn btn-secondary btn-lg">
                    Add Your Products
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose AgroMarket?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Farm Direct</h3>
            <p>Buy directly from farmers without middlemen. Get fresher products at better prices.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Farmers get fair prices while buyers enjoy competitive rates. Win-win for everyone.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Quality Assured</h3>
            <p>All products verified. Ratings and reviews ensure transparency and quality standards.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Sustainable</h3>
            <p>Support organic farming and sustainable agriculture practices in your region.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Fast Delivery</h3>
            <p>Quick order processing and reliable delivery to your doorstep.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Direct Chat</h3>
            <p>Communicate directly with farmers for special requests and bulk orders.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Browse & Search</h3>
            <p>Explore products by category, price, and location</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Add to Cart</h3>
            <p>Select products and add them to your shopping cart</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Checkout</h3>
            <p>Easy and secure payment process</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Track Order</h3>
            <p>Monitor your delivery in real-time</p>
          </div>
          <div className="step">
            <div className="step-number">5</div>
            <h3>Receive & Rate</h3>
            <p>Get your products and share your experience</p>
          </div>
          <div className="step">
            <div className="step-number">6</div>
            <h3>Support Community</h3>
            <p>Help local farmers grow and thrive</p>
          </div>
        </div>
      </section>

      {/* For Farmers Section */}
      <section className="for-farmers">
        <div className="farmers-content">
          <div className="farmers-text">
            <h2>For Farmers</h2>
            <ul className="benefits-list">
              <li>✓ Sell your products directly to consumers</li>
              <li>✓ Get fair prices without middlemen</li>
              <li>✓ Manage inventory and orders easily</li>
              <li>✓ Track your earnings in real-time</li>
              <li>✓ AI-powered crop and price recommendations</li>
              <li>✓ Connect with buyers directly</li>
              <li>✓ Build your farm's reputation</li>
            </ul>
            <Link to="/register" className="btn btn-primary">
              Become a Seller
            </Link>
          </div>
          <div className="farmers-image">
            <div className="image-placeholder">🌾🥕🥬</div>
          </div>
        </div>
      </section>

      {/* For Buyers Section */}
      <section className="for-buyers">
        <div className="buyers-content">
          <div className="buyers-image">
            <div className="image-placeholder">🛒🥗🍎</div>
          </div>
          <div className="buyers-text">
            <h2>For Buyers</h2>
            <ul className="benefits-list">
              <li>✓ Fresh products directly from farms</li>
              <li>✓ Transparent pricing and quality info</li>
              <li>✓ Rate and review products & farmers</li>
              <li>✓ Track orders in real-time</li>
              <li>✓ Bulk order discounts available</li>
              <li>✓ Chat with farmers directly</li>
              <li>✓ Secure and easy checkout</li>
            </ul>
            <Link to="/marketplace" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <h3>5000+</h3>
          <p>Active Farmers</p>
        </div>
        <div className="stat-card">
          <h3>50000+</h3>
          <p>Happy Buyers</p>
        </div>
        <div className="stat-card">
          <h3>100000+</h3>
          <p>Products Sold</p>
        </div>
        <div className="stat-card">
          <h3>₹10 Cr+</h3>
          <p>Transactions</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Join?</h2>
        <p>Whether you're a farmer wanting to reach more customers or a buyer looking for fresh produce, AgroMarket is here for you.</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary btn-lg">Register Now</Link>
          <Link to="/marketplace" className="btn btn-outline btn-lg">Browse Products</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>AgroMarket</h4>
            <p>Connecting farmers directly with consumers for fresher, healthier food.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/marketplace">Marketplace</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#about">About Us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 AgroMarket. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
