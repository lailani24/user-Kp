"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fa] flex items-center justify-center p-0 sm:p-4 md:p-8">
      {/* CSS Animation Keyframes */}
      <style jsx global>{`
        @keyframes slideInTruck {
          0% {
            transform: translateX(120%) scale(0.9);
            opacity: 0;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        .animate-truck {
          animation: slideInTruck 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Mobile Screen Mockup Container */}
      <div className="w-full max-w-[390px] min-h-screen sm:min-h-[844px] sm:max-h-[844px] bg-gradient-to-b from-[#0a488a] via-[#0d59a3] to-[#4b88c3] sm:rounded-[36px] sm:shadow-2xl overflow-hidden flex flex-col justify-between relative border border-blue-900/10 sm:my-4 transition-all duration-500 p-6 pt-12 pb-10">
        
        {/* Background Ornaments */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {/* Left: Connected Network Dots */}
          <svg className="absolute -left-5 top-0 w-[240px] h-[350px] text-white/15 opacity-40" viewBox="0 0 200 300" fill="none">
            <circle cx="30" cy="20" r="3.5" fill="currentColor" />
            <circle cx="120" cy="50" r="4.5" fill="currentColor" />
            <circle cx="80" cy="140" r="4" fill="currentColor" />
            <circle cx="40" cy="220" r="5" fill="currentColor" />
            <circle cx="160" cy="280" r="3.5" fill="currentColor" />
            
            <line x1="30" y1="20" x2="120" y2="50" stroke="currentColor" strokeWidth="0.75" />
            <line x1="120" y1="50" x2="80" y2="140" stroke="currentColor" strokeWidth="0.75" />
            <line x1="30" y1="20" x2="80" y2="140" stroke="currentColor" strokeWidth="0.75" />
            <line x1="80" y1="140" x2="40" y2="220" stroke="currentColor" strokeWidth="0.75" />
            <line x1="40" y1="220" x2="160" y2="280" stroke="currentColor" strokeWidth="0.75" />
            <line x1="80" y1="140" x2="160" y2="280" stroke="currentColor" strokeWidth="0.75" />
            
            {/* Extended networks */}
            <circle cx="180" cy="110" r="3" fill="currentColor" />
            <line x1="120" y1="50" x2="180" y2="110" stroke="currentColor" strokeWidth="0.75" />
            <line x1="80" y1="140" x2="180" y2="110" stroke="currentColor" strokeWidth="0.75" />
          </svg>

          {/* Right Top: Stacked Logistics Boxes Isometric */}
          <svg className="absolute -right-2 top-2 w-[180px] h-[250px] text-white/10 opacity-30" viewBox="0 0 120 180" fill="none" stroke="currentColor" strokeWidth="0.75">
            {/* Box 1 (Top Left in Stack) */}
            <g transform="translate(60, 20)">
              <path d="M 0,-10 L 15,-2 L 0,6 L -15,-2 Z" fill="currentColor" fillOpacity="0.05" />
              <path d="M -15,-2 L -15,10 L 0,18 L 0,6 Z" />
              <path d="M 15,-2 L 15,10 L 0,18 L 0,6 Z" />
              <line x1="0" y1="-2" x2="0" y2="6" stroke="currentColor" strokeWidth="0.5" />
            </g>
            {/* Box 2 (Top Right) */}
            <g transform="translate(90, 36)">
              <path d="M 0,-10 L 15,-2 L 0,6 L -15,-2 Z" fill="currentColor" fillOpacity="0.05" />
              <path d="M -15,-2 L -15,10 L 0,18 L 0,6 Z" />
              <path d="M 15,-2 L 15,10 L 0,18 L 0,6 Z" />
              <line x1="0" y1="-2" x2="0" y2="6" stroke="currentColor" strokeWidth="0.5" />
            </g>
            {/* Box 3 (Middle Row) */}
            <g transform="translate(75, 60)">
              <path d="M 0,-10 L 15,-2 L 0,6 L -15,-2 Z" fill="currentColor" fillOpacity="0.05" />
              <path d="M -15,-2 L -15,10 L 0,18 L 0,6 Z" />
              <path d="M 15,-2 L 15,10 L 0,18 L 0,6 Z" />
              <line x1="0" y1="-2" x2="0" y2="6" stroke="currentColor" strokeWidth="0.5" />
            </g>
            {/* Box 4 (Lower Middle Row) */}
            <g transform="translate(95, 86)">
              <path d="M 0,-10 L 15,-2 L 0,6 L -15,-2 Z" fill="currentColor" fillOpacity="0.05" />
              <path d="M -15,-2 L -15,10 L 0,18 L 0,6 Z" />
              <path d="M 15,-2 L 15,10 L 0,18 L 0,6 Z" />
              <line x1="0" y1="-2" x2="0" y2="6" stroke="currentColor" strokeWidth="0.5" />
            </g>
            {/* Box 5 (Bottom) */}
            <g transform="translate(85, 120)">
              <path d="M 0,-10 L 15,-2 L 0,6 L -15,-2 Z" fill="currentColor" fillOpacity="0.05" />
              <path d="M -15,-2 L -15,10 L 0,18 L 0,6 Z" />
              <path d="M 15,-2 L 15,10 L 0,18 L 0,6 Z" />
              <line x1="0" y1="-2" x2="0" y2="6" stroke="currentColor" strokeWidth="0.5" />
            </g>
          </svg>
        </div>

        {/* Top Branding Header */}
        <div className="text-center z-10 select-none mt-10">
          <h1 className="text-white text-[44px] font-black tracking-tight leading-none filter drop-shadow-md">
            Arkadaya
          </h1>
          <h2 className="text-[#f09200] text-3xl font-extrabold tracking-wide mt-1.5 filter drop-shadow-lg">
            Express Logistics
          </h2>
        </div>

        {/* Animated Logistics Truck Image Container */}
        <div className="w-full relative flex justify-center items-center my-6 z-10 overflow-hidden h-44 select-none">
          <div className="w-[85%] h-full flex items-center justify-center animate-truck">
            <img
              src="/truk1.png"
              alt="Logistics Delivery Truck"
              className="h-full object-contain filter drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Company Description Block */}
        <div className="px-3 text-center z-10 select-none mb-6">
          <p className="text-white/85 text-[11.5px] leading-relaxed font-medium tracking-wide">
            PT. Arkadaya Hakato Persada (AHP Logistics) is a logistics company providing reliable transportation and distribution services to support Indonesia's connectivity and economic growth. Since early 2024, it has grown rapidly, serving industries such as e-commerce, automotive, agriculture, manufacturing, and infrastructure with flexible logistics solutions.
          </p>
        </div>

        {/* Get Started Interactive Button */}
        <div className="w-full flex flex-col items-center z-10 mb-6 shrink-0">
          <Link href="/register" className="group w-full max-w-[280px] flex flex-col items-center cursor-pointer active:scale-[0.98] transition-transform duration-200">
            <span className="text-white text-xs font-semibold uppercase tracking-wider mb-2 group-hover:text-amber-400 transition-colors">
              Get Started
            </span>
            <div className="w-full flex items-center justify-center relative py-2">
              {/* Custom Line with arrow at end */}
              <div className="w-[180px] h-[1.5px] bg-white group-hover:bg-amber-400 transition-colors relative flex items-center justify-end">
                <div className="absolute right-0 translate-x-[20%] text-white group-hover:text-amber-400 transition-colors">
                  <ArrowRight size={16} strokeWidth={2.5} className="-mt-[7.5px]" />
                </div>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </main>
  );
}
