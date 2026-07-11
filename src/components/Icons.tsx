interface IconProps {
  className?: string
}

export function CameraIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="3" width="14" height="11" rx="3" />
      <circle cx="11" cy="8.5" r="2.6" />
      <circle cx="15.3" cy="11.3" r="0.6" fill="currentColor" stroke="none" />
      <path d="M11 14v3.2" strokeLinecap="round" />
      <path d="M6.5 20h9" strokeLinecap="round" />
    </svg>
  )
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" strokeLinejoin="round" />
    </svg>
  )
}

export function SensorIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="7" y="3" width="10" height="6" rx="1.5" />
      <circle cx="10" cy="6" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="14" cy="6" r="0.5" fill="currentColor" stroke="none" />
      <path d="M6 13a8 8 0 0 1 12 0" strokeLinecap="round" />
      <path d="M8.5 16a5 5 0 0 1 7 0" strokeLinecap="round" />
    </svg>
  )
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="10.5" y="2" width="3" height="3" rx="0.8" />
      <rect x="7" y="6" width="3" height="3" rx="0.8" />
      <rect x="10.5" y="6" width="3" height="3" rx="0.8" />
      <rect x="14" y="6" width="3" height="3" rx="0.8" />
      <rect x="4" y="10" width="3" height="3" rx="0.8" />
      <rect x="7.5" y="10" width="3" height="3" rx="0.8" />
      <rect x="11" y="10" width="3" height="3" rx="0.8" />
      <rect x="14.5" y="10" width="3" height="3" rx="0.8" />
      <rect x="18" y="10" width="3" height="3" rx="0.8" />
      <rect x="7" y="14" width="3" height="3" rx="0.8" />
      <rect x="10.5" y="14" width="3" height="3" rx="0.8" />
      <rect x="14" y="14" width="3" height="3" rx="0.8" />
    </svg>
  )
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12h10M4 8h6" />
      <path d="M12 8h4l3 3.5V16h-7V8z" />
      <circle cx="8" cy="17.5" r="1.6" />
      <circle cx="16.5" cy="17.5" r="1.6" />
    </svg>
  )
}

export function WyzeShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" strokeLinejoin="round" />
    </svg>
  )
}