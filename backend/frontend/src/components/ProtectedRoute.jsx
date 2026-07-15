import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <p className="px-6 py-20 text-center text-ink-soft">Loading…</p>
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
