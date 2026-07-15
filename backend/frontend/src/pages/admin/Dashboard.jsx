import { useApiList } from '../../hooks/useApiList'

export default function Dashboard() {
  const { data: projects } = useApiList('/projects')
  const { data: skills } = useApiList('/skills')
  const { data: experiences } = useApiList('/experiences')
  const { data: messages } = useApiList('/messages')

  const unread = messages.filter((m) => !m.is_read).length

  const stats = [
    { label: 'Projects', value: projects.length },
    { label: 'Skills', value: skills.length },
    { label: 'Experience entries', value: experiences.length },
    { label: 'Unread messages', value: unread },
  ]

  return (
    <div>
      <p className="font-mono-tag text-xs uppercase tracking-wide text-sky">Overview</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-ink">Dashboard</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-ink/10 bg-white p-6">
            <p className="font-display text-3xl font-bold text-ink">{stat.value}</p>
            <p className="mt-1 text-sm text-ink-soft">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
