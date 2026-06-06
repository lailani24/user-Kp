import React from "react";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fa] flex items-center justify-center p-0 sm:p-4 md:p-8">
      {/* Mobile Screen Mockup Container */}
      <div className="w-full max-w-[390px] min-h-screen sm:min-h-[844px] sm:max-h-[844px] bg-white sm:rounded-[36px] sm:shadow-2xl overflow-hidden flex flex-col relative border border-slate-100 sm:my-4 transition-all duration-500">
        
        {/* Top Header Section with Overlapping Circles */}
        <div className="relative w-full h-[280px] select-none shrink-0 overflow-hidden">
          {/* Background base - covers the header area */}
          <div className="absolute inset-0 bg-transparent" />
          
          {/* Left Dark Blue Circle - larger, positioned more to the left */}
          <div 
            className="absolute rounded-full z-[1]"
            style={{
              width: '380px',
              height: '380px',
              top: '-120px',
              left: '-110px',
              background: 'linear-gradient(180deg, #0a4a8a 0%, #002f6c 100%)',
            }}
          />
          
          {/* Right Bright Blue Circle - overlapping from right */}
          <div 
            className="absolute rounded-full z-[2]"
            style={{
              width: '370px',
              height: '370px',
              top: '-100px',
              right: '-100px',
              background: 'linear-gradient(135deg, #2995f5 0%, #0066d6 50%, #005bc4 100%)',
            }}
          />

          {/* Curved bottom edge overlay to create wave effect */}
          <div 
            className="absolute bottom-0 left-0 right-0 z-[3]"
            style={{
              height: '60px',
              background: 'white',
              borderTopLeftRadius: '50% 100%',
              borderTopRightRadius: '50% 100%',
            }}
          />

          {/* Header Content - Welcome text */}
          <div className="absolute z-[4] animate-fade-in" style={{ top: '70px', left: '32px' }}>
            <h1 
              className="text-white tracking-tight leading-none"
              style={{ fontSize: '52px', fontWeight: 800 }}
            >
              Welcome
            </h1>
            <h2 
              className="text-white/95 tracking-wide"
              style={{ fontSize: '22px', fontWeight: 700, marginTop: '6px' }}
            >
              Arkadaya Logistic
            </h2>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 flex flex-col pt-0 pb-4 relative z-20">
          <div className="text-center pb-8">
            <h2 className="text-[30px] font-bold text-[#0a315c] tracking-tight">
              Sign In
            </h2>
          </div>

          <LoginForm />
        </div>

        {/* Decorative Indicator for Mobile (Home bar) */}
        <div className="w-full bg-white py-2 flex justify-center shrink-0">
          <div className="w-32 h-1 bg-slate-200 rounded-full" />
        </div>
      </div>
    </main>
  );
}
