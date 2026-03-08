"use client"

import { useEffect, useRef } from "react"

function TechStackTicker() {
  const scrollRef = useRef(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const items = container.querySelectorAll("[data-ticker-item]")
    if (items.length === 0) return

    // Clone items for seamless loop
    const firstChild = container.firstElementChild
    if (firstChild) {
      const clone = container.cloneNode(true)
      container.parentElement?.appendChild(clone)
    }

    let scrollPos = 0
    let animationId
    const speed = 1.5

    function animate() {
      scrollPos += speed
      if (container.parentElement && scrollPos > container.scrollWidth / 2) {
        scrollPos = 0
      }
      container.style.transform = `translateX(-${scrollPos}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [])

  const techs = ["NEXT.JS", "WORDPRESS", "META ADS", "GOOGLE ANALYTICS", "RAZORPAY", "DIGITAL OCEAN"]
  
  const techUrls = {
    "NEXT.JS": "https://nextjs.org",
    "WORDPRESS": "https://wordpress.org",
    "META ADS": "https://www.facebook.com/business/ads",
    "GOOGLE ANALYTICS": "https://analytics.google.com",
    "RAZORPAY": "https://razorpay.com",
    "DIGITAL OCEAN": "https://www.digitalocean.com"
  }

  return (
    <div className="w-full overflow-hidden bg-black py-12 lg:py-16">
      <div className="relative flex w-max gap-8 lg:gap-12" ref={scrollRef}>
        {techs.map((tech, i) => (
          <div key={i} className="flex items-center gap-8 lg:gap-12">
            <span
              data-ticker-item
              className="whitespace-nowrap font-mono text-sm font-semibold tracking-widest text-gray-500 transition-colors duration-300 hover:text-white lg:text-bas cursor-pointer"
              tabIndex={0}
              role="link"
              onClick={() => window.open(techUrls[tech], '_blank')}
            >
              {tech}
            </span>
            {i < techs.length - 1 && (
              <span className="text-gray-600 lg:text-lg">+</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function DataCard() {
  return (
    <div className="relative mx-auto max-w-2xl">
      {/* Corner brackets */}
      <div
        className="absolute -left-4 -top-4 h-6 w-6 border-l border-t border-white/20"
        aria-hidden="true"
      />
      <div
        className="absolute -right-4 -top-4 h-6 w-6 border-r border-t border-white/20"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-4 -left-4 h-6 w-6 border-b border-l border-white/20"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-4 -right-4 h-6 w-6 border-b border-r border-white/20"
        aria-hidden="true"
      />

      {/* Card container with grid background */}
      <div className="relative overflow-hidden border border-[#333333] bg-black p-6 font-mono text-xs lg:p-8 lg:text-sm">
        {/* Grid pattern background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="border-b border-[#333333] pb-4">
            <div className="text-[#4A4A4A]">RENDER.LOG // CLIENT_01</div>
          </div>

          {/* Data rows */}
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-[#4A4A4A]">&gt;</span>
              <span className="text-[#8C8C8C]">Client:</span>
              <span className="text-white">Shreessha Naturals</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[#4A4A4A]">&gt;</span>
              <span className="text-[#8C8C8C]">Status:</span>
              <span className="text-green-400">OPTIMIZED</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[#4A4A4A]">&gt;</span>
              <span className="text-[#8C8C8C]">Metric:</span>
              <span className="font-bold text-white">+300% CASH FLOW EFFICIENCY</span>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#333333] pt-4">
            <div className="animate-pulse text-[#4A4A4A]">
              _
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OperationsSection() {
  return (
    <section className="relative w-full bg-black">
      {/* Blueprint grid background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="ops-blueprint-grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                opacity="0.03"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ops-blueprint-grid)" />
        </svg>
      </div>

      {/* Vertical dividers */}
      <div
        className="pointer-events-none absolute inset-0 flex justify-between px-6 lg:px-12"
        aria-hidden="true"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-px bg-white"
            style={{ opacity: i === 0 || i === 5 ? 0.04 : 0.02 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* The Glitch Section */}
        <div className="border-b border-[#333333] px-6 py-20 lg:px-12 lg:py-32">
          {/* Left spec label */}
          <div
            className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block"
            aria-hidden="true"
          >
            <div className="flex -rotate-90 items-center gap-4 font-mono text-[10px] tracking-[0.4em] uppercase text-[#8C8C8C]">
              <span>Problem</span>
              <span className="h-px w-8 bg-[#4A4A4A]/30" />
              <span>01</span>
            </div>
          </div>

          <div className="mx-auto max-w-4xl text-center">
            {/* Glitch headline */}
            <h2 className="mb-8 font-sans text-5xl font-black uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              <span className="inline-block animate-pulse text-balance">
                FRAGMENTATION
                <br />
                IS FATAL.
              </span>
            </h2>

            {/* Sub-text */}
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#8C8C8C] lg:text-lg">
              Most D2C brands fail because their{" "}
              <span className="font-semibold text-white">"Growth"</span> is
              disconnected from their{" "}
              <span className="font-semibold text-white">"Infrastructure"</span>
              . We build both.
            </p>

            {/* Decorative divider */}
            <div className="mx-auto mt-10 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-[#4A4A4A]/40" />
              <span className="font-mono text-xs tracking-widest text-[#4A4A4A]">
                INTEGRATED SYSTEMS
              </span>
              <span className="h-px w-12 bg-[#4A4A4A]/40" />
            </div>
          </div>

          {/* Right spec label */}
          <div
            className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block"
            aria-hidden="true"
          >
            <div className="flex rotate-90 items-center gap-4 font-mono text-[10px] tracking-[0.4em] uppercase text-[#8C8C8C]">
              <span>2026</span>
              <span className="h-px w-8 bg-[#4A4A4A]/30" />
              <span>Active</span>
            </div>
          </div>
        </div>

        {/* The Stack Section */}
        <div className="border-b border-[#333333]">
          <div className="py-4 lg:py-6">
            <TechStackTicker />
          </div>
        </div>

        {/* The Output Section */}
        <div className="border-b border-[#333333] px-6 py-20 lg:px-12 lg:py-32">
          {/* Left spec label */}
          <div
            className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block"
            aria-hidden="true"
          >
            <div className="flex -rotate-90 items-center gap-4 font-mono text-[10px] tracking-[0.4em] uppercase text-[#8C8C8C]">
              <span>Case Study</span>
              <span className="h-px w-8 bg-[#4A4A4A]/30" />
              <span>02</span>
            </div>
          </div>

          <DataCard />

          {/* Right spec label */}
          <div
            className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block"
            aria-hidden="true"
          >
            <div className="flex rotate-90 items-center gap-4 font-mono text-[10px] tracking-[0.4em] uppercase text-[#8C8C8C]">
              <span>Results</span>
              <span className="h-px w-8 bg-[#4A4A4A]/30" />
              <span>Live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
