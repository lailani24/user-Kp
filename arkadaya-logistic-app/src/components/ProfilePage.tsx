"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, LogOut, Pencil, Check, ArrowLeft } from "lucide-react";

interface UserProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Siti Alyana",
    role: "Pelanggan",
    email: "Sitialyanaa@gmail.com",
    phone: "089363782268",
    avatarUrl: "/profile_avatar.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load profile from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("arkadaya_profile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    if (isEditing) {
      // Save changes logic
      localStorage.setItem("arkadaya_profile", JSON.stringify(profile));
      setIsEditing(false);
      alert("Profil berhasil diperbarui!");
    } else {
      setIsEditing(true);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setProfile((prev) => {
          const updated = { ...prev, avatarUrl: base64data };
          localStorage.setItem("arkadaya_profile", JSON.stringify(updated));
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePencilClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7fa] flex items-center justify-center p-0 sm:p-4 md:p-8">
      {/* Mobile Screen Mockup Container */}
      <div className="w-full max-w-[390px] min-h-screen sm:min-h-[844px] sm:max-h-[844px] bg-white sm:rounded-[36px] sm:shadow-2xl overflow-hidden flex flex-col justify-between relative border border-slate-100 sm:my-4 p-6 transition-all duration-500">
        
        {/* Top Navbar Section with Back Button */}
        <div className="flex justify-between items-center py-4 shrink-0 select-none">
          <div className="flex items-center gap-3">
            <Link href="/order" className="p-1.5 hover:bg-slate-100 rounded-full text-[#05336b] transition-all">
              <ArrowLeft size={20} strokeWidth={2.5} />
            </Link>
            <span className="text-lg font-extrabold text-[#05336b] tracking-wide">
              Profile
            </span>
          </div>

          {/* Mini logo */}
          <div className="flex items-center gap-1">
            <svg
              className="w-6 h-6 text-[#05336b]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            </svg>
            <span className="text-xs font-black text-[#05336b] tracking-tight">ARKADAYA</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col justify-start py-4 overflow-y-auto no-scrollbar">
          {/* Avatar Section */}
          <div className="relative w-32 h-32 mx-auto mb-5 select-none">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#05336b]/10 bg-slate-100 shadow-md">
              <img
                src={profile.avatarUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Pencil button */}
            <button
              onClick={handlePencilClick}
              className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#75b2ce] border border-[#05336b] text-slate-800 flex items-center justify-center shadow-md hover:bg-[#64a1bd] active:scale-[0.9] transition-all cursor-pointer"
            >
              <Pencil size={16} strokeWidth={2.2} />
            </button>
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* User Name & Role */}
          <div className="text-center px-4 mb-8">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="w-full max-w-[240px] text-center text-xl font-bold text-slate-900 border-b-2 border-[#05336b] bg-transparent outline-none py-1 focus:border-blue-500 transition-colors"
                placeholder="Nama Lengkap"
              />
            ) : (
              <h2 className="text-[25px] font-black text-slate-900 leading-tight">
                {profile.name}
              </h2>
            )}
            <p className="text-sm font-semibold text-slate-500 mt-1.5 tracking-wider select-none">
              {profile.role}
            </p>
          </div>

          {/* Profile Fields Stack */}
          <div className="space-y-5 px-1 select-none">
            {/* Email Field */}
            <div className="flex items-center gap-4 bg-[#e3f0ff] border border-blue-900 rounded-full py-3.5 px-6 shadow-md shadow-blue-100/40 transition-all duration-300">
              <Mail size={22} className="text-[#05336b] shrink-0" strokeWidth={2.2} />
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-[#05336b] placeholder-[#05336b]/40 outline-none font-bold text-sm"
                  placeholder="Email Address"
                />
              ) : (
                <span className="text-[#05336b] font-bold text-sm truncate">
                  {profile.email}
                </span>
              )}
            </div>

            {/* Phone Field */}
            <div className="flex items-center gap-4 bg-[#e3f0ff] border border-blue-900 rounded-full py-3.5 px-6 shadow-md shadow-blue-100/40 transition-all duration-300">
              <Phone size={22} className="text-[#05336b] shrink-0" strokeWidth={2.2} />
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-[#05336b] placeholder-[#05336b]/40 outline-none font-bold text-sm"
                  placeholder="Nomor Telepon"
                />
              ) : (
                <span className="text-[#05336b] font-bold text-sm">
                  {profile.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Button Area */}
        <div className="space-y-4 pt-6 pb-2 shrink-0">
          {/* Edit / Save Button */}
          <button
            onClick={handleEditClick}
            className={`w-full h-14 rounded-full border text-base font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-300 shadow-md cursor-pointer ${
              isEditing
                ? "bg-emerald-600 border-emerald-800 text-white hover:bg-emerald-700 shadow-emerald-100"
                : "bg-[#f7dfb5] border-amber-900 text-slate-900 hover:bg-[#eccba2] shadow-amber-100"
            }`}
          >
            {isEditing ? (
              <>
                <Check size={18} strokeWidth={2.5} />
                Save Changes
              </>
            ) : (
              "Edit"
            )}
          </button>

          {/* Logout Button */}
          <Link href="/login" className="block w-full">
            <button className="w-full h-14 rounded-full bg-[#ee3124] border border-red-950 text-white font-bold text-base hover:bg-[#d92317] active:scale-[0.98] transition-all duration-300 shadow-md shadow-red-100 flex items-center justify-center gap-2 cursor-pointer">
              <LogOut size={18} strokeWidth={2.5} />
              Keluar
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
