import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'

import Home from './pages/public/Home'
import About from './pages/public/About'
import Projects from './pages/public/Projects'
import ProjectDetail from './pages/public/ProjectDetail'
import Contact from './pages/public/Contact'

import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ProfileEdit from './pages/admin/ProfileEdit'
import SkillsAdmin from './pages/admin/SkillsAdmin'
import ExperiencesAdmin from './pages/admin/ExperiencesAdmin'
import ProjectsAdmin from './pages/admin/ProjectsAdmin'
import MessagesAdmin from './pages/admin/MessagesAdmin'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public viewer site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin login (no layout) */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected admin panel */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/profile" element={<ProfileEdit />} />
            <Route path="/admin/skills" element={<SkillsAdmin />} />
            <Route path="/admin/experiences" element={<ExperiencesAdmin />} />
            <Route path="/admin/projects" element={<ProjectsAdmin />} />
            <Route path="/admin/messages" element={<MessagesAdmin />} />
          </Route>
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 text-center">
      <p className="font-display text-3xl font-bold text-ink">404</p>
      <p className="text-ink-soft">Page not found.</p>
    </div>
  )
}
