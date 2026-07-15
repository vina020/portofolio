import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { useApiList } from '../../hooks/useApiList'
import ProjectCard from '../../components/ProjectCard'
import BrandSwoosh from '../../components/BrandSwoosh'

export default function Home() {
  const { profile } = useProfile()
  const { data: projects, loading } = useApiList('/projects')
  const featured = projects.filter((p) => p.featured).slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <BrandSwoosh
          size={420}
          className="pointer-events-none absolute -right-24 -top-24 text-sky/20"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="font-mono-tag text-xs uppercase tracking-wide text-sky">
              Portfolio — Information Systems
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
              Hi, I&apos;m {profile?.name || 'Vina Nur Aini'}.
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink-soft">
              {profile?.tagline || 'Information Systems Student | Data Analyst | Web Developer'}
            </p>
            {profile?.location && (
              <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-soft">
                <MapPin size={14} /> {profile.location}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-ink/85"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/40"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-[2.5rem] bg-gold/25" />
            <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-sky-soft">
              {profile?.photo_url ? (
                <img src={profile.photo_url} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-display text-6xl font-bold text-sky">
                  VA
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Currently */}
      <section className="border-y border-ink/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <p className="text-sm text-ink-soft">
            <span className="font-mono-tag mr-2 rounded-full bg-teal-soft px-2.5 py-1 text-[10px] uppercase text-teal">
              Currently
            </span>
            Building <span className="font-semibold text-ink">EarlyPath</span>, an AI-assisted internship management portal, as a Web Developer Intern at Otak Kanan.
          </p>
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono-tag text-xs uppercase tracking-wide text-ink-soft">Selected Work</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">Featured Projects</h2>
          </div>
          <Link to="/projects" className="hidden items-center gap-1 text-sm font-medium text-ink hover:text-gold md:flex">
            View all <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {loading && (
            <p className="col-span-3 text-sm text-ink-soft">Loading projects…</p>
          )}
          {!loading && featured.length === 0 && (
            <p className="col-span-3 text-sm text-ink-soft">No featured projects yet.</p>
          )}
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <Link to="/projects" className="mt-8 flex items-center gap-1 text-sm font-medium text-ink hover:text-gold md:hidden">
          View all projects <ArrowRight size={15} />
        </Link>
      </section>

      {/* About teaser */}
      <section className="bg-ink py-20 text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          <div>
            <p className="font-mono-tag text-xs uppercase tracking-wide text-gold">About</p>
            <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
              Bridging technology, data, and business.
            </h2>
          </div>
          <div>
            <p className="text-paper/80">
              {(profile?.about || '').split('\n')[0] ||
                'Undergraduate Information Systems student focused on data visualization, analysis, and financial decision-making.'}
            </p>
            <Link to="/about" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold/80">
              Read full story <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
