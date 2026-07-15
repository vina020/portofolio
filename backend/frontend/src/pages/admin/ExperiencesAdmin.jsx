import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import client from '../../api/client'
import { useApiList } from '../../hooks/useApiList'

const emptyForm = { title: '', organization: '', type: 'organization', period: '', description: '' }

export default function ExperiencesAdmin() {
  const { data: experiences, refetch } = useApiList('/experiences')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function startEdit(exp) {
    setEditingId(exp.id)
    setForm({
      title: exp.title,
      organization: exp.organization,
      type: exp.type,
      period: exp.period,
      description: exp.description || '',
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(emptyForm)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (editingId) {
      await client.put(`/experiences/${editingId}`, form)
    } else {
      await client.post('/experiences', form)
    }
    cancelEdit()
    refetch()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this experience entry?')) return
    await client.delete(`/experiences/${id}`)
    refetch()
  }

  return (
    <div className="max-w-3xl">
      <p className="font-mono-tag text-xs uppercase tracking-wide text-sky">Experience</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-ink">Manage experience</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-ink/10 bg-white p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title / Role" name="title" value={form.title} onChange={handleChange} required />
          <Field label="Organization" name="organization" value={form.organization} onChange={handleChange} required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-ink">Type</span>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-sky"
            >
              <option value="organization">Organization</option>
              <option value="internship">Internship</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </label>
          <Field label="Period" name="period" value={form.period} onChange={handleChange} placeholder="e.g. Maret 2024 - Desember 2024" required />
        </div>
        <Field label="Description" name="description" value={form.description} onChange={handleChange} textarea rows={4} />

        <div className="flex items-center gap-3">
          <button type="submit" className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-ink/85">
            {editingId ? 'Update entry' : 'Add entry'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="text-sm font-medium text-ink-soft">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
        {experiences.map((exp) => (
          <div key={exp.id} className="flex items-start gap-3 px-5 py-4">
            <div className="flex-1">
              <p className="font-mono-tag text-[11px] uppercase text-ink-soft">{exp.period} · {exp.type}</p>
              <p className="font-display text-sm font-semibold text-ink">{exp.title}</p>
              <p className="text-sm text-ink-soft">{exp.organization}</p>
            </div>
            <button onClick={() => startEdit(exp)} className="text-ink-soft hover:text-ink"><Pencil size={16} /></button>
            <button onClick={() => handleDelete(exp.id)} className="text-coral hover:text-coral/70"><Trash2 size={16} /></button>
          </div>
        ))}
        {experiences.length === 0 && <p className="px-5 py-6 text-sm text-ink-soft">No entries yet — add one above.</p>}
      </div>
    </div>
  )
}

function Field({ label, name, value, onChange, textarea = false, rows = 3, required = false, placeholder }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <Tag
        name={name}
        value={value}
        onChange={onChange}
        rows={textarea ? rows : undefined}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-sky"
      />
    </label>
  )
}
