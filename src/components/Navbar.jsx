import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      {/* Top utility strip */}
      <div className="bg-blue-600 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-8 flex items-center justify-center sm:justify-start">
          <span>
            Tracking live tenders across India · updated every 24 hours
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="h-9 w-9 rounded-lg bg-blue-600 text-white grid place-items-center font-bold text-base">
              T
            </span>
            <span className="text-xl font-bold text-white tracking-tight">
              Tender<span className="text-blue-500">247</span>
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
