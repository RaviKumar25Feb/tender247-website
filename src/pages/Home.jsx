import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Building,
  Briefcase,
  Award,
  Bell,
  ShieldCheck,
  Headphones,
} from "lucide-react";

export default function Home() {
  // Mock Data for Categories
  const categories = [
    {
      icon: <Building className="w-6 h-6" />,
      name: "State Tenders",
      count: "45,230+",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      name: "Central Govt Tenders",
      count: "12,840+",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      name: "Global Tenders",
      count: "8,150+",
    },
    {
      icon: <Award className="w-6 h-6" />,
      name: "Corporate Tenders",
      count: "19,400+",
    },
  ];

  // Mock Data for Latest Tenders
  const latestTenders = [
    {
      id: "T247-9081",
      title: "Construction of Multi-Storey Residential Building",
      authority: "Public Works Department (PWD)",
      value: "₹45.2 Crores",
      location: "Mumbai, Maharashtra",
      deadline: "Expiring in 5 days",
    },
    {
      id: "T247-7742",
      title: "Supply and Installation of Smart Solar Street Lights",
      authority: "Municipal Corporation",
      value: "₹2.8 Crores",
      location: "Bengaluru, Karnataka",
      deadline: "Expiring in 8 days",
    },
    {
      id: "T247-3310",
      title: "Setup of Enterprise IT Infrastructure & Cloud Services",
      authority: "State Bank of India (SBI)",
      value: "Estimation on Request",
      location: "Grid/Remote",
      deadline: "Expiring in 12 days",
    },
  ];

  return (
    <div className="space-y-16">
      {/* 1. HERO SECTION WITH SEARCH ENGINE */}
      <header className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl py-16 px-4 sm:px-8 lg:px-12 overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="bg-blue-500/10 text-blue-400 text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border border-blue-500/20">
            India's #1 Tender Aggregator Platform
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-6 mb-4 leading-tight">
            Find the Right{" "}
            <span className="text-blue-400">Tender Opportunity</span>, Everyday.
          </h1>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-10">
            Access over 5 Million+ e-Tenders, Government procurement notices,
            and business leads globally.
          </p>

          {/* Smart Search Bar */}
          <div className="bg-white p-2 rounded-xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2 text-slate-800">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-200">
              <Search className="text-slate-400 shrink-0 w-5 h-5" />
              <input
                type="text"
                placeholder="Keywords (e.g., Construction, IT, Electrical...)"
                className="w-full focus:outline-none text-sm placeholder-slate-400 font-medium text-slate-700"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 px-3 py-2">
              <MapPin className="text-slate-400 shrink-0 w-5 h-5" />
              <input
                type="text"
                placeholder="State or Region (e.g., Delhi, Global...)"
                className="w-full focus:outline-none text-sm placeholder-slate-400 font-medium text-slate-700"
              />
            </div>
            <Link
              to="/tenders-page"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md whitespace-nowrap text-sm"
            >
              Search Tenders
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-12 pt-8 border-t border-slate-700/50">
            <div>
              <div className="text-2xl font-bold text-blue-400">500,000+</div>
              <div className="text-slate-400 text-xs mt-1">Live Tenders</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">250+</div>
              <div className="text-slate-400 text-xs mt-1">
                Industries Covered
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">15,000+</div>
              <div className="text-slate-400 text-xs mt-1">
                Authorities Monitored
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">99.8%</div>
              <div className="text-slate-400 text-xs mt-1">Data Accuracy</div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. EXPLORE BY CATEGORIES */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Browse Tenders Your Way
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Filter and look up opportunities mapped explicitly by geo-location
            and authority sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl border border-slate-200/80 hover:border-blue-500 transition group hover:shadow-md cursor-pointer flex items-start gap-4"
            >
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                {category.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition text-sm sm:text-base">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {category.count} Active Notices
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LATEST TENDERS LIST */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Latest Dynamic Tenders
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Freshly curated procurement items uploaded in the past few hours.
            </p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-xs bg-slate-50 hover:bg-slate-100 px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm transition whitespace-nowrap">
            View All Tenders →
          </button>
        </div>

        <div className="space-y-4">
          {latestTenders.map((tender) => (
            <div
              key={tender.id}
              className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 hover:border-slate-300 transition flex flex-col md:flex-row justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-white text-slate-700 text-[11px] font-mono font-bold px-2.5 py-1 rounded border border-slate-200">
                    {tender.id}
                  </span>
                  <span className="text-[11px] text-rose-600 bg-rose-50 font-semibold px-2 py-0.5 rounded flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></span>
                    {tender.deadline}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition">
                  {tender.title}
                </h3>
                <div className="text-xs text-slate-500 flex flex-wrap gap-x-6 gap-y-1">
                  <span>
                    🏢 Authority:{" "}
                    <strong className="text-slate-700">
                      {tender.authority}
                    </strong>
                  </span>
                  <span>
                    📍 Location:{" "}
                    <strong className="text-slate-700">
                      {tender.location}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="flex md:flex-col justify-between items-end shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-200/60">
                <div className="text-left md:text-right mb-2">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
                    Tender Value
                  </span>
                  <span className="text-lg font-extrabold text-slate-900">
                    {tender.value}
                  </span>
                </div>
                <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VALUE ADDED SERVICES */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            End-to-End Bidding Ecosystem
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            We don't just track alerts. We guide your business smoothly from
            registration right down to victory allocation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-5 group-hover:bg-indigo-600 group-hover:text-white transition">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Daily Tender Alerts
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Get personalized emails and WhatsApp notifications tailored
              precisely to your production capabilities and targeted regions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              GeM Registration & Management
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Completely bypass vendor friction. Let our desk experts deal with
              catalog creation, OEM panels, and brand compliance parameters.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-5 group-hover:bg-emerald-600 group-hover:text-white transition">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Bid Documentation Support
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Minimize structural rejection risks. Our legal review desk
              inspects technical, financial, and operational credentials
              accurately.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
