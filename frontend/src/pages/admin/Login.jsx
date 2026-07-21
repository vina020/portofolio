import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form.email, form.password)
      navigate('/admin')
    } catch {
      setError('Email or password is incorrect.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-dim px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <p className="font-mono-tag text-xs uppercase tracking-wide text-sky">Admin</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-ink">Log in</h1>

        <label className="mt-6 block">
          <span className="text-sm font-medium text-ink">Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-2.5 outline-none focus:border-sky"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-medium text-ink">Password</span>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-2.5 outline-none focus:border-sky"
          />
        </label>

        {error && <p className="mt-3 text-sm text-coral">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-ink py-3 text-sm font-semibold text-paper hover:bg-ink/85 disabled:opacity-60"
        >
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </div>
  )
}
