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
      <span
        className={`text-xs font-medium transition-colors ${
          !value
            ? "text-black dark:text-black"
            : "text-gray-500 dark:text-gray-500"
        }`}
      >
        Fast
      </span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`button-click relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1a4d3a] focus:ring-offset-2 ${
          value
            ? "bg-gradient-to-r from-[#1a4d3a] to-[#2d5f47] dark:from-[#1a4d3a] dark:to-[#2d5f47] shadow-md"
            : "bg-gray-300 dark:bg-gray-300"
        }`}
        role="switch"
        aria-checked={value}
      >
        <span
          className={`toggle-slide inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <span
        className={`text-xs font-medium transition-colors ${
          value
            ? "text-black dark:text-black"
            : "text-gray-500 dark:text-gray-500"
        }`}
      >
        Planning
      </span>
    </div>
  )
}
