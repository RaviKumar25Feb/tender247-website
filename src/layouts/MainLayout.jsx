import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-md bg-blue-600 text-white grid place-items-center font-bold text-sm">
            T
          </span>
          <span className="text-sm font-semibold text-white">
            Tender<span className="text-blue-500">247</span>
          </span>
        </div>

        <p className="text-xs text-slate-400 text-center sm:text-left">
          Tender data is aggregated for informational purposes. Always verify details against the original notice.
        </p>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Tender247
        </p>
      </div>
    </footer>
  );
}

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;