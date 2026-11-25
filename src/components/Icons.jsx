export const Birrete = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 12 4 25l28 13 28-13z" fill="#ffd166" />
    <path d="M15 33v11c0 4 8 8 17 8s17-4 17-8V33L32 40z" fill="#ff6bb5" />
    <path d="M57 27v15" stroke="#5ee7ff" strokeWidth="3" strokeLinecap="round" />
    <circle cx="57" cy="45" r="3" fill="#5ee7ff" />
  </svg>
)

const base = {
  viewBox: '0 0 24 24', width: 28, height: 28, fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
}

export const IcoCalendario = () => (
  <svg {...base}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
)
export const IcoReloj = () => (
  <svg {...base}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
)
export const IcoPin = () => (
  <svg {...base}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
)
