import { useState } from 'react'
import { Pencil, Trash2, Plus, X } from 'lucide-react'
import client from '../../api/client'
import { useApiList } from '../../hooks/useApiList'
import { CATEGORIES } from '../../lib/categories'

const emptyForm = {
  title: '', category: CATEGORIES[0], summary: '', description: '',
  tools: '', key_results: '', project_url: '', featured: false, order: 0,
}

export default function ProjectsAdmin() {
  const { data: projects, refetch } = useApiList('/projects')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [thumbnail, setThumbnail] = useState(null)
  const [gallery, setGallery] = useState([])
  const [saving, setSaving] = useState(false)

  function openNew() {
    setEditingId(null)
    setForm(emptyForm)
    setThumbnail(null)
    setGallery([])
    setShowForm(true)
  }

  function openEdit(project) {
    setEditingId(project.id)
    setForm({
      title: project.title,
      category: project.category,
      summary: project.summary || '',
      description: project.description || '',
      tools: (project.tools || []).join('\n'),
      key_results: (project.key_results || []).join('\n'),
      project_url: project.project_url || '',
      featured: project.featured,
      order: project.order,
    })
    setThumbnail(null)
    setGallery([])
    setShowForm(true)
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    const payload = new FormData()
    Object.entries(form).forEach(([key, value]) => payload.append(key, value))
    if (thumbnail) payload.append('thumbnail', thumbnail)
    gallery.forEach((file) => payload.append('gallery[]', file))

    try {
      if (editingId) {
        await client.post(`/projects/${editingId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      } else {
        await client.post('/projects', payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      }
      setShowForm(false)
      refetch()
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this project?')) return
    await client.delete(`/projects/${id}`)
    refetch()
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono-tag text-xs uppercase tracking-wide text-sky">Projects</p>
          <h1 className="mt-2 font-display text-2xl font-bold text-ink">Manage projects</h1>
        </div>
        {!showForm && (
          <button onClick={openNew} className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink/85">
            <Plus size={15} /> New project
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-ink/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="font-display font-semibold text-ink">{editingId ? 'Edit project' : 'New project'}</p>
            <button type="button" onClick={() => setShowForm(false)} className="text-ink-soft"><X size={18} /></button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title" name="title" value={form.title} onChange={handleChange} required />
            <label className="block">
              <span className="text-sm font-medium text-ink">Category</span>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-sky"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
          </div>

          <Field label="Summary (short, for cards)" name="summary" value={form.summary} onChange={handleChange} />
          <Field label="Description" name="description" value={form.description} onChange={handleChange} textarea rows={5} />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tools (one per line)" name="tools" value={form.tools} onChange={handleChange} textarea rows={4} />
            <Field label="Key results (one per line)" name="key_results" value={form.key_results} onChange={handleChange} textarea rows={4} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Project URL (optional)" name="project_url" value={form.project_url} onChange={handleChange} />
            <Field label="Order" name="order" type="number" value={form.order} onChange={handleChange} />
          </div>

          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
            Show in "Featured Projects" on the homepage
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-ink">Thumbnail image</span>
              <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} className="mt-1.5 block w-full text-sm text-ink-soft" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">Gallery images (replaces existing)</span>
              <input type="file" accept="image/*" multiple onChange={(e) => setGallery(Array.from(e.target.files))} className="mt-1.5 block w-full text-sm text-ink-soft" />
            </label>
          </div>

          <button type="submit" disabled={saving} className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-ink/85 disabled:opacity-60">
            {saving ? 'Saving…' : editingId ? 'Update project' : 'Create project'}
          </button>
        </form>
      )}

      <div className="mt-6 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center gap-4 px-5 py-4">
            <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-paper-dim">
              {project.thumbnail_url && (
                <img src={project.thumbnail_url} alt="" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-mono-tag text-[11px] uppercase text-ink-soft">{project.category}{project.featured ? ' · Featured' : ''}</p>
              <p className="font-display text-sm font-semibold text-ink">{project.title}</p>
            </div>
            <button onClick={() => openEdit(project)} className="text-ink-soft hover:text-ink"><Pencil size={16} /></button>
            <button onClick={() => handleDelete(project.id)} className="text-coral hover:text-coral/70"><Trash2 size={16} /></button>
          </div>
        ))}
        {projects.length === 0 && <p className="px-5 py-6 text-sm text-ink-soft">No projects yet — add one above.</p>}
      </div>
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
        value={value}
        onChange={onChange}
        rows={textarea ? rows : undefined}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-sky"
      />
    </label>
  )
}
