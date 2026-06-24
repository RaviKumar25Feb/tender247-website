import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Search Tenders", href: "/" },
    { name: "Bid Assistance", href: "/assistance" },
    { name: "GeM Registration", href: "/gem" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Brand matching layout style */}
          <Link to="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-md bg-blue-600 text-white grid place-items-center font-black text-base shadow-sm">
              T
            </span>
            <span className="text-base font-bold text-slate-900 tracking-tight">
              Tender<span className="text-blue-600">247</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-semibold transition-colors pb-1 border-b-2 ${
                    isActive
                      ? "text-blue-600 border-blue-600"
                      : "text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-slate-600 hover:text-slate-900 font-semibold text-sm px-3 py-2 transition">
              Login
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shadow-sm">
              Register Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-1.5 rounded-md hover:bg-slate-100"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-2 shadow-inner">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button className="w-full text-center py-2 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-50">
              Login
            </button>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold text-sm shadow-sm hover:bg-blue-700">
              Register Free
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
