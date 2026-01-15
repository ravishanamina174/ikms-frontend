"use client"

export default function PlanningToggle({
  value,
  onChange,
}: {
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Planning Agent
      </span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`button-click relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 ${
          value
            ? "bg-black dark:bg-white"
            : "bg-gray-300 dark:bg-gray-600"
        }`}
        role="switch"
        aria-checked={value}
      >
        <span
          className={`toggle-slide inline-block h-5 w-5 transform rounded-full bg-white dark:bg-black shadow-lg transition-transform duration-300 ${
            value ? "translate-x-8" : "translate-x-1"
          }`}
        />
      </button>
      <span
        className={`text-sm font-semibold min-w-[120px] ${
          value
            ? "text-black dark:text-white"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {value ? "ON" : "OFF – Quick Mode"}
      </span>
    </div>
  )
}
