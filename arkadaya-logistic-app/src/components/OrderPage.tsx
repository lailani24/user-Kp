"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, Bell, User, Box, Truck, CheckCircle2, X, ArrowRight, ArrowLeft, Locate, MapPin } from "lucide-react";

interface Order {
  id: string;
  receiptNumber: string;
  recipient: string;
  address: string;
  date: string;
  status: "On Progress" | "Delivered";
  amount: string;
  isPaid: boolean;
  dueDate?: string;
  timeline: {
    time: string;
    title: string;
    icon: string;
  }[];
}

const initialOrders: Order[] = [
  {
    id: "1",
    receiptNumber: "AHP2474392BG",
    recipient: "Sugawara",
    address: "Jl. Sukajadi No. 45, RT 02/RW 05 Kel. Sukabungah, Kec. Sukajadi Kota Bandung, Jawa Baratok 5",
    date: "Selasa, 14 April 2026",
    status: "On Progress",
    amount: "Rp. 5.200.000,00",
    isPaid: false,
    dueDate: "20-04-2026",
    timeline: [
      { time: "09:30", title: "Pick Up", icon: "box" },
      { time: "11:00", title: "On Progress", icon: "truck" },
      { time: "--:--", title: "In Transit", icon: "box-empty" },
    ],
  },
  {
    id: "2",
    receiptNumber: "AHP001226085",
    recipient: "Aulia Rachmah",
    address: "Jl. Gandaria Utara No.40 Blok 5",
    date: "Selasa, 14 April 2026",
    status: "Delivered",
    amount: "Rp. 2.500.000,00",
    isPaid: true,
    timeline: [
      { time: "09:30", title: "Pick Up", icon: "box" },
      { time: "11:00", title: "On Progress", icon: "truck" },
      { time: "00:00", title: "Delivered", icon: "check" },
    ],
  },
];

const renderTimelineIcon = (iconName: string) => {
  switch (iconName) {
    case "box":
      return <Box className="w-5 h-5 text-slate-700" />;
    case "truck":
      return <Truck className="w-5 h-5 text-slate-700" />;
    case "check":
      return <CheckCircle2 className="w-5 h-5 text-slate-700" />;
    default:
      return <Box className="w-5 h-5 text-slate-400" />;
  }
};

