import { BundleProvider, useBundle } from './state/BundleContext'
import type { ComponentType } from 'react'
import { StepAccordion } from './components/builder/StepAccordion'
import { STEPS } from './lib/steps'
import { CameraIcon, ShieldIcon, SensorIcon, GridIcon } from './components/Icons'
import type { Category } from './type'



    const STEP_ICONS: Record<Category, ComponentType<{ className?: string }>> = {
      cameras: CameraIcon,
      plan: ShieldIcon,
      sensors: SensorIcon,
      accessories: GridIcon,
    }

    function Builder() {
      const { state, isLoading } = useBundle()
      if (isLoading) return <div>Loading…</div>


      return (    <main className="flex w-[768px] min-w-0 flex-col gap-step max-lg:w-full">
        {STEPS.map((step, index) => {
          const Icon = STEP_ICONS[step.category]
          return (
            <StepAccordion
              key={step.category}
              category={step.category}
              stepNumber={index + 1}
              title={step.title}
              icon={<Icon />}
              next={STEPS[index + 1]}
              products={state.products.filter((product) => product.category === step.category)}
            />
          )
        })}
      </main>
    )
  }

  

function App() {
  return (
    <BundleProvider>
      <div className="mx-auto max-w-[1191px] px-6 py-10">
        <h1 className="mb-6 hidden text-center text-[32px] leading-[35px] font-bold tracking-[-0.06px] max-lg:block">
          Let's get started!
        </h1>
        <div className="flex items-start gap-6 max-lg:flex-col max-lg:items-stretch">
          <Builder />
          <aside className="sticky top-6 w-[399px] min-w-0 max-lg:static max-lg:w-full">
            Review panel coming in step 5
          </aside>
        </div>
      </div>    </BundleProvider>
  )


}

export default App
