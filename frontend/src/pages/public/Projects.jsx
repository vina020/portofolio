import { useState } from 'react'
import { useApiList } from '../../hooks/useApiList'
import ProjectCard from '../../components/ProjectCard'
import { CATEGORIES } from '../../lib/categories'

export default function Projects() {
  const [category, setCategory] = useState('All')
  const { data: projects, loading } = useApiList('/projects', { category })

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="font-mono-tag text-xs uppercase tracking-wide text-sky">Project Portfolio</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">All Projects</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Web and mobile development, machine learning, data visualization, and interaction design work.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {['All', ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`font-mono-tag rounded-full px-4 py-2 text-xs uppercase transition ${
              category === c
                ? 'bg-ink text-paper'
                : 'border border-ink/15 text-ink-soft hover:border-ink/40'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {loading && <p className="col-span-3 text-sm text-ink-soft">Loading projects…</p>}
        {!loading && projects.length === 0 && (
          <p className="col-span-3 text-sm text-ink-soft">No projects in this category yet.</p>
        )}
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
