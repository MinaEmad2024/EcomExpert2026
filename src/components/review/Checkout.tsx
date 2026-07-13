import { useState } from 'react'
import { useBundle } from '../../state/BundleContext'

export function Checkout({ className = '' }: { className?: string }) {
  const { saveForLater } = useBundle()
  const [checkedOut, setCheckedOut] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div className={`mt-2.5 flex flex-col items-center gap-2 ${className}`}>
      <button
        type="button"
        className="w-full cursor-pointer rounded-button border-0 bg-primary py-3 text-[17px] font-bold text-white"
        onClick={() => setCheckedOut(true)}
      >
        Checkout
      </button>
      {checkedOut && (
        <p className="text-sm text-savings">Thanks! This is a demo — no order was placed.</p>
      )}
      <button
        type="button"
        className="cursor-pointer border-0 bg-transparent text-sm text-label italic underline"
        onClick={() => {
          saveForLater()
          setSaved(true)
        }}
      >
        Save my system for later
      </button>
      {saved && <p className="text-sm text-savings">Saved! Reload the page to restore it.</p>}
    </div>
  )
}
