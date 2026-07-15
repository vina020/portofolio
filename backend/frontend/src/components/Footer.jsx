import { Mail, MapPin, Phone, Code2, Link2, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'

export default function Footer() {
  const { profile } = useProfile()

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold">Vina Nur Aini</p>
          <p className="mt-3 max-w-xs text-sm text-paper/70">
            {profile?.tagline || 'Information Systems Student | Data Analyst | Web Developer'}
          </p>
        </div>

        <div>
          <p className="font-mono-tag text-xs uppercase tracking-wide text-paper/50">Quick Links</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/projects" className="hover:text-gold">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono-tag text-xs uppercase tracking-wide text-paper/50">Get in touch</p>
          <ul className="mt-4 space-y-3 text-sm">
            {profile?.email && (
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-gold" />
                <a href={`mailto:${profile.email}`} className="hover:text-gold">{profile.email}</a>
              </li>
            )}
            {profile?.phone && (
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-gold" /> {profile.phone}
              </li>
            )}
            {profile?.location && (
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-gold" /> {profile.location}
              </li>
            )}
            <li className="flex flex-col gap-2 pt-1">
              {profile?.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold">
                  <Link2 size={16} /> LinkedIn
                </a>
              )}
              {profile?.github_url && (
                <a href={profile.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold">
                  <Code2 size={16} /> GitHub
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-paper/10 px-6 py-5 text-xs text-paper/40">
        <span>&copy; {new Date().getFullYear()} Vina Nur Aini.</span>
        <Link to="/admin/login" className="flex items-center gap-1 hover:text-paper/70" aria-label="Admin login">
          <Lock size={12} /> Admin
        </Link>
      </div>
    </footer>
  )
}
