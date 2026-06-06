"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, User, MapPin, Calendar, Bell, Camera } from "lucide-react";

export default function ShippingDetailsPage() {
  const [goodsReceipt, setGoodsReceipt] = useState<string>("/delivery_goods_receipt.png");
  const [deliveryInvoice, setDeliveryInvoice] = useState<string>("/delivery_invoice_receipt.png");

  const goodsReceiptInputRef = useRef<HTMLInputElement>(null);
  const deliveryInvoiceInputRef = useRef<HTMLInputElement>(null);

  // Load photos from localStorage on mount
  useEffect(() => {
    const savedGoods = localStorage.getItem("arkadaya_goods_receipt");
    const savedInvoice = localStorage.getItem("arkadaya_delivery_invoice");
    if (savedGoods) setGoodsReceipt(savedGoods);
    if (savedInvoice) setDeliveryInvoice(savedInvoice);
  }, []);

  const handleGoodsReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setGoodsReceipt(base64);
        localStorage.setItem("arkadaya_goods_receipt", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeliveryInvoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setDeliveryInvoice(base64);
        localStorage.setItem("arkadaya_delivery_invoice", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7fa] flex items-center justify-center p-0 sm:p-4 md:p-8">
      {/* Mobile Screen Mockup Container */}
      <div className="w-full max-w-[390px] min-h-screen sm:min-h-[844px] sm:max-h-[844px] bg-white sm:rounded-[36px] sm:shadow-2xl overflow-hidden flex flex-col justify-between relative border border-slate-100 sm:my-4 p-6 transition-all duration-500">
        
        {/* Top Navbar Section */}
        <div className="flex justify-between items-center py-4 shrink-0 select-none">
          {/* Company Logo */}
          <div className="flex items-center gap-1.5">
            {/* Delivery Truck SVG Icon */}
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

        {/* Shipping Details Content Area */}
        <div className="flex-1 flex flex-col justify-start overflow-y-auto no-scrollbar py-2">
          {/* Page Title */}
          <h1 className="text-[32px] font-extrabold text-[#05336b] leading-tight mt-2 mb-6">
            Shipping Details
          </h1>

          {/* Shipping Info List */}
          <div className="grid grid-cols-[24px_130px_8px_1fr] gap-x-2 gap-y-5 items-start text-[15px] mb-8">
            {/* Status Row */}
            <div className="text-green-600 mt-0.5">
              <CheckCircle2 size={20} className="fill-green-600 text-white" />
            </div>
            <div className="font-bold text-slate-800">Status</div>
            <div className="text-slate-800 font-bold">:</div>
            <div className="font-semibold text-green-600">Terkirim</div>

            {/* Recipient Row */}
            <div className="text-slate-800 mt-0.5">
              <User size={20} className="text-slate-700" />
            </div>
            <div className="font-bold text-slate-800">Penerima</div>
            <div className="text-slate-800 font-bold">:</div>
            <div className="font-semibold text-slate-800">Fauzan Al-fahrizi</div>

            {/* Address Row */}
            <div className="text-slate-800 mt-0.5">
              <MapPin size={20} className="text-slate-700" />
            </div>
            <div className="font-bold text-slate-800">Alamat</div>
            <div className="text-slate-800 font-bold">:</div>
            <div className="font-semibold text-slate-800 text-wrap leading-relaxed">
              Jl. Gandaria Utara No.40 Blok 5
            </div>

            {/* Delivery Date Row */}
            <div className="text-slate-800 mt-0.5">
              <Calendar size={20} className="text-slate-700" />
            </div>
            <div className="font-bold text-slate-800">Tanggal Pengiriman</div>
            <div className="text-slate-800 font-bold">:</div>
            <div className="font-semibold text-slate-800">14 April 2026</div>
          </div>

          {/* Proof of Delivery Section */}
          <div className="bg-[#d6e4f3]/70 rounded-[24px] p-5 shadow-sm">
            <h3 className="text-base font-bold text-[#05336b] mb-4">
              Bukti Pengiriman
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Photo 1: Goods Receipt */}
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  accept="image/*"
                  ref={goodsReceiptInputRef}
                  onChange={handleGoodsReceiptChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => goodsReceiptInputRef.current?.click()}
                  className="w-full aspect-square rounded-[18px] overflow-hidden border border-slate-300 bg-white relative group cursor-pointer active:scale-[0.98] transition-transform duration-200"
                >
                  <img
                    src={goodsReceipt}
                    alt="Foto Penerimaan Barang"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera size={24} className="text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 w-7 h-7 bg-[#f07f1b] rounded-full flex items-center justify-center text-white shadow-md">
                    <Camera size={14} />
                  </div>
                </button>
                <span className="text-[10px] font-bold text-slate-800 text-center mt-2 leading-tight">
                  Foto Penerimaan Barang
                </span>
              </div>

              {/* Photo 2: Delivery Invoice */}
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  accept="image/*"
                  ref={deliveryInvoiceInputRef}
                  onChange={handleDeliveryInvoiceChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => deliveryInvoiceInputRef.current?.click()}
                  className="w-full aspect-square rounded-[18px] overflow-hidden border border-slate-300 bg-white relative group cursor-pointer active:scale-[0.98] transition-transform duration-200"
                >
                  <img
                    src={deliveryInvoice}
                    alt="Surat Jalan"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera size={24} className="text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 w-7 h-7 bg-[#f07f1b] rounded-full flex items-center justify-center text-white shadow-md">
                    <Camera size={14} />
                  </div>
                </button>
                <span className="text-[10px] font-bold text-slate-800 text-center mt-2 leading-tight">
                  Surat Jalan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button Area */}
        <div className="pt-6 pb-2 shrink-0">
          <Link href="/order">
            <button className="w-full h-14 rounded-full bg-[#5491cd] border border-[#05336b] text-white font-bold text-xl hover:bg-[#4380bd] active:scale-[0.98] transition-all duration-300 shadow-md shadow-blue-100 flex items-center justify-center cursor-pointer">
              Close
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
