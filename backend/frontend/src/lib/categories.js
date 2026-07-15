export const CATEGORIES = [
  'Web Programming',
  'Mobile Programming',
  'Machine Learning',
  'Data Analysis & Visualization',
  'Interaction Design',
]

const MAP = {
  'Web Programming': { solid: 'bg-sky', soft: 'bg-sky-soft', text: 'text-sky', ring: 'ring-sky' },
  'Mobile Programming': { solid: 'bg-coral', soft: 'bg-coral-soft', text: 'text-coral', ring: 'ring-coral' },
  'Machine Learning': { solid: 'bg-gold', soft: 'bg-gold-soft', text: 'text-gold', ring: 'ring-gold' },
  'Data Analysis & Visualization': { solid: 'bg-teal', soft: 'bg-teal-soft', text: 'text-teal', ring: 'ring-teal' },
  'Interaction Design': { solid: 'bg-plum', soft: 'bg-plum-soft', text: 'text-plum', ring: 'ring-plum' },
}

const FALLBACK = { solid: 'bg-ink', soft: 'bg-paper-dim', text: 'text-ink', ring: 'ring-ink' }

export function categoryColors(category) {
  return MAP[category] || FALLBACK
}
