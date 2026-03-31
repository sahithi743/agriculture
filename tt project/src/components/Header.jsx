import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import './Header.css'

export default function Header() {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  const getDashboardLink = () => {
    if (!user) return '/'
    switch (user.role) {
      case 'farmer':
        return '/farmer-dashboard'
      case 'buyer':
        return '/buyer-dashboard'
      case 'admin':
        return '/admin-dashboard'
      default:
        return '/'
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🌾</span>
          <span className="logo-text">AgroMarket</span>
        </Link>

        <nav className="nav">
          <Link to="/">Marketplace</Link>
          {user && (
            <>
              <Link to={getDashboardLink()}>Dashboard</Link>
              <Link to="/messages">Messages</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/profile">Profile</Link>
            </>
          )}
        </nav>

        <div className="auth-section">
          {user ? (
            <>
              <span className="user-greeting">Hi, {user.name}</span>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-link">Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
