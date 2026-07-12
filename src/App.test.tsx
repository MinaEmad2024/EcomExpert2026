import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import App from './App'
import bundleData from '../public/bundle.json'

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      json: () => Promise.resolve(bundleData),
    }),
  )
})

describe('App', () => {
  it('updates the review panel when a card stepper changes', async () => {
    render(<App />)

    const card = await screen.findByTestId('product-card-cam-v4')
    fireEvent.click(within(card).getByRole('button', { name: 'Increase quantity' }))

    const reviewLine = await screen.findByTestId('review-line-cam-v4:white')
    expect(within(reviewLine).getByText('2')).toBeInTheDocument()
    expect(reviewLine).toHaveTextContent('$55.96')
  })

  it('keeps each variant a separate quantity, both reflected in the review panel', async () => {
    render(<App />)

    const card = await screen.findByTestId('product-card-cam-v4')

    // Seeded: White = 1. Bump it to 2.
    fireEvent.click(within(card).getByRole('button', { name: 'Increase quantity' }))
    expect(within(card).getByText('2')).toBeInTheDocument()

    // Switch to Black — its own stepper should read 0, independent of White.
    fireEvent.click(within(card).getByRole('button', { name: 'Black' }))
    expect(within(card).getByText('0')).toBeInTheDocument()

    // Add 1 Black.
    fireEvent.click(within(card).getByRole('button', { name: 'Increase quantity' }))
    expect(within(card).getByText('1')).toBeInTheDocument()

    // Both variants now show up as independent review lines.
    const whiteLine = await screen.findByTestId('review-line-cam-v4:white')
    const blackLine = await screen.findByTestId('review-line-cam-v4:black')
    expect(within(whiteLine).getByText('2')).toBeInTheDocument()
    expect(within(blackLine).getByText('1')).toBeInTheDocument()

    // Switching back to White shows its untouched count of 2, not Black's.
    fireEvent.click(within(card).getByRole('button', { name: 'White' }))
    expect(within(card).getByText('2')).toBeInTheDocument()
  })
})