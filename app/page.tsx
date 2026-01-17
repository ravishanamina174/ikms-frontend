import ChatUI from "@/components/Chat/ChatUI"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
   
{/* Hero Section */}
<section className="relative w-full overflow-hidden py-20 md:py-28 lg:py-36 px-6 md:px-10 lg:px-16 bg-white dark:bg-black">
  
  {/* Background Atmosphere */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-white dark:bg-black" />
  </div>

  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">

      {/* LEFT — Text */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-black dark:text-white">
          IKMS – Multi Agent RAG Chat
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
          Intelligent Knowledge Management System
        </p>

        <p className="mt-6 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto lg:mx-0">
          Orchestrating retrieval, reasoning, and autonomous agents to transform
          enterprise knowledge into intelligent conversations.
        </p>
      </div>

      {/* RIGHT — Visual Intelligence Plane */}
      <div className="relative flex justify-center lg:justify-end">

        {/* Floating Frame */}
        <div className="relative w-full max-w-xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">

          {/* Image */}
          <img
            src="/hero.png"
            alt="AI knowledge flow visualization"
            className="w-full h-auto"
          />
        </div>
      </div>

    </div>
  </div>
</section>





      <section className="w-full py-8 px-6 md:px-8 lg:px-12 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <ChatUI />
        </div>
      </section>
    </main>
  )
}
