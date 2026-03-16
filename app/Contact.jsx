"use client"

import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("IDLE")

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus("PROCESSING")
    // Simulate network request
    setTimeout(() => {
      setStatus("TRANSMITTED")
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setStatus("IDLE"), 3000)
    }, 1500)
  }

  return (
    <section id="contact" className="relative w-full bg-black py-20 lg:py-32">
      {/* Blueprint grid background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="contact-blueprint-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                opacity="0.03"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-blueprint-grid)" />
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

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#8C8C8C]" />
            <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#8C8C8C]">
              Secure Channel
            </span>
            <span className="h-px w-8 bg-[#8C8C8C]" />
          </div>
          <h2 className="font-sans text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
            Initiate Protocol
          </h2>
        </div>

        {/* Form Container */}
        <div className="relative border border-[#333333] bg-black/50 p-6 backdrop-blur-sm sm:p-10">
          {/* Corner brackets */}
          <div className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-white/20" />
          <div className="absolute -right-2 -top-2 h-4 w-4 border-r border-t border-white/20" />
          <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-white/20" />
          <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-white/20" />

          {/* Left spec label */}
          <div
            className="pointer-events-none absolute -left-12 top-1/2 hidden -translate-y-1/2 lg:block"
            aria-hidden="true"
          >
            <div className="flex -rotate-90 items-center justify-center gap-4 font-mono text-[10px] tracking-[0.4em] uppercase text-[#8C8C8C]">
              <span>Form Data</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-xs tracking-widest text-[#8C8C8C] uppercase">
                &gt; Identifier [Name]
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border border-[#333333] bg-transparent px-4 py-3 font-mono text-sm text-white transition-colors focus:border-white focus:outline-none"
                placeholder="ENTER_NAME..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-xs tracking-widest text-[#8C8C8C] uppercase">
                &gt; Comm_Link [Email]
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border border-[#333333] bg-transparent px-4 py-3 font-mono text-sm text-white transition-colors focus:border-white focus:outline-none"
                placeholder="ENTER_EMAIL..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-mono text-xs tracking-widest text-[#8C8C8C] uppercase">
                &gt; Payload [Message]
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="resize-none border border-[#333333] bg-transparent px-4 py-3 font-mono text-sm text-white transition-colors focus:border-white focus:outline-none"
                placeholder="ENTER_MESSAGE..."
              />
            </div>

            <div className="mt-4 flex flex-col items-center justify-between gap-6 border-t border-[#333333] pt-6 sm:flex-row sm:gap-0">
              <div className="flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-[#8C8C8C]">
                <span className="relative flex h-2 w-2">
                  <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                    status === "IDLE" ? "bg-gray-500" : status === "PROCESSING" ? "bg-yellow-500" : "bg-green-500"
                  }`} />
                  <span className={`relative inline-flex h-2 w-2 rounded-full ${
                    status === "IDLE" ? "bg-gray-400" : status === "PROCESSING" ? "bg-yellow-400" : "bg-green-400"
                  }`} />
                </span>
                <span>Status: {status}</span>
              </div>

              <button
                type="submit"
                disabled={status === "PROCESSING" || status === "TRANSMITTED"}
                className="group relative inline-flex items-center gap-3 border border-white bg-black px-8 py-3 font-mono text-xs tracking-[0.25em] uppercase text-white transition-all hover:bg-white hover:text-black disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black"
                style={{ borderRadius: 0 }}
              >
                Transmit
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
