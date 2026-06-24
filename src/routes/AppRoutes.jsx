import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import TenderDetailsPage from "../pages/TenderDetailsPage";
import Home from "../pages/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/tenders-page" element={<HomePage />} />

        <Route path="/tender/:id" element={<TenderDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
