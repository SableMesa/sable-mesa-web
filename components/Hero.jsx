"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image";
import Link from "next/link";

function StatusIndicator() {
  const [time, setTime] = useState("")

  useEffect(() => {
    function updateTime() {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-[#8C8C8C]">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
      </span>
      <span className="text-white">Status: Online</span>
      {time && <span className="text-[#8C8C8C]">{time} UTC</span>}
    </div>
  )
}

function WireframeMesa() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId
    let time = 0

    function resize() {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener("resize", resize)

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.getBoundingClientRect().width
      const h = canvas.getBoundingClientRect().height

      ctx.clearRect(0, 0, w, h)

      const cx = w * 0.5
      const cy = h * 0.5
      const floatY = Math.sin(time * 0.5) * 8
      const floatX = Math.cos(time * 0.3) * 4

      const layers = 5
      const baseW = w * 0.7
      const topW = w * 0.3
      const totalH = h * 0.55

      for (let i = 0; i < layers; i++) {
        const t = i / (layers - 1)
        const layerW = baseW - (baseW - topW) * t
        const layerY = cy + totalH * 0.5 - totalH * t + floatY

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 + t * 0.12})`
        ctx.lineWidth = 1

        ctx.beginPath()
        ctx.moveTo(cx - layerW / 2 + floatX * t, layerY)
        ctx.lineTo(cx + layerW / 2 + floatX * t, layerY)
        ctx.stroke()

        if (i < layers - 1) {
          const nextT = (i + 1) / (layers - 1)
          const nextW = baseW - (baseW - topW) * nextT
          const nextY = cy + totalH * 0.5 - totalH * nextT + floatY

          ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + t * 0.08})`

          ctx.beginPath()
          ctx.moveTo(cx - layerW / 2 + floatX * t, layerY)
          ctx.lineTo(cx - nextW / 2 + floatX * nextT, nextY)
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(cx + layerW / 2 + floatX * t, layerY)
          ctx.lineTo(cx + nextW / 2 + floatX * nextT, nextY)
          ctx.stroke()
        }
      }

      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 6) * i + time * 0.02
        const len = w * 0.6
        ctx.beginPath()
        ctx.moveTo(
          cx + Math.cos(angle) * len * 0.1 + floatX,
          cy + Math.sin(angle) * len * 0.1 + floatY
        )
        ctx.lineTo(
          cx + Math.cos(angle) * len + floatX,
          cy + Math.sin(angle) * len + floatY
        )
        ctx.stroke()
      }

      for (let i = 0; i < layers; i++) {
        const t = i / (layers - 1)
        const layerW = baseW - (baseW - topW) * t
        const layerY = cy + totalH * 0.5 - totalH * t + floatY
        const nodeOpacity = 0.15 + t * 0.3

        ctx.fillStyle = `rgba(255, 255, 255, ${nodeOpacity})`

        ctx.beginPath()
        ctx.arc(cx - layerW / 2 + floatX * t, layerY, 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(cx + layerW / 2 + floatX * t, layerY, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      const pulseScale = 1 + Math.sin(time * 0.8) * 0.05
      ctx.strokeStyle = "rgba(74, 74, 74, 0.25)"
      ctx.lineWidth = 0.5

      const pBaseW = baseW * 0.5 * pulseScale
      const pTopW = topW * 0.5 * pulseScale
      const pH = totalH * 0.4 * pulseScale

      ctx.beginPath()
      ctx.moveTo(cx - pBaseW / 2 + floatX, cy + pH / 2 + floatY)
      ctx.lineTo(cx + pBaseW / 2 + floatX, cy + pH / 2 + floatY)
      ctx.lineTo(cx + pTopW / 2 + floatX, cy - pH / 2 + floatY)
      ctx.lineTo(cx - pTopW / 2 + floatX, cy - pH / 2 + floatY)
      ctx.closePath()
      ctx.stroke()

      ctx.font = "9px monospace"
      ctx.fillStyle = "rgba(74, 74, 74, 0.5)"
      ctx.fillText(
        `[${Math.round(cx + floatX)}, ${Math.round(cy + floatY)}]`,
        cx + pTopW / 2 + 8 + floatX,
        cy - pH / 2 + floatY + 4
      )
      ctx.fillText(`x: ${w.toFixed(0)}`, 12, h - 12)
      ctx.fillText(`y: ${h.toFixed(0)}`, 12, h - 26)

      time += 0.016
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
}

function ArrowRightIcon() {
  return (
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
  )
}

export default function Hero() {
  return (
    <main>
      <section className="relative min-h-screen w-full overflow-hidden bg-black">
        {/* Blueprint grid background */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="blueprint-grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  opacity="0.05"
                />
              </pattern>
              <pattern
                id="blueprint-grid-large"
                width="400"
                height="400"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  width="400"
                  height="400"
                  fill="url(#blueprint-grid)"
                />
                <path
                  d="M 400 0 L 0 0 0 400"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  opacity="0.04"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#blueprint-grid-large)"
            />
          </svg>
        </div>

        {/* Vertical spec-sheet dividers */}
        <div
          className="pointer-events-none absolute inset-0 flex justify-between px-6 lg:px-12"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-full w-px bg-white"
              style={{ opacity: i === 0 || i === 5 ? 0.08 : 0.04 }}
            />
          ))}
        </div>

        {/* Content layer */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Top bar */}
          {/* <header className="flex items-center justify-between px-6 pt-6 lg:px-12 lg:pt-10">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center border border-white">
                <div className="h-3 w-3 bg-white" />
              </div>
              <Image src="/assets/cropped_black_logo_text.png" alt="Sable Mesa" width={120} height={32} brightness={200} /> 
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-white">
                Sable Mesa
              </span>
            </div>
            <StatusIndicator />
          </header> */}

          {/* Spec labels - left edge */}
          <div
            className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block"
            aria-hidden="true"
          >
            <div className="flex -rotate-90 items-center gap-4 font-mono text-[10px] tracking-[0.4em] uppercase text-[#8C8C8C]">
              <span>Ref: SM-2026</span>
              <span className="h-px w-8 bg-[#4A4A4A]/30" />
              <span>Rev. 04</span>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-1 items-center px-6 lg:px-12">
            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 mt-auto">
              {/* Left column - Text content */}
              <div className="flex flex-col gap-8 py-20 lg:py-0">
                {/* Technical tag */}
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#8C8C8C]" />
                  <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#8C8C8C]">
                    Elevate. Innovate. Scale.
                  </span>
                </div>

                {/* Headline */}
                <h1 className="font-sans text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                  <span className="text-balance">
                    Engineering
                    <br />
                    Stability.
                  </span>
                </h1>

                {/* Sub-headline */}
                <p className="max-w-lg text-base leading-relaxed text-[#8C8C8C] lg:text-lg">
                  We build the digital infrastructure for manufacturing and D2C Brands.
                </p>

                {/* CTA and metadata row */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <Link
                    href="#contact"
                    className="group inline-flex items-center gap-3 border border-white bg-transparent px-8 py-4 font-mono text-xs tracking-[0.25em] uppercase text-white transition-colors duration-0 hover:bg-white hover:text-black"
                    style={{ borderRadius: 0 }}
                  >
                    Initiate Protocol
                    <ArrowRightIcon />
                  </Link>

                  <div className="flex items-center gap-4 font-mono text-[10px] tracking-widest uppercase text-[#8C8C8C]">
                    <span className="h-px w-4 bg-[#4A4A4A]/40" />
                    <span>Est. 2026</span>
                    <span className="text-[#4A4A4A]">{"///"}</span>
                    <span>V 1.0.0</span>
                  </div>
                </div>
              </div>

              {/* Right column - Wireframe mesa visual */}
              <div className="relative hidden h-[500px] lg:block xl:h-[600px]">
                {/* Corner brackets */}
                <div
                  className="absolute left-0 top-0 h-6 w-6 border-l border-t border-white/10"
                  aria-hidden="true"
                />
                <div
                  className="absolute right-0 top-0 h-6 w-6 border-r border-t border-white/10"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-white/10"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-white/10"
                  aria-hidden="true"
                />

                {/* Tech label */}
                <div
                  className="absolute right-0 top-0 font-mono text-[10px] tracking-[0.3em] uppercase text-[#4A4A4A]/50"
                  aria-hidden="true"
                >
                  Render.01
                  <StatusIndicator/>
                </div>
                <WireframeMesa />
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <footer className="flex items-center justify-between px-6 pb-6 lg:px-12 lg:pb-10">
            <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.3em] uppercase text-[#8C8C8C]">
              <span>Infrastructure</span>
              <span className="h-px w-4 bg-[#4A4A4A]/30" />
              <span>development</span>
              <span className="h-px w-4 bg-[#4A4A4A]/30" />
              <span>Marketing</span>
            </div>

            <div className="hidden font-mono text-[10px] tracking-[0.3em] uppercase text-[#8C8C8C] sm:block">
              Scroll to explore
            </div>
          </footer>
        </div>
      </section>
    </main>
  )
}
