import { useState } from 'react'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'
import client from '../../api/client'
import { useApiList } from '../../hooks/useApiList'

const emptyForm = { name: '', category: '' }

export default function SkillsAdmin() {
  const { data: skills, refetch } = useApiList('/skills')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState(emptyForm)

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.name || !form.category) return
    await client.post('/skills', form)
    setForm(emptyForm)
    refetch()
  }

  function startEdit(skill) {
    setEditingId(skill.id)
    setEditForm({ name: skill.name, category: skill.category })
  }

  async function saveEdit(id) {
    await client.put(`/skills/${id}`, editForm)
    setEditingId(null)
    refetch()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this skill?')) return
    await client.delete(`/skills/${id}`)
    refetch()
  }

  return (
    <div className="max-w-3xl">
      <p className="font-mono-tag text-xs uppercase tracking-wide text-sky">Skills</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-ink">Manage skills</h1>

      <form onSubmit={handleAdd} className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-ink/10 bg-white p-5">
        <label className="block">
          <span className="text-xs font-medium text-ink-soft">Name</span>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-sky"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-ink-soft">Category</span>
          <input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="e.g. Framework"
            className="mt-1 rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-sky"
          />
        </label>
        <button type="submit" className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink/85">
          <Plus size={15} /> Add
        </button>
      </form>

      <div className="mt-6 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center gap-3 px-5 py-3">
            {editingId === skill.id ? (
              <>
                <input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="flex-1 rounded-lg border border-ink/15 px-2 py-1.5 text-sm"
                />
                <input
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="flex-1 rounded-lg border border-ink/15 px-2 py-1.5 text-sm"
                />
                <button onClick={() => saveEdit(skill.id)} className="text-teal"><Check size={18} /></button>
                <button onClick={() => setEditingId(null)} className="text-ink-soft"><X size={18} /></button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm text-ink">{skill.name}</span>
                <span className="font-mono-tag text-xs uppercase text-ink-soft">{skill.category}</span>
                <button onClick={() => startEdit(skill)} className="text-ink-soft hover:text-ink"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(skill.id)} className="text-coral hover:text-coral/70"><Trash2 size={16} /></button>
              </>
            )}
          </div>
        ))}
        {skills.length === 0 && <p className="px-5 py-6 text-sm text-ink-soft">No skills yet — add one above.</p>}
      </div>
    </div>
  )
}
