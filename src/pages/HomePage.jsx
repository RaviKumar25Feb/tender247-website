import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TenderList from "../components/TenderList";
import FilterSidebar from "../components/FilterSidebar";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import StatsCards from "../components/StatsCards";

import { getTenders, getStats } from "../api/tenderApi";

const MAX_VALUE = 1000000000;

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [stats, setStats] = useState(null);
  const [tenders, setTenders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [filters, setFilters] = useState({
    page: 1,
    q: "",
    state: "",
    city: "",
    closingFrom: "",
    closingTo: "",
    minValue: 0,
    maxValue: MAX_VALUE,
    sortBy: "latest",
  });

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    loadTenders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const loadStats = async () => {
    setStatsLoading(true);
    try {
      const res = await getStats();
      setStats(res.data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  const loadTenders = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getTenders({
        page: filters.page,
        q: filters.q,
        state: filters.state,
        city: filters.city,
        minValue: filters.minValue,
        maxValue: filters.maxValue,
        closingFrom: filters.closingFrom,
        closingTo: filters.closingTo,
        sortBy: filters.sortBy,
      });

      setTenders(res.data || []);
      setTotalPages(res.pages || 1);
      setTotalResults(res.total ?? res.data?.length ?? 0);
    } catch (error) {
      console.error("Failed to load tenders:", error);
      setError("Couldn't load tenders right now. Check your connection and try again.");
      setTenders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (keyword) => {
    setFilters((prev) => ({ ...prev, q: keyword, page: 1 }));
  };

  return (
    <div className="space-y-6">
      {/* Page intro — sets context against the dark nav above */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Browse Tenders
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Government and PSU tenders from across India, refreshed daily.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} initialValue={filters.q} />

      <StatsCards stats={stats} loading={statsLoading} />

      <div className="grid lg:grid-cols-4 gap-6">
        <FilterSidebar filters={filters} setFilters={setFilters} />

        <div className="lg:col-span-3">
          {!loading && !error && (
            <p className="text-sm text-slate-500 mb-4">
              <span className="font-semibold text-slate-700 tabular-nums">{totalResults}</span>{" "}
              tender{totalResults === 1 ? "" : "s"} found
            </p>
          )}

          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-700 font-medium text-sm">{error}</p>
              <button
                onClick={loadTenders}
                className="mt-3 text-sm font-semibold text-red-700 underline hover:no-underline"
              >
                Try again
              </button>
            </div>
          ) : loading ? (
            <Loader variant="skeleton" rows={4} />
          ) : (
            <>
              <TenderList tenders={tenders} />

              <Pagination
                page={filters.page}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setFilters((prev) => ({ ...prev, page }));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;