import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import client from '../../api/client'
import { categoryColors } from '../../lib/categories'

export default function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    setStatus('loading')
    client
      .get(`/projects/${slug}`)
      .then((res) => {
        setProject(res.data)
        setStatus('ready')
      })
      .catch(() => setStatus('not-found'))
  }, [slug])

  if (status === 'loading') {
    return <p className="px-6 py-20 text-center text-ink-soft">Loading…</p>
  }

  if (status === 'not-found' || !project) {
    return (
      <div className="px-6 py-24 text-center">
        <p className="font-display text-2xl font-bold text-ink">Project not found</p>
        <Link to="/projects" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky">
          <ArrowLeft size={15} /> Back to projects
        </Link>
      </div>
    )
  }

  const colors = categoryColors(project.category)

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link to="/projects" className="inline-flex items-center gap-1 text-sm font-medium text-ink-soft hover:text-ink">
        <ArrowLeft size={15} /> Back to projects
      </Link>

      <span className={`font-mono-tag mt-6 inline-block w-fit rounded-full px-3 py-1.5 text-[11px] uppercase ${colors.soft} ${colors.text}`}>
        {project.category}
      </span>
      <h1 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">{project.title}</h1>
      {project.summary && <p className="mt-3 text-lg text-ink-soft">{project.summary}</p>}

      {project.thumbnail_url && (
        <img
          src={project.thumbnail_url}
          alt={project.title}
          className="mt-8 w-full rounded-2xl border border-ink/10 object-cover"
        />
      )}

      {project.description && (
        <div className="mt-10 whitespace-pre-line text-ink-soft">{project.description}</div>
      )}

      {project.tools?.length > 0 && (
        <div className="mt-8">
          <p className="font-mono-tag text-xs uppercase tracking-wide text-ink-soft">Tools &amp; Technologies</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span key={tool} className="font-mono-tag rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink-soft">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.key_results?.length > 0 && (
        <div className="mt-8">
          <p className="font-mono-tag text-xs uppercase tracking-wide text-ink-soft">Key Results</p>
          <ul className="mt-3 space-y-2">
            {project.key_results.map((result, i) => (
              <li key={i} className="flex items-start gap-2 text-ink-soft">
                <CheckCircle2 size={18} className={`mt-0.5 shrink-0 ${colors.text}`} />
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.gallery_urls?.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {project.gallery_urls.map((url) => (
            <img key={url} src={url} alt="" className="rounded-xl border border-ink/10 object-cover" />
          ))}
        </div>
      )}

      {project.project_url && (
        <a
          href={project.project_url}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-ink/85"
        >
          Visit project <ArrowUpRight size={15} />
        </a>
      )}
    </article>
  )
}
