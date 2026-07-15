import { useProfile } from '../../hooks/useProfile'
import { useApiList } from '../../hooks/useApiList'
import BrandSwoosh from '../../components/BrandSwoosh'

const TYPE_LABEL = {
  organization: 'Organization',
  internship: 'Internship',
  volunteer: 'Volunteer',
}

export default function About() {
  const { profile } = useProfile()
  const { data: skills } = useApiList('/skills')
  const { data: experiences } = useApiList('/experiences')

  const skillGroups = groupBy(skills, 'category')

  return (
    <div>
      {/* Bio */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="font-mono-tag text-xs uppercase tracking-wide text-sky">About Me</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">
          {profile?.name || 'Vina Nur Aini'}
        </h1>
        <div className="mt-6 space-y-4 whitespace-pre-line text-ink-soft">
          {profile?.about}
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="grid border-y border-ink/10 md:grid-cols-2">
        <div className="bg-paper-dim px-6 py-14 md:px-12">
          <p className="font-mono-tag text-xs uppercase tracking-wide text-ink-soft">Vision</p>
          <p className="mt-4 max-w-md font-display text-xl font-semibold text-ink">{profile?.vision}</p>
        </div>
        <div className="relative overflow-hidden bg-ink px-6 py-14 text-paper md:px-12">
          <BrandSwoosh size={260} className="pointer-events-none absolute -bottom-16 -right-16 text-paper/10" />
          <p className="font-mono-tag text-xs uppercase tracking-wide text-gold">Mission</p>
          <p className="relative mt-4 max-w-md font-display text-xl font-semibold">{profile?.mission}</p>
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="font-mono-tag text-xs uppercase tracking-wide text-ink-soft">Skills</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">What I work with</h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {Object.entries(skillGroups).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-display text-sm font-semibold text-ink">{category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill.id}
                    className="font-mono-tag rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink-soft"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience timeline */}
      <section className="bg-paper-dim py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-mono-tag text-xs uppercase tracking-wide text-ink-soft">Experience</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">Leadership &amp; involvement</h2>

          <ol className="mt-10 space-y-8 border-l border-ink/15 pl-6">
            {experiences.map((exp) => (
              <li key={exp.id} className="relative">
                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-gold" />
                <p className="font-mono-tag text-[11px] uppercase tracking-wide text-ink-soft">
                  {exp.period} · {TYPE_LABEL[exp.type] || exp.type}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">{exp.title}</h3>
                <p className="text-sm font-medium text-ink-soft">{exp.organization}</p>
                <p className="mt-2 whitespace-pre-line text-sm text-ink-soft">{exp.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const group = item[key]
    acc[group] = acc[group] || []
    acc[group].push(item)
    return acc
  }, {})
}
