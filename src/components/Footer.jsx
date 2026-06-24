import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, ShieldCheck, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-16 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 xl:gap-12 pb-12 border-b border-slate-900">
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-md bg-blue-600 text-white grid place-items-center font-black text-base shadow-sm">
                T
              </span>
              <span className="text-base font-bold text-white tracking-tight">
                Tender<span className="text-blue-500">247</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              India's premier electronic procurement aggregator portal. We track
              millions of government, corporate, and global tenders to give your
              business an unfair advantage.
            </p>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Toll-Free: 1800-123-2477 (Mon-Sat)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>support@tender247.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Tenders by Location */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Tenders by State
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/tenders/maharashtra"
                  className="hover:text-white transition"
                >
                  Maharashtra Tenders
                </Link>
              </li>
              <li>
                <Link
                  to="/tenders/delhi"
                  className="hover:text-white transition"
                >
                  Delhi NCT Tenders
                </Link>
              </li>
              <li>
                <Link
                  to="/tenders/karnataka"
                  className="hover:text-white transition"
                >
                  Karnataka Tenders
                </Link>
              </li>
              <li>
                <Link
                  to="/tenders/global"
                  className="hover:text-white text-blue-400 font-medium transition"
                >
                  International Leads
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Premium Services */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Our Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/gem" className="hover:text-white transition">
                  GeM Portal Support
                </Link>
              </li>
              <li>
                <Link
                  to="/bid-assistance"
                  className="hover:text-white transition"
                >
                  Bid Document Review
                </Link>
              </li>
              <li>
                <Link to="/dsc" className="hover:text-white transition">
                  Digital Signature (DSC)
                </Link>
              </li>
              <li>
                <Link
                  to="/vendor-assessment"
                  className="hover:text-white transition"
                >
                  OEM Assessments
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get weekly roundups of top procurement bids delivered straight to
              your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Corporate Email"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                required
              />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition shadow-sm">
                Subscribe Alerts
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <p className="text-xs text-slate-500">
              © {currentYear} Tender247 Procurement Portal. All rights reserved.
            </p>
            <span className="hidden sm:inline text-slate-800">|</span>
            <p className="text-[11px] text-slate-500 max-w-md leading-normal">
              Disclaimer: Aggregated information is for educational purposes.
              Verify data against official authority publications.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link to="/privacy" className="hover:text-slate-300 transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-300 transition">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="hover:text-slate-300 transition">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
