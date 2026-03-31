import { useState, useEffect } from 'react'
import Header from '../components/Header'
import api from '../utils/api'
import './Dashboard.css'

export default function AdminDashboard() {
  const [stats, setStats] = useState({})
  const [users, setUsers] = useState([])
  const [reports, setReports] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      const [statsRes, usersRes, reportsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users'),
        api.get('/admin/reports')
      ])
      setStats(statsRes.data || {})
      setUsers(usersRes.data.users || [])
      setReports(reportsRes.data.reports || [])
    } catch (error) {
      console.log('[v0] Failed to fetch admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSuspendUser = async (userId) => {
    if (window.confirm('Are you sure you want to suspend this user?')) {
      try {
        await api.put(`/admin/users/${userId}/suspend`)
        fetchAdminData()
      } catch (error) {
        console.log('[v0] Failed to suspend user:', error)
      }
    }
  }

  const handleResolveReport = async (reportId) => {
    try {
      await api.put(`/admin/reports/${reportId}/resolve`)
      fetchAdminData()
    } catch (error) {
      console.log('[v0] Failed to resolve report:', error)
    }
  }

  return (
    <div className="dashboard-page">
      <Header />
      
      <div className="dashboard-container">
        <h1>Admin Dashboard</h1>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="tab-content">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p className="stat-value">{stats.total_users || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Total Products</h3>
                <p className="stat-value">{stats.total_products || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p className="stat-value">{stats.total_orders || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Platform Revenue</h3>
                <p className="stat-value">₹{stats.total_revenue || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Active Farmers</h3>
                <p className="stat-value">{stats.active_farmers || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Pending Reports</h3>
                <p className="stat-value">{stats.pending_reports || 0}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="tab-content">
            <div className="section">
              <h2>User Management</h2>
              {users.length === 0 ? (
                <p className="empty">No users found</p>
              ) : (
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <span className={`badge ${user.is_active ? 'active' : 'inactive'}`}>
                              {user.is_active ? 'Active' : 'Suspended'}
                            </span>
                          </td>
                          <td>{new Date(user.created_at).toLocaleDateString()}</td>
                          <td>
                            {user.is_active && (
                              <button
                                onClick={() => handleSuspendUser(user.id)}
                                className="btn-small danger"
                              >
                                Suspend
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="tab-content">
            <div className="section">
              <h2>User Reports</h2>
              {reports.length === 0 ? (
                <p className="empty">No reports</p>
              ) : (
                <div className="reports-list">
                  {reports.map(report => (
                    <div key={report.id} className="report-item">
                      <div className="report-header">
                        <h3>{report.reason}</h3>
                        <span className={`status ${report.status}`}>{report.status}</span>
                      </div>
                      <p className="report-detail">Reported by: {report.reporter_name}</p>
                      <p className="report-detail">Against: {report.reported_user_name}</p>
                      <p className="report-description">{report.description}</p>
                      {report.status === 'pending' && (
                        <button
                          onClick={() => handleResolveReport(report.id)}
                          className="btn-small"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
