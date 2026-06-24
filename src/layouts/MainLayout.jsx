import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
