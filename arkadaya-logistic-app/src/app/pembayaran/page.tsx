"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, User, PlusCircle } from "lucide-react";

export default function PembayaranPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<"kredit" | "debit">("kredit");
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardHolder, setNewCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  
  // Use state to manage card number
  const [cardNumber, setCardNumber] = useState("3632824682646492");

  const handlePayNow = () => {
    // Show success alert
    alert("Pembayaran Berhasil!");
    
    // Update local storage to set the unpaid order as paid
    const saved = localStorage.getItem("arkadaya_orders");
    if (saved) {
      try {
        const orders = JSON.parse(saved);
        const updated = orders.map((o: any) => 
          o.receiptNumber === "AHP2474392BG" ? { ...o, isPaid: true } : o
        );
        localStorage.setItem("arkadaya_orders", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
    
    // Redirect to order page
    router.push("/order");
  };

  const handleAddNewCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardNumber.trim()) return;
    setCardNumber(newCardNumber);
    setIsAddCardOpen(false);
    setNewCardNumber("");
    setNewCardHolder("");
    setExpiryDate("");
    setCvv("");
    alert("Kartu Baru Berhasil Ditambahkan!");
  };

  return (
    <main className="min-h-screen bg-[#f4f7fa] flex items-center justify-center p-0 sm:p-4 md:p-8">
      {/* Mobile Screen Mockup Container */}
      <div className="w-full max-w-[390px] min-h-screen sm:min-h-[844px] sm:max-h-[844px] bg-white sm:rounded-[36px] sm:shadow-2xl overflow-hidden flex flex-col justify-between relative border border-slate-100 sm:my-4 p-6 transition-all duration-500">
        
        {/* Top Navbar Section */}
        <div className="flex justify-between items-center py-4 shrink-0 select-none">
          {/* Company Logo */}
          <div className="flex items-center gap-1.5">
            <svg
              className="w-8 h-8 text-[#05336b]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-black text-[#05336b] tracking-tight">
                ARKADAYA
              </span>
              <span className="text-[7.5px] font-bold text-[#f07f1b] tracking-wider -mt-0.5">
                EXPRESS LOGISTICS
              </span>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4 text-[#05336b]">
            <Link href="/notification" className="p-1 hover:bg-slate-50 rounded-full transition-colors relative block">
              <Bell size={24} className="fill-[#05336b]/10" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </Link>
            <Link href="/profile" className="p-1 hover:bg-slate-50 rounded-full transition-colors block">
              <div className="w-8 h-8 rounded-full bg-[#05336b]/10 flex items-center justify-center text-[#05336b]">
                <User size={20} className="fill-[#05336b]" />
              </div>
            </Link>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 flex flex-col justify-start overflow-y-auto no-scrollbar py-2">
          
          {/* Subpage Title */}
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-xl font-bold text-black tracking-tight">Pembayaran</h2>
            <div className="w-40 h-[1.5px] bg-[#05336b]/30 mt-1" />
          </div>

          {/* Order Summary Card */}
          <div className="bg-[#e8f1fa] rounded-2xl p-4 shadow-sm border border-blue-50/50 mb-5">
            <h3 className="text-base font-bold text-[#05336b] mb-1.5">
              Ringkasan Pemesanan
            </h3>
            <div className="w-full h-[1px] bg-[#05336b]/15 mb-2.5" />
            <div className="space-y-2">
              <div className="font-semibold text-[#05336b] text-[14px]">
                Order : AHP2474392BG
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-1 font-medium">
                Alamat : Jl. Sukajadi No. 45, RT 02/RW 05 Kel. Sukabungah, Kec. Sukajadi Kota Bandung, Jawa Baratok 5
              </p>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="mb-4">
            <h3 className="font-bold text-[#05336b] text-[15px] mt-2 mb-3">
              Pilih Metode Pembayaran
            </h3>
            
            <div className="space-y-3">
              {/* Kredit Option */}
              <div
                onClick={() => setSelectedMethod("kredit")}
                className={`bg-[#e8f1fa] rounded-full p-2.5 flex justify-between items-center px-5 border cursor-pointer transition-all duration-200 select-none ${
                  selectedMethod === "kredit" ? "border-blue-500 shadow-sm" : "border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Credit Card Mini Icon */}
                  <div className="w-10 h-7 rounded bg-[#0074e4] flex flex-col justify-between py-1 px-1.5 shadow-sm relative overflow-hidden shrink-0">
                    <div className="w-full h-1 bg-black/80 mt-1" />
                    <div className="flex justify-between items-center mt-1">
                      <div className="w-3.5 h-2 bg-white/80 rounded-[1px]" />
                      <div className="flex gap-[1px]">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <div className="w-2 h-2 bg-amber-400 rounded-full -ml-1" />
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-[#05336b] text-sm">
                    Kartu Kredit
                  </span>
                </div>
                
                {/* Radio Button */}
                <div className="w-6 h-6 rounded-full border-2 border-[#05336b] bg-white flex items-center justify-center shrink-0">
                  {selectedMethod === "kredit" && (
                    <div className="w-3 h-3 rounded-full bg-[#05336b]" />
                  )}
                </div>
              </div>

              {/* Debit Option */}
              <div
                onClick={() => setSelectedMethod("debit")}
                className={`bg-[#e8f1fa] rounded-full p-2.5 flex justify-between items-center px-5 border cursor-pointer transition-all duration-200 select-none ${
                  selectedMethod === "debit" ? "border-blue-500 shadow-sm" : "border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Debit Card Mini Icon */}
                  <div className="w-10 h-7 rounded bg-[#fca229] flex flex-col justify-between py-1 px-1.5 shadow-sm relative overflow-hidden shrink-0">
                    <div className="w-full h-1 bg-black/80 mt-1" />
                    <div className="flex justify-between items-center mt-1">
                      <div className="w-3.5 h-2 bg-white/80 rounded-[1px]" />
                      <div className="flex gap-[1px]">
                        <div className="w-2 h-2 bg-white/50 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-[#05336b] text-sm">
                    Kartu Debit
                  </span>
                </div>
                
                {/* Radio Button */}
                <div className="w-6 h-6 rounded-full border-2 border-[#05336b] bg-white flex items-center justify-center shrink-0">
                  {selectedMethod === "debit" && (
                    <div className="w-3 h-3 rounded-full bg-[#05336b]" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card Selector / Details Wrapper */}
          <div className="bg-[#e8f1fa] rounded-[28px] p-4.5 border border-slate-200/50 shadow-sm mt-4">
            <span className="text-xs font-bold text-[#05336b] tracking-wide block mb-3 pl-1">
              Pilih Kartu
            </span>
            
            {/* Inner White Container for Selected Card */}
            <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-xs gap-3">
              {/* Left Side: Detailed Card Image */}
              <div className="w-28 h-18 rounded-lg bg-[#fca229] border border-orange-300 flex flex-col justify-between py-1.5 relative overflow-hidden shrink-0 shadow-sm">
                {/* Black magnetic strip */}
                <div className="w-full h-3.5 bg-[#2c3e50] mt-1" />
                {/* White area with signature line */}
                <div className="mx-2 my-1.5 h-5 bg-white rounded border border-slate-200 flex items-center px-1 overflow-hidden">
                  <svg className="w-full h-3 text-slate-400" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M 5,10 C 15,3 25,17 35,10 C 45,3 55,17 65,10 C 75,3 85,17 95,10" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Right Side: Card Number Text */}
              <div className="flex-1 flex flex-col justify-center pl-1 select-none">
                <span className="text-[10px] font-bold text-slate-500 uppercase leading-none">
                  No. Kartu
                </span>
                <span className="text-sm font-black text-slate-900 mt-1 tracking-tight word-break-all break-all">
                  {cardNumber.match(/.{1,4}/g)?.join(" ") || cardNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Add Card Selector */}
          <div 
            onClick={() => setIsAddCardOpen(!isAddCardOpen)}
            className="bg-[#e8f1fa] rounded-full p-3 flex justify-between items-center px-5 border border-transparent cursor-pointer hover:bg-[#d6e4f3] active:scale-[0.99] transition-all duration-200 mt-4 select-none"
          >
            <span className="font-bold text-[#05336b] text-sm">
              Tambah Kartu
            </span>
            <div className="w-6 h-6 rounded-full border-2 border-[#05336b] bg-white flex items-center justify-center shrink-0">
              {isAddCardOpen && (
                <div className="w-3 h-3 rounded-full bg-[#05336b]" />
              )}
            </div>
          </div>

          {/* Simulated Add Card Form */}
          {isAddCardOpen && (
            <form onSubmit={handleAddNewCard} className="bg-white rounded-2xl border-2 border-[#05336b]/40 p-4 mt-4 space-y-3 shadow-md animate-slide-up">
              <h4 className="text-xs font-bold text-[#05336b] uppercase tracking-wider">Detail Kartu Baru</h4>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Nomor Kartu</label>
                <input
                  type="text"
                  required
                  placeholder="3632 8246 8264 6492"
                  value={newCardNumber}
                  onChange={(e) => setNewCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm font-semibold outline-none focus:border-[#05336b]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Nama Pemilik Kartu</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={newCardHolder}
                  onChange={(e) => setNewCardHolder(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm font-semibold outline-none focus:border-[#05336b]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">Valid Thru (MM/YY)</label>
                  <input
                    type="text"
                    required
                    placeholder="12/29"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value.slice(0, 5))}
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm font-semibold outline-none focus:border-[#05336b]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">CVV</label>
                  <input
                    type="password"
                    required
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm font-semibold outline-none focus:border-[#05336b]"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-10 rounded-full bg-[#f07f1b] text-white font-bold text-xs hover:bg-[#d66f15] active:scale-[0.98] transition-all flex items-center justify-center gap-1 shadow-sm mt-1"
              >
                <PlusCircle size={14} /> Simpan Kartu
              </button>
            </form>
          )}

        </div>

        {/* Bayar Sekarang Button */}
        <div className="pt-6 pb-2 shrink-0">
          <button
            onClick={handlePayNow}
            className="w-full h-14 rounded-full bg-[#5491cd] border border-[#05336b] text-white font-bold text-2xl hover:bg-[#4380bd] active:scale-[0.98] transition-all duration-300 shadow-md shadow-blue-100 flex items-center justify-center cursor-pointer"
          >
            Bayar Sekarang
          </button>
        </div>

      </div>
    </main>
  );
}
