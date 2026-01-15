"use client"

export default function PlanningToggle({
  value,
  onChange,
}: {
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>
        Planning Agent {value ? "(ON)" : "(OFF – Quick Mode)"}
      </span>
    </div>
  )
}
