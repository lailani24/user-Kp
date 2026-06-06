"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
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
        phone: "",
        email: "",
        password: "",
      });
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="w-full px-7 pb-8">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
          <div className="p-4 bg-emerald-50 rounded-full text-emerald-500 mb-4 shadow-lg shadow-emerald-100">
            <CheckCircle2 size={48} className="animate-bounce" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Pendaftaran Berhasil!</h3>
          <p className="text-sm text-slate-500 max-w-xs">
            Akun Anda telah berhasil dibuat. Silakan cek email Anda untuk verifikasi.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 animate-slide-up">
          {/* Username Input */}
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
              className="w-full h-[62px] pl-14 pr-6 rounded-[16px] bg-[#d9e7f5] border-[1.5px] border-[#0a315c] text-[#0a315c] outline-none font-medium text-base transition-all duration-300"
            />
          </div>

          {/* Nomor Telepon Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#0a315c]">
              <Phone size={26} strokeWidth={2} />
            </div>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-[62px] pl-14 pr-6 rounded-[16px] bg-[#d9e7f5] border-[1.5px] border-[#0a315c] text-[#0a315c] outline-none font-medium text-base transition-all duration-300"
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#0a315c]">
              <Mail size={26} strokeWidth={2} />
            </div>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full h-[62px] pl-14 pr-6 rounded-[16px] bg-[#d9e7f5] border-[1.5px] border-[#0a315c] text-[#0a315c] outline-none font-medium text-base transition-all duration-300"
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
              className="w-full h-[62px] pl-14 pr-12 rounded-[16px] bg-[#d9e7f5] border-[1.5px] border-[#0a315c] text-[#0a315c] outline-none font-medium text-base transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-5 flex items-center text-[#0a315c]/70 hover:text-[#0a315c] transition-colors duration-200"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {/* Sign Up Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full h-[60px] rounded-[16px] bg-[#5091cd] border-[1.5px] border-[#0a315c] text-white font-semibold text-[20px] active:scale-[0.99] transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
