import type { Category } from '../type'

export interface StepConfig {
  category: Category
  title: string
}

export const STEPS: StepConfig[] = [
  { category: 'cameras', title: 'Choose your cameras' },
  { category: 'plan', title: 'Choose your plan' },
  { category: 'sensors', title: 'Choose your sensors' },
  { category: 'accessories', title: 'Add extra protection' },
]
