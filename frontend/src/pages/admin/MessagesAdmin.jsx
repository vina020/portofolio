import { Mail, MailOpen, Trash2 } from 'lucide-react'
import client from '../../api/client'
import { useApiList } from '../../hooks/useApiList'

export default function MessagesAdmin() {
  const { data: messages, refetch } = useApiList('/messages')

  async function markRead(id) {
    await client.patch(`/messages/${id}/read`)
    refetch()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this message?')) return
    await client.delete(`/messages/${id}`)
    refetch()
  }

  return (
    <div className="max-w-3xl">
      <p className="font-mono-tag text-xs uppercase tracking-wide text-sky">Inbox</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-ink">Messages</h1>

      <div className="mt-6 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 px-5 py-4 ${!msg.is_read ? 'bg-sky-soft/40' : ''}`}>
            <span className="mt-1 text-ink-soft">
              {msg.is_read ? <MailOpen size={16} /> : <Mail size={16} className="text-sky" />}
            </span>
            <div className="flex-1">
              <p className="font-display text-sm font-semibold text-ink">
                {msg.subject || '(No subject)'}
              </p>
              <p className="text-xs text-ink-soft">{msg.name} &middot; {msg.email}</p>
              <p className="mt-2 whitespace-pre-line text-sm text-ink-soft">{msg.message}</p>
              <p className="mt-2 text-[11px] text-ink-soft/70">
                {new Date(msg.created_at).toLocaleString('id-ID')}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {!msg.is_read && (
                <button onClick={() => markRead(msg.id)} className="text-xs font-medium text-sky hover:underline">
                  Mark read
                </button>
              )}
              <button onClick={() => handleDelete(msg.id)} className="text-coral hover:text-coral/70">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="px-5 py-6 text-sm text-ink-soft">No messages yet.</p>}
      </div>
    </div>
  )
}
