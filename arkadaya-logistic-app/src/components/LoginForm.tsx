"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        username: "",
        password: "",
      });
      router.push("/order");
    }, 2000);
  };

  return (
    <div className="w-full px-7 flex flex-col justify-between flex-1 pb-8">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in my-auto">
          <div className="p-4 bg-emerald-50 rounded-full text-emerald-500 mb-4 shadow-lg shadow-emerald-100">
            <CheckCircle2 size={48} className="animate-bounce" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Login Berhasil!</h3>
          <p className="text-sm text-slate-500 max-w-xs">
            Selamat datang kembali di Arkadaya Logistic.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up flex-1 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Username/Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#0a315c]">
                <User size={26} strokeWidth={2} />
              </div>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full h-[62px] pl-14 pr-6 rounded-[16px] bg-[#d9e7f5] border-[1.5px] border-[#0a315c] text-[#0a315c] placeholder-[#0a315c]/50 outline-none font-medium text-base transition-all duration-300"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#0a315c]">
                <Lock size={26} strokeWidth={2} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full h-[62px] pl-14 pr-12 rounded-[16px] bg-[#d9e7f5] border-[1.5px] border-[#0a315c] text-[#0a315c] placeholder-[#0a315c]/50 outline-none font-medium text-base transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-[#0a315c]/70 hover:text-[#0a315c] transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            {/* Forgot Password Text */}
            <div className="text-center pt-1">
              <Link
                href="#"
                className="text-[11px] text-[#7a8c9e] hover:text-[#0a315c] font-normal transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="space-y-6 pt-6">
            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full h-[60px] rounded-[16px] bg-[#5091cd] border-[1.5px] border-[#0a315c] text-white font-semibold text-[20px] active:scale-[0.99] transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              Sign In
            </button>

            {/* Footer Text */}
            <div className="text-center text-[12px] text-[#7a8c9e] font-normal">
              {"Haven't any account? "}
              <Link href="/register" className="hover:underline hover:text-[#0a315c] transition-colors">
                Create an account
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