export default function OrderPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [searchReceipt, setSearchReceipt] = useState("");
  const [searchError, setSearchError] = useState("");

  // Order tracking states
  const [showEstimateCard, setShowEstimateCard] = useState(false);
  const [showLiveMap, setShowLiveMap] = useState(false);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);

  // Sync state with localStorage
  useEffect(() => {
    const saved = localStorage.getItem("arkadaya_orders");
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.setItem("arkadaya_orders", JSON.stringify(initialOrders));
    }
  }, []);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchReceipt.trim()) return;

    // Search for order matching the receipt number (case-insensitive)
    const foundOrder = orders.find(
      (o) => o.receiptNumber.toLowerCase() === searchReceipt.trim().toLowerCase()
    );

    if (foundOrder) {
      setSearchError("");
      setIsTrackModalOpen(false);
      setSearchedOrder(foundOrder);
      setShowEstimateCard(true); // Open the estimate card pop-up
    } else {
      setSearchError("Nomor resi tidak ditemukan. Coba resi: AHP2474392BG");
    }
  };

  const handleOpenOrderDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleSeeProof = () => {
    router.push("/shipping-details");
  };

  // If Live Map Mode is active, render the fullscreen map layout inside the mobile container mockup
  if (showLiveMap) {
    return (
      <main className="min-h-screen bg-[#f4f7fa] flex items-center justify-center p-0 sm:p-4 md:p-8">
        {/* Mobile Screen Mockup Container */}
        <div className="w-full max-w-[390px] min-h-screen sm:min-h-[844px] sm:max-h-[844px] bg-white sm:rounded-[36px] sm:shadow-2xl overflow-hidden flex flex-col relative border border-slate-100 sm:my-4 transition-all duration-500">
          
          {/* Live Map Background Image */}
          <div className="absolute inset-0 w-full h-full select-none">
            <img
              src="/covent_garden_map.png"
              alt="Live Map"
              className="w-full h-full object-cover opacity-90"
            />
            
            {/* Simulated Driver Marker */}
            <div className="absolute top-[42%] left-[48%] translate-x-[-50%] translate-y-[-50%] z-20 flex flex-col items-center animate-bounce">
              <div className="w-9 h-9 rounded-full bg-[#05336b] border-2 border-white flex items-center justify-center shadow-lg text-white">
                <Truck size={16} />
              </div>
              <div className="w-3.5 h-1.5 bg-black/40 rounded-full filter blur-[1px] mt-0.5" />
            </div>

            {/* Destination Pin Marker */}
            <div className="absolute bottom-[35%] left-[44%] translate-x-[-50%] translate-y-[-50%] z-20 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center shadow-lg text-white">
                <MapPin size={18} className="fill-white" />
              </div>
              <div className="w-3 h-1.5 bg-black/40 rounded-full filter blur-[1px] mt-0.5" />
            </div>

            {/* Path Polyline Simulation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 390 844" fill="none">
              <path
                d="M 187 355 C 187 450, 172 500, 172 548"
                stroke="#05336b"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="9 7"
                className="opacity-80"
              />
            </svg>
          </div>

          {/* Top Overlays */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30 select-none">
            <button
              onClick={() => setShowLiveMap(false)}
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-800 hover:text-black cursor-pointer active:scale-95 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="absolute left-1/2 translate-x-[-50%] bg-white/95 px-5 py-2.5 rounded-full shadow-md border border-slate-100 flex items-center">
              <span className="text-[12px] font-bold text-slate-800 tracking-wide">
                Track live Location
              </span>
            </div>
            {/* Placeholder to balance layout */}
            <div className="w-11" />
          </div>

          {/* Right Floating Actions */}
          <div className="absolute right-6 top-1/2 translate-y-[-50%] z-30 flex flex-col gap-3">
            <button
              onClick={() => alert("Menyelaraskan lokasi kurir...")}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-slate-700 hover:text-black cursor-pointer active:scale-95 transition-all"
            >
              <Locate size={18} />
            </button>
          </div>

          {/* Bottom Card details */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 shadow-2xl z-30 border-t border-slate-100 flex flex-col">
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-4" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#05336b]/10 flex items-center justify-center text-[#05336b] shrink-0">
                <Truck size={24} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-black text-slate-800 leading-tight">Kurir sedang dalam perjalanan</h4>
                <p className="text-[11px] text-slate-500 font-bold mt-0.5">
                  {searchedOrder?.receiptNumber} • Sugawara
                </p>
              </div>
              <span className="text-[12px] font-extrabold text-[#f07f1b] bg-[#f07f1b]/10 px-3 py-1.5 rounded-full uppercase shrink-0">
                On Progress
              </span>
            </div>
          </div>
        </div>
      </main>
    );
  }

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

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-start overflow-y-auto no-scrollbar py-2">
          {/* Page Title */}
          <h1 className="text-[32px] font-extrabold text-[#05336b] leading-none mt-2 mb-6">
            Your Order
          </h1>

          {/* Orders List */}
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => handleOpenOrderDetails(order)}
                className="w-full bg-white rounded-[24px] border border-blue-100 shadow-md shadow-blue-50/50 p-5 cursor-pointer hover:border-blue-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden group active:scale-[0.99]"
              >
                {/* Status Indicator */}
                <div className="absolute top-5 right-5">
                  <span
                    className={`text-xs font-bold ${
                      order.status === "On Progress" ? "text-amber-500" : "text-emerald-500"
                    } ${order.isPaid ? "text-emerald-500" : "text-amber-500"}`}
                  >
                    {order.isPaid ? "Paid" : order.status}
                  </span>
                </div>

                {/* Card Title & Icon */}
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <Calendar size={16} />
                  <span className="text-[11px] font-semibold tracking-wider">
                    {order.date}
                  </span>
                </div>

                {/* Receipt Number */}
                <h3 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  No. Resi : {order.receiptNumber}
                </h3>

                {/* Recipient */}
                <div className="text-[14px] font-bold text-slate-800 mb-1.5">
                  Penerima : {order.recipient}
                </div>

                {/* Address */}
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  Alamat : {order.address}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action Button */}
        <div className="pt-6 pb-2 shrink-0">
          <button
            onClick={() => setIsTrackModalOpen(true)}
            className="w-full h-14 rounded-full bg-[#5491cd] border border-[#05336b] text-white font-bold text-xl hover:bg-[#4380bd] active:scale-[0.98] transition-all duration-300 shadow-md shadow-blue-100 flex items-center justify-center cursor-pointer gap-2"
          >
            Track Your Order
            <ArrowRight size={20} />
          </button>
        </div>

        {/* ================= MODAL: ORDER DETAILS (Frame 7 & Frame 8) ================= */}
        {selectedOrder && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center transition-all duration-300 animate-fade-in">
            {/* Modal Box */}
            <div className="w-full bg-white rounded-t-[36px] sm:rounded-[36px] max-h-[90%] overflow-y-auto no-scrollbar border-t-2 sm:border border-[#05336b] p-6 flex flex-col justify-between shadow-2xl animate-slide-up relative">
              {/* Close Button inside Modal */}
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-6 right-6 p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Status Header */}
              <div className="text-right pr-8">
                <span
                  className={`text-xs font-bold ${
                    selectedOrder.status === "On Progress" ? "text-amber-500" : "text-emerald-500"
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </div>

              {/* Details Header */}
              <div className="mt-4 mb-6">
                <h2 className="text-[22px] font-black text-[#05336b] leading-tight mb-1">
                  No. Resi : {selectedOrder.receiptNumber}
                </h2>
                <div className="text-base font-extrabold text-[#05336b] mb-2">
                  Penerima : {selectedOrder.recipient}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  Alamat : {selectedOrder.address}
                </p>
              </div>

              {/* Timeline Section */}
              <div className="mb-6 pl-4 relative">
                {/* Vertikal Line */}
                <div className="absolute left-[25px] top-4 bottom-4 w-[2px] bg-[#05336b]" />

                <div className="space-y-6">
                  {selectedOrder.timeline.map((step, index) => (
                    <div key={index} className="flex items-center gap-5 relative z-10">
                      {/* Circle Indicator */}
                      <div className="w-6 h-6 rounded-full border-[3px] border-amber-500 bg-white flex items-center justify-center shrink-0 shadow-sm" />
                      {/* Icon */}
                      <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-100 shrink-0">
                        {renderTimelineIcon(step.icon)}
                      </div>
                      {/* Time & Label */}
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-400 leading-none mb-1">
                          {step.time}
                        </span>
                        <span className="text-[13px] font-extrabold text-slate-800">
                          {step.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tagihan Summary */}
              <div className="flex justify-between items-center py-4 border-t border-b border-slate-100 mb-6">
                <span className="text-base font-black text-[#05336b]">Total Tagihan</span>
                <span className="text-base font-black text-[#05336b]">
                  {selectedOrder.amount}
                </span>
              </div>

              {/* Payment Status Label */}
              <div className="text-center mb-8">
                {selectedOrder.isPaid ? (
                  <span className="text-3xl font-black text-emerald-500 tracking-wider">
                    Paid
                  </span>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-red-500 tracking-wider mb-1">
                      Unpaid
                    </span>
                    <p className="text-[10px] text-red-400 font-bold leading-none">
                      Payment due soon. Complete your payment before {selectedOrder.dueDate}.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3.5">
                {!selectedOrder.isPaid && (
                  <button
                    onClick={() => {
                      router.push("/pembayaran");
                    }}
                    className="w-full h-13 rounded-full bg-emerald-600 border border-emerald-700 text-white font-bold text-base hover:bg-emerald-700 active:scale-[0.98] transition-all duration-300 shadow-sm flex items-center justify-center cursor-pointer"
                  >
                    Payment
                  </button>
                )}
                <button
                  onClick={handleSeeProof}
                  className="w-full h-13 rounded-full bg-white border border-amber-500 text-[#05336b] font-bold text-base hover:bg-amber-50/30 active:scale-[0.98] transition-all duration-300 shadow-sm flex items-center justify-center cursor-pointer"
                >
                  See Proff of Delivery
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODAL: TRACK YOUR ORDER (Input) ================= */}
        {isTrackModalOpen && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-6 animate-fade-in">
            {/* Modal Box */}
            <div className="w-full bg-white rounded-[28px] border-2 border-[#05336b] p-6 shadow-2xl relative animate-slide-up">
              <button
                onClick={() => {
                  setIsTrackModalOpen(false);
                  setSearchError("");
                  setSearchReceipt("");
                }}
                className="absolute top-5 right-5 p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>

              <h2 className="text-xl font-black text-[#05336b] mb-4">Lacak Pesanan</h2>

              <form onSubmit={handleTrackSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    value={searchReceipt}
                    onChange={(e) => setSearchReceipt(e.target.value)}
                    placeholder="Masukkan Nomor Resi (misal: AHP2474392BG)"
                    className="w-full h-12 px-4 rounded-full border-2 border-[#05336b] text-[#05336b] placeholder-[#05336b]/40 outline-none font-semibold text-sm focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  />
                  {searchError && (
                    <p className="text-[11px] text-red-500 font-bold mt-1.5 pl-2">
                      {searchError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-[#5491cd] border border-[#05336b] text-white font-bold text-base hover:bg-[#4380bd] active:scale-[0.98] transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                  Track
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= MODAL: ESTIMASI SAMPAI (MAP.png) ================= */}
        {showEstimateCard && (
          <div 
            className="absolute inset-0 bg-black/45 backdrop-blur-xs z-50 flex items-end justify-center transition-all duration-300 animate-fade-in"
            onClick={() => setShowEstimateCard(false)}
          >
            {/* Bottom Sheet Box */}
            <div 
              className="w-full bg-white rounded-t-[32px] p-6 flex flex-col shadow-2xl animate-slide-up relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Notch Line */}
              <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-3" />

              {/* Title & Time */}
              <div className="text-center">
                <span className="text-[11px] font-bold text-slate-400 tracking-wide uppercase">
                  Estimasi Sampai
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1 select-none">
                  08:30 PM - 09:00 PM
                </h3>
              </div>

              {/* Separator */}
              <div className="w-full h-[1px] bg-slate-200/80 my-4" />

              {/* Clickable Route Box */}
              <div 
                onClick={() => {
                  setShowEstimateCard(false);
                  setShowLiveMap(true);
                }}
                className="border border-slate-200/60 rounded-2xl p-4 hover:bg-slate-50 cursor-pointer active:scale-[0.99] transition-all duration-200 flex items-stretch gap-4"
              >
                {/* Vertical Graphic Line indicator */}
                <div className="flex flex-col items-center justify-between py-1.5 shrink-0">
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-900 shadow-sm" />
                  <div className="w-[1.5px] flex-1 border-l-2 border-dashed border-slate-400 my-1.5" />
                  <MapPin size={18} className="text-[#05336b] fill-[#05336b]" />
                </div>

                {/* Text Addresses */}
                <div className="flex-1 flex flex-col justify-between py-0.5 space-y-4">
                  <div className="text-left">
                    <span className="text-slate-500 font-bold text-[9px] uppercase tracking-wider block leading-none mb-0.5">Asal</span>
                    <p className="text-slate-700 text-xs font-semibold leading-normal truncate">
                      Jl. Cawang No.89 jakarta Timur...
                    </p>
                  </div>
                  <div className="text-left border-t border-slate-100 pt-2">
                    <span className="text-[#05336b] font-bold text-[9px] uppercase tracking-wider block leading-none mb-0.5">Tujuan</span>
                    <p className="text-slate-800 text-xs font-bold leading-normal truncate">
                      {searchedOrder?.address || "Jl. Gandaria Utara No.40 Blok 5..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
