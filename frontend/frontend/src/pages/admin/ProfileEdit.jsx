import { useEffect, useState } from 'react'
import client from '../../api/client'

const empty = {
  name: '', tagline: '', about: '', vision: '', mission: '',
  email: '', phone: '', location: '', linkedin_url: '', github_url: '',
}

export default function ProfileEdit() {
  const [form, setForm] = useState(empty)
  const [photoFile, setPhotoFile] = useState(null)
  const [cvFile, setCvFile] = useState(null)
  const [profile, setProfile] = useState(null)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    client.get('/profile').then((res) => {
      if (res.data) {
        setForm({ ...empty, ...res.data })
        setProfile(res.data)
      }
    })
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('saving')
    const payload = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined) payload.append(key, value)
    })
    if (photoFile) payload.append('photo', photoFile)
    if (cvFile) payload.append('cv', cvFile)

    try {
      const res = await client.put('/profile', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setProfile(res.data)
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-3xl">
      <p className="font-mono-tag text-xs uppercase tracking-wide text-sky">Profile</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-ink">Edit profile</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-2xl border border-ink/10 bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
          <Field label="Tagline" name="tagline" value={form.tagline} onChange={handleChange} />
        </div>

        <Field label="About" name="about" value={form.about} onChange={handleChange} textarea rows={6} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Vision" name="vision" value={form.vision} onChange={handleChange} textarea rows={4} />
          <Field label="Mission" name="mission" value={form.mission} onChange={handleChange} textarea rows={4} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
          <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          <Field label="Location" name="location" value={form.location} onChange={handleChange} />
          <Field label="LinkedIn URL" name="linkedin_url" value={form.linkedin_url} onChange={handleChange} />
          <Field label="GitHub URL" name="github_url" value={form.github_url} onChange={handleChange} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FileField label="Photo" onChange={setPhotoFile} preview={profile?.photo_url} accept="image/*" />
          <FileField label="CV (PDF)" onChange={setCvFile} preview={profile?.cv_url} accept="application/pdf" />
        </div>

        <button
          type="submit"
          disabled={status === 'saving'}
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-ink/85 disabled:opacity-60"
        >
          {status === 'saving' ? 'Saving…' : 'Save changes'}
        </button>
        {status === 'saved' && <span className="ml-3 text-sm font-medium text-teal">Saved.</span>}
        {status === 'error' && <span className="ml-3 text-sm font-medium text-coral">Something went wrong.</span>}
      </form>
    </div>
  )
}

function Field({ label, name, value, onChange, type = 'text', textarea = false, rows = 3, required = false }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <Tag
        name={name}
        type={textarea ? undefined : type}
        value={value || ''}
        onChange={onChange}
        rows={textarea ? rows : undefined}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-2.5 outline-none focus:border-sky"
      />
    </label>
  )
}

function FileField({ label, onChange, preview, accept }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files[0])}
        className="mt-1.5 block w-full text-sm text-ink-soft"
      />
      {preview && (
        <a href={preview} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-sky">
          View current file
        </a>
      )}
    </label>
  )
}
