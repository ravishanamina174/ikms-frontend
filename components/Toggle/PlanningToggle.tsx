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
        className={`button-click relative inline-flex h-6 w-11 items-center rounded-[0.3rem] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#5b615f] focus:ring-offset-2 ${
          value
            ? "bg-gradient-to-r from-[#393a39] to-[#2e2e2e] dark:from-[#838685] dark:to-[#808281] shadow-md"
            : "bg-gray-300 dark:bg-gray-300"
        }`}
        role="switch"
        aria-checked={value}
      >
        <span
          className={`toggle-slide inline-block h-4 w-4 transform rounded-[0.6rem] bg-white shadow-lg transition-transform duration-300 ${
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
