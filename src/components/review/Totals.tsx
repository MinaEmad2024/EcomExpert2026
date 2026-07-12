interface TotalsProps {
  activeTotal: number
  compareTotal: number
}

export function Totals({ activeTotal, compareTotal }: TotalsProps) {
  const showCompare = compareTotal > activeTotal

  return (
    <span className="inline-flex flex-col items-end gap-0.5">
      {showCompare && (
        <span className="text-base font-medium text-muted line-through">${compareTotal.toFixed(2)}</span>
      )}
      <span className="text-[26px] leading-8 font-bold tracking-[-0.03px] text-primary">
        ${activeTotal.toFixed(2)}
      </span>
    </span>
  )
}