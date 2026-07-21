import { useState } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import client from '../../api/client'
import { useProfile } from '../../hooks/useProfile'

const initialForm = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const { profile } = useProfile()
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setErrors({})
    try {
      await client.post('/contact', form)
      setStatus('sent')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setErrors(err.response?.data?.errors || {})
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="font-mono-tag text-xs uppercase tracking-wide text-sky">Contact</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">Let&apos;s talk</h1>
      <p className="mt-3 max-w-lg text-ink-soft">
        Have a project, internship opportunity, or just want to say hi? Send a message below.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} required />
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required />
          <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} error={errors.subject} />
          <Field
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            error={errors.message}
            textarea
            required
          />

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-ink/85 disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'} <Send size={15} />
          </button>

          {status === 'sent' && (
            <p className="text-sm font-medium text-teal">Message sent — thanks, I&apos;ll get back to you soon.</p>
          )}
          {status === 'error' && Object.keys(errors).length === 0 && (
            <p className="text-sm font-medium text-coral">Something went wrong. Please try again.</p>
          )}
        </form>

        <div className="space-y-4 rounded-2xl bg-paper-dim p-8">
          <p className="font-mono-tag text-xs uppercase tracking-wide text-ink-soft">Direct contact</p>
          {profile?.email && (
            <p className="flex items-center gap-2 text-ink"><Mail size={16} className="text-sky" /> {profile.email}</p>
          )}
          {profile?.phone && (
            <p className="flex items-center gap-2 text-ink"><Phone size={16} className="text-sky" /> {profile.phone}</p>
          )}
          {profile?.location && (
            <p className="flex items-center gap-2 text-ink"><MapPin size={16} className="text-sky" /> {profile.location}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, name, value, onChange, error, type = 'text', textarea = false, required = false }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <Tag
        name={name}
        type={textarea ? undefined : type}
        value={value}
        onChange={onChange}
        required={required}
        rows={textarea ? 5 : undefined}
        className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-ink outline-none focus:border-sky"
      />
      {error && <span className="mt-1 block text-xs text-coral">{error[0]}</span>}
    </label>
  )
}
