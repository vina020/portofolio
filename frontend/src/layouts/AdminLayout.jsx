import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, User, Sparkles, Briefcase, FolderKanban, Mail, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/profile', label: 'Profile', icon: User },
  { to: '/admin/skills', label: 'Skills', icon: Sparkles },
  { to: '/admin/experiences', label: 'Experience', icon: Briefcase },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
]

export default function AdminLayout() {
  const { logout, user } = useAuth()

  return (
    <div className="flex min-h-screen bg-paper-dim">
      <aside className="hidden w-60 flex-col border-r border-ink/10 bg-white px-4 py-6 sm:flex h-screen sticky top-0 overflow-y-auto">
        <p className="px-2 font-display text-lg font-bold text-ink">Admin Panel</p>
        <p className="px-2 text-xs text-ink-soft">{user?.email}</p>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? 'bg-ink text-paper' : 'text-ink-soft hover:bg-paper-dim'
                }`
              }
            >
              <Icon size={17} /> {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-coral hover:bg-coral-soft"
        >
          <LogOut size={17} /> Log out
        </button>
      </aside>

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto h-screen">
        <Outlet />
      </main>
    </div>
  )
}
