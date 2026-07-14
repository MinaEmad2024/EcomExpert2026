import { useEffect, useState, type ComponentType } from 'react'
import { BundleProvider, useBundle } from './state/BundleContext'
import { StepAccordion } from './components/builder/StepAccordion'
import { STEPS } from './lib/steps'
import { CameraIcon, ShieldIcon, SensorIcon, GridIcon } from './components/Icons'
import { ReviewPanel } from './components/review/ReviewPanel'
import type { Category } from './type'

const STEP_ICONS: Record<Category, ComponentType<{ className?: string }>> = {
  cameras: CameraIcon,
  plan: ShieldIcon,
  sensors: SensorIcon,
  accessories: GridIcon,
}

function Builder({ desktopAlt }: { desktopAlt: boolean }) {
  const { state, isLoading } = useBundle()
  if (isLoading) return <div>Loading…</div>

  return (
    <main
      className={`flex min-w-0 flex-col ${
        desktopAlt ? 'w-full gap-0 max-lg:w-full max-lg:gap-step' : 'w-[768px] gap-step max-lg:w-full'
      }`}
    >
      {STEPS.map((step, index) => {
        const Icon = STEP_ICONS[step.category]
        // The alternate mock advances from cameras to sensors; the plan is already configured.
        const next = desktopAlt && step.category === 'cameras' ? STEPS[2] : STEPS[index + 1]
        return (
          <StepAccordion
            key={step.category}
            category={step.category}
            stepNumber={index + 1}
            title={step.title}
            icon={<Icon />}
            next={next}
            products={state.products.filter((product) => product.category === step.category)}
            layout={desktopAlt ? 'desktop-alt' : 'main'}
          />
        )
      })}
    </main>
  )
}

function useMobileViewport() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024)

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return isMobile
}

function App() {
  // desktop-main and desktop-alt share a 1440px reference canvas but have different
  // compositions, so the alternate layout is intentionally addressable by URL.
  const desktopAlt = new URLSearchParams(window.location.search).get('layout') === 'desktop-alt'
  const isMobile = useMobileViewport()
  // The desktop-alt composition has a dedicated desktop reference only. Below the
  // desktop breakpoint, use the exact same component tree as the main layout.
  const desktopAltActive = desktopAlt && !isMobile

  return (
    <BundleProvider>
      <div
        className={
          desktopAlt
            ? 'desktop-alt mx-auto max-w-[1230px] py-10 max-lg:max-w-[1191px] max-lg:px-0 max-lg:pt-8'
            : 'mx-auto max-w-[1191px] px-6 py-10 max-lg:px-0 max-lg:pt-8'
        }
      >
        <h1
          className={`mb-6 text-center text-[32px] leading-[35px] font-bold tracking-[-0.06px] ${
            'hidden max-lg:block'
          }`}
        >
          Let's get started!
        </h1>
        <div
          className={
            desktopAlt
              ? 'flex flex-col gap-8 max-lg:gap-6'
              : 'flex items-start gap-6 max-lg:flex-col max-lg:items-stretch'
          }
        >
          <Builder desktopAlt={desktopAltActive} />
          {desktopAltActive ? (
            <ReviewPanel layout="desktop-alt" />
          ) : (
            <aside className="sticky top-6 w-[399px] min-w-0 max-lg:static max-lg:w-full">
              <ReviewPanel />
            </aside>
          )}
        </div>
      </div>
    </BundleProvider>
  )
}

export default App
