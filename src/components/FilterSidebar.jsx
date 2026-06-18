import { useEffect, useState } from "react";
import { getStates, getCities } from "../api/tenderApi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const MAX_VALUE = 1000000000; // 100 Crore

function formatAmount(value) {
  if (!value) return "₹0";

  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)} Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)} L`;
  }

  return `₹${value.toLocaleString("en-IN")}`;
}

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between mb-3 md:cursor-default md:pointer-events-none"
      >
        <label className="text-sm font-semibold text-slate-700">{title}</label>
        <svg
          className={`h-4 w-4 text-slate-400 md:hidden transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`${open ? "block" : "hidden"} md:block`}>{children}</div>
    </div>
  );
}

function FilterSidebarContent({ filters, setFilters }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [statesLoading, setStatesLoading] = useState(true);

  const [range, setRange] = useState([
    filters.minValue || 0,
    filters.maxValue || MAX_VALUE,
  ]);

  useEffect(() => {
    loadStates();
  }, []);

  useEffect(() => {
    loadCities(filters.state);
  }, [filters.state]);

  useEffect(() => {
    setRange([filters.minValue || 0, filters.maxValue || MAX_VALUE]);
  }, [filters.minValue, filters.maxValue]);

  const loadStates = async () => {
    setStatesLoading(true);
    try {
      const res = await getStates();
      setStates(res.data || []);
    } catch (error) {
      console.error("Failed to load states:", error);
    } finally {
      setStatesLoading(false);
    }
  };

  const loadCities = async (state) => {
    try {
      const res = await getCities(state);
      setCities(res.data || []);
    } catch (error) {
      console.error("Failed to load cities:", error);
    }
  };

  const activeFilterCount = [
    filters.state,
    filters.city,
    filters.closingFrom,
    filters.closingTo,
    filters.minValue > 0,
    filters.maxValue < MAX_VALUE && filters.maxValue,
  ].filter(Boolean).length;

  const resetFilters = () => {
    setRange([0, MAX_VALUE]);
    setFilters({
      page: 1,
      q: filters.q || "",
      state: "",
      city: "",
      closingFrom: "",
      closingTo: "",
      minValue: 0,
      maxValue: MAX_VALUE,
      sortBy: "latest",
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold h-5 min-w-5 px-1.5 rounded-full grid place-items-center">
              {activeFilterCount}
            </span>
          )}
        </div>

        <button
          onClick={resetFilters}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Reset all
        </button>
      </div>

      <FilterSection title="State">
        <select
          value={filters.state}
          disabled={statesLoading}
          onChange={(e) =>
            setFilters({ ...filters, state: e.target.value, city: "", page: 1 })
          }
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
        >
          <option value="">All States</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </FilterSection>

      <FilterSection title="City">
        <select
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value, page: 1 })}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </FilterSection>

      <FilterSection title="Closing Date">
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-slate-500 mb-1">From</label>
            <input
              type="date"
              value={filters.closingFrom || ""}
              onChange={(e) =>
                setFilters({ ...filters, closingFrom: e.target.value, page: 1 })
              }
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">To</label>
            <input
              type="date"
              value={filters.closingTo || ""}
              onChange={(e) =>
                setFilters({ ...filters, closingTo: e.target.value, page: 1 })
              }
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Sort By">
        <select
          value={filters.sortBy || "latest"}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value, page: 1 })}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
        >
          <option value="latest">Latest Closing Date</option>
          <option value="publish_latest">Latest Published</option>
          <option value="value_high">Value High → Low</option>
          <option value="value_low">Value Low → High</option>
        </select>
      </FilterSection>

      <FilterSection title="Tender Value">
        <div className="tender-slider px-1 pt-1">
          <Slider
            range
            min={0}
            max={MAX_VALUE}
            step={100000}
            value={range}
            onChange={(value) => {
              setRange(value);
              setFilters({ ...filters, minValue: value[0], maxValue: value[1], page: 1 });
            }}
          />
        </div>

        <div className="flex justify-between mt-4 text-sm font-semibold text-slate-700 tabular-nums">
          <span>{formatAmount(range[0])}</span>
          <span>{formatAmount(range[1])}</span>
        </div>
      </FilterSection>
    </div>
  );
}

function FilterSidebar({ filters, setFilters }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile trigger bar */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters &amp; Sort
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block bg-white border border-slate-200 rounded-xl p-5 sticky top-20 self-start shadow-sm">
        <FilterSidebarContent filters={filters} setFilters={setFilters} />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-white rounded-t-2xl p-5 pb-8 animate-[slideUp_0.2s_ease-out]">
            <div className="flex items-center justify-between mb-2">
              <span className="h-1 w-10 bg-slate-200 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
            </div>
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="Close filters"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <FilterSidebarContent filters={filters} setFilters={setFilters} />

            <button
              onClick={() => setDrawerOpen(false)}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
            >
              Show results
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FilterSidebar;