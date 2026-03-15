"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Assumes Next.js. Can be replaced with standard <a> tag if used outside Next.js
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle navbar state 50px down from the top
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Work", href: "/#work" },
    { name: "Approach", href: "/#approach" },
    { name: "Contact us", href: "/#contact" },
  ];

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

  return (
    <div
      className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled ? "top-4" : "top-6 md:top-8"
      }`}
    >
      <nav
        className={`flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden shadow-sm
          ${
            isScrolled
              ? "bg-white border border-[#E5E5E5] text-black rounded-lg py-1.5 px-2.5 w-[90%] md:w-[80%] max-w-90vw shadow-md backdrop-blur-md" // Scrolled state: Light, shrunk
              : "bg-[#111111] border border-[#222222] text-white rounded-2xl py-3 px-4 w-[95%] md:w-[90%] max-w-dvw shadow-2xl" // Hero state: Dark, larger
          }
        `}
      >
        {/* Left Side: Brand & Navigation */}
        <div className="flex items-center">
          <Link
            href="/"
            className={`font-semibold text-sm tracking-wide transition-colors ${
              isScrolled ? "text-black" : "text-white"
            } ml-2`}
          >  
          {isScrolled ? <Image src="/assets/cropped_logo_text_light.png" alt="Sable Mesa" width="120" height="30"></Image> : <Image src="/assets/cropped_black_logo_text.png" alt="Sable Mesa" width="120" height="30"></Image>}
          </Link>

          {/* Nav Links */}
          <div
            className={`hidden md:flex items-center ml-8 pl-8 border-l transition-colors duration-500 h-5 ${
              isScrolled ? "border-gray-300" : "border-gray-800"
            }`}
          >
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                    isScrolled
                      ? "text-gray-600 hover:text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Button & Lock Icon */}
        <div className="flex items-center gap-2">
          {/* Main CTA Button */}
          <Link
            href="#contact"
            className={`group inline-flex items-center gap-3 border border-white bg-transparent px-6 py-3 font-mono text-xs tracking-[0.25em] uppercase text-white transition-colors duration-0 hover:bg-white hover:text-black
                ${
                    isScrolled
                      ? "invert"
                      : ""
                  }
                `}
            style={{ borderRadius: 0 }}
          >
            Initiate Protocol
            <ArrowRightIcon/>
          </Link>

          {/* Lock Button */}
          <button
            aria-label="Admin Interface"
            className={`flex items-center justify-center p-2.5 transition-colors duration-300 ${
              isScrolled
                ? "bg-[#E5E5E5] text-gray-700 hover:bg-[#D4D4D4] hover:text-black rounded-md"
                : "bg-[#222222] text-gray-400 hover:bg-[#333333] hover:text-white rounded-lg"
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
}
