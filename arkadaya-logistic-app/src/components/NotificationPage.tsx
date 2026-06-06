"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Bell, ArrowLeft } from "lucide-react";

interface NotificationItem {
  id: string;
  time: string;
  title: string;
  receiptNumber: string;
  recipient: string;
  status: "picked_up" | "delivered";
  isPaid: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    time: "Today, 11:20 AM",
    title: "Your Package Has Been Picked up",
    receiptNumber: "AHP000893",
    recipient: "Sugawara",
    status: "picked_up",
    isPaid: false,
  },
  {
    id: "2",
    time: "Today, 11:20 AM",
    title: "Your Order Has Delivered",
    receiptNumber: "AHP000893",
    recipient: "Aulia Rachmah",
    status: "delivered",
    isPaid: true,
  },
];

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const handlePayNow = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isPaid: true } : notif
      )
    );
    alert("Payment Successful!");
  };

  return (
    <main className="min-h-screen bg-[#f4f7fa] flex items-center justify-center p-0 sm:p-4 md:p-8">
      {/* Mobile Screen Mockup Container */}
      <div className="w-full max-w-[390px] min-h-screen sm:min-h-[844px] sm:max-h-[844px] bg-white sm:rounded-[36px] sm:shadow-2xl overflow-hidden flex flex-col justify-between relative border border-slate-100 sm:my-4 transition-all duration-500">
        
        {/* Top Navbar Section */}
        <div className="flex justify-between items-center py-4 px-6 shrink-0 select-none bg-white border-b border-slate-50">
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

          {/* Action Profile Icon (Bell is missing since we are on notification page) */}
          <div className="flex items-center text-[#05336b]">
            <button className="p-1 hover:bg-slate-50 rounded-full transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#05336b]/10 flex items-center justify-center text-[#05336b]">
                <User size={20} className="fill-[#05336b]" />
              </div>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-start overflow-y-auto no-scrollbar py-2">
          {/* Header row with back navigation */}
          <div className="flex items-center gap-3 px-6 mt-2 mb-6">
            <Link href="/order" className="p-1.5 hover:bg-slate-100 rounded-full text-[#05336b] transition-all">
              <ArrowLeft size={20} strokeWidth={2.5} />
            </Link>
            <h1 className="text-[32px] font-extrabold text-[#05336b] leading-none">
              Notification
            </h1>
          </div>

          {/* Notification Cards List */}
          <div className="space-y-5 px-6 pb-6">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="w-full bg-white rounded-[24px] border border-blue-900 shadow-[0_8px_16px_rgba(5,51,107,0.15)] p-5 relative transition-all duration-300 hover:scale-[1.01]"
              >
                {/* Time info */}
                <div className="text-[11px] text-slate-400 font-bold mb-1">
                  {notif.time}
                </div>

                {/* Title */}
                <h3
                  className={`text-[15px] font-bold mb-1.5 leading-snug ${
                    notif.status === "picked_up" ? "text-[#f09200]" : "text-green-600"
                  }`}
                >
                  {notif.title}
                </h3>

                {/* Sub info */}
                <div className="text-xs text-slate-600 font-semibold space-y-0.5">
                  <p className="text-slate-900 font-bold">
                    No.Resi :{notif.receiptNumber}
                  </p>
                  <p className="text-slate-500 font-medium">
                    Penerima : {notif.recipient}
                  </p>
                </div>

                {/* Bottom right action/status */}
                <div className="absolute bottom-5 right-5 text-right">
                  {notif.status === "picked_up" && !notif.isPaid ? (
                    <button
                      onClick={() => handlePayNow(notif.id)}
                      className="text-red-500 text-xs font-bold hover:underline cursor-pointer transition-all"
                    >
                      Pay Now
                    </button>
                  ) : (
                    <span className="text-green-500 text-xs font-bold select-none">
                      Paid
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Indicator for Mobile (Home bar) */}
        <div className="w-full bg-white py-2 flex justify-center shrink-0">
          <div className="w-32 h-1 bg-slate-200 rounded-full" />
        </div>
      </div>
    </main>
  );
}
