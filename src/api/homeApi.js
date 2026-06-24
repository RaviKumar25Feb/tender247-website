import api from "./axios";

// =========================
// CATEGORIES
// GET /api/categories
// =========================
export const getCategories = async () => {
  try {
    const res = await api.get("/categories");
    return res;
  } catch (error) {
    console.error("getCategories error:", error);
    throw error;
  }
};

// =========================
// ALL TENDERS (we will slice in UI)
// GET /api/tenders
// =========================
export const getTenders = async () => {
  try {
    const res = await api.get("/tenders");
    return res;
  } catch (error) {
    console.error("getTenders error:", error);
    throw error;
  }
};
