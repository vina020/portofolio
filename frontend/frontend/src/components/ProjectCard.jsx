import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categoryColors } from '../lib/categories'

export default function ProjectCard({ project }) {
  const colors = categoryColors(project.category)

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-shadow hover:shadow-lg"
    >
      <div className={`relative flex h-44 items-center justify-center overflow-hidden ${colors.soft}`}>
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className={`font-display text-3xl font-bold ${colors.text}`}>
            {project.title.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className={`font-mono-tag w-fit rounded-full px-2.5 py-1 text-[10px] uppercase ${colors.soft} ${colors.text}`}>
          {project.category}
        </span>
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-soft">{project.summary}</p>
        <span className="mt-auto flex items-center gap-1 text-sm font-medium text-ink group-hover:text-gold">
          View case study <ArrowUpRight size={15} />
        </span>
      </div>
    </Link>
  )
}
