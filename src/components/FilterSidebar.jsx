import { useEffect, useState } from "react";
import { getStates, getCities } from "../api/tenderApi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  ArrowUpDown,
  IndianRupee,
  X,
} from "lucide-react";

const MAX_VALUE = 1000000000; // 100 Crore

function formatAmount(value) {
  if (!value && value !== 0) return "₹0";
  if (value >= 10_000_000) return `₹${(value / 10_000_000).toFixed(1)} Cr`;
  if (value >= 100_000) return `₹${(value / 100_000).toFixed(1)} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

// ── Collapsible filter section ─────────────────────────────────────────────
function FilterSection({ title, icon, children, defaultOpen = true, badge }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3 group"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <span className="text-blue-500">{icon}</span>
          {title}
          {badge && (
            <span className="h-4 min-w-4 px-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full grid place-items-center">
              {badge}
            </span>
          )}
        </span>
        <span className="text-slate-400 group-hover:text-slate-600 transition-colors">
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

// ── Select input styled ────────────────────────────────────────────────────
function FilterSelect({ value, onChange, disabled, children }) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={onChange}
      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </select>
  );
}

// ── Date input styled ──────────────────────────────────────────────────────
function FilterDate({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-xs text-slate-400 font-medium mb-1">
        {label}
      </label>
      <input
        type="date"
        value={value || ""}
        onChange={onChange}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
      />
    </div>
  );
}

// ── Active filter pill ─────────────────────────────────────────────────────
function ActivePill({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="hover:text-blue-900 transition-colors"
      >
        <X size={11} />
      </button>
    </span>
  );
}

// ── Main sidebar content ───────────────────────────────────────────────────
function FilterSidebarContent({ filters, setFilters }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [statesLoading, setStatesLoading] = useState(true);
  const [range, setRange] = useState([
    filters.minValue || 0,
    filters.maxValue || MAX_VALUE,
  ]);

  useEffect(() => {
    setStatesLoading(true);
    getStates()
      .then((res) => setStates(res.data || []))
      .catch(console.error)
      .finally(() => setStatesLoading(false));
  }, []);

  useEffect(() => {
    getCities(filters.state)
      .then((res) => setCities(res.data || []))
      .catch(console.error);
  }, [filters.state]);

  useEffect(() => {
    setRange([filters.minValue || 0, filters.maxValue || MAX_VALUE]);
  }, [filters.minValue, filters.maxValue]);

  // build active filter list for pills
  const activeFilters = [
    filters.state && { key: "state", label: filters.state },
    filters.city && { key: "city", label: filters.city },
    filters.closingFrom && {
      key: "closingFrom",
      label: `From ${filters.closingFrom}`,
    },
    filters.closingTo && { key: "closingTo", label: `To ${filters.closingTo}` },
    (filters.minValue > 0 ||
      (filters.maxValue && filters.maxValue < MAX_VALUE)) && {
      key: "value",
      label: `${formatAmount(filters.minValue)} – ${formatAmount(filters.maxValue)}`,
    },
  ].filter(Boolean);

  const removeFilter = (key) => {
    const reset = { ...filters, page: 1 };
    if (key === "state") {
      reset.state = "";
      reset.city = "";
    } else if (key === "city") reset.city = "";
    else if (key === "closingFrom") reset.closingFrom = "";
    else if (key === "closingTo") reset.closingTo = "";
    else if (key === "value") {
      reset.minValue = 0;
      reset.maxValue = MAX_VALUE;
      setRange([0, MAX_VALUE]);
    }
    setFilters(reset);
  };

  const resetAll = () => {
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
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-1">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-blue-500" />
          <h3 className="font-bold text-slate-900 text-sm">Filters</h3>
          {activeFilters.length > 0 && (
            <span className="h-5 min-w-5 px-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-full grid place-items-center">
              {activeFilters.length}
            </span>
          )}
        </div>
        {activeFilters.length > 0 && (
          <button
            onClick={resetAll}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <RotateCcw size={11} />
            Reset all
          </button>
        )}
      </div>

      {/* Active filter pills */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1 pb-3 border-b border-slate-100">
          {activeFilters.map((f) => (
            <ActivePill
              key={f.key}
              label={f.label}
              onRemove={() => removeFilter(f.key)}
            />
          ))}
        </div>
      )}

      {/* Sort By */}
      <FilterSection
        title="Sort By"
        icon={<ArrowUpDown size={14} />}
        defaultOpen={true}
      >
        <FilterSelect
          value={filters.sortBy || "latest"}
          onChange={(e) =>
            setFilters({ ...filters, sortBy: e.target.value, page: 1 })
          }
        >
          <option value="latest">Latest Closing Date</option>
          <option value="publish_latest">Latest Published</option>
          <option value="value_high">Value: High → Low</option>
          <option value="value_low">Value: Low → High</option>
        </FilterSelect>
      </FilterSection>

      {/* State */}
      <FilterSection
        title="State"
        icon={<MapPin size={14} />}
        badge={filters.state ? 1 : null}
      >
        <FilterSelect
          value={filters.state}
          disabled={statesLoading}
          onChange={(e) =>
            setFilters({ ...filters, state: e.target.value, city: "", page: 1 })
          }
        >
          <option value="">{statesLoading ? "Loading…" : "All States"}</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </FilterSelect>
      </FilterSection>

      {/* City */}
      <FilterSection
        title="City"
        icon={<MapPin size={14} />}
        badge={filters.city ? 1 : null}
        defaultOpen={!!filters.state}
      >
        <FilterSelect
          value={filters.city}
          onChange={(e) =>
            setFilters({ ...filters, city: e.target.value, page: 1 })
          }
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </FilterSelect>
      </FilterSection>

      {/* Closing Date */}
      <FilterSection
        title="Closing Date"
        icon={<Calendar size={14} />}
        badge={filters.closingFrom || filters.closingTo ? "•" : null}
      >
        <div className="space-y-2.5">
          <FilterDate
            label="From"
            value={filters.closingFrom}
            onChange={(e) =>
              setFilters({ ...filters, closingFrom: e.target.value, page: 1 })
            }
          />
          <FilterDate
            label="To"
            value={filters.closingTo}
            onChange={(e) =>
              setFilters({ ...filters, closingTo: e.target.value, page: 1 })
            }
          />
        </div>
      </FilterSection>

      {/* Tender Value */}
      <FilterSection
        title="Tender Value"
        icon={<IndianRupee size={14} />}
        badge={
          filters.minValue > 0 ||
          (filters.maxValue && filters.maxValue < MAX_VALUE)
            ? "•"
            : null
        }
      >
        {/* Range display */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-md tabular-nums">
            {formatAmount(range[0])}
          </span>
          <span className="text-xs text-slate-400 mx-1">to</span>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-md tabular-nums">
            {formatAmount(range[1])}
          </span>
        </div>

        {/* Slider — rc-slider with blue track override via inline style wrapper */}
        <div className="px-1">
          <Slider
            range
            min={0}
            max={MAX_VALUE}
            step={100_000}
            value={range}
            onChange={(value) => {
              setRange(value);
              setFilters({
                ...filters,
                minValue: value[0],
                maxValue: value[1],
                page: 1,
              });
            }}
            styles={{
              track: { backgroundColor: "#2563eb" },
              handle: {
                borderColor: "#2563eb",
                backgroundColor: "#fff",
                opacity: 1,
              },
              rail: { backgroundColor: "#e2e8f0" },
            }}
          />
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {[
            { label: "< 1L", min: 0, max: 100_000 },
            { label: "1–10L", min: 100_000, max: 1_000_000 },
            { label: "10L–1Cr", min: 1_000_000, max: 10_000_000 },
            { label: "> 1Cr", min: 10_000_000, max: MAX_VALUE },
          ].map((p) => {
            const active = range[0] === p.min && range[1] === p.max;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setRange([p.min, p.max]);
                  setFilters({
                    ...filters,
                    minValue: p.min,
                    maxValue: p.max,
                    page: 1,
                  });
                }}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  active
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </FilterSection>
    </div>
  );
}

// ── Wrapper with mobile drawer ─────────────────────────────────────────────
function FilterSidebar({ filters, setFilters }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeCount = [
    filters.state,
    filters.city,
    filters.closingFrom,
    filters.closingTo,
    filters.minValue > 0,
    filters.maxValue && filters.maxValue < MAX_VALUE,
  ].filter(Boolean).length;

  return (
    <>
      {/* ── Mobile trigger ── */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:border-blue-300 transition-colors"
        >
          <SlidersHorizontal size={15} className="text-blue-500" />
          Filters &amp; Sort
          {activeCount > 0 && (
            <span className="h-5 min-w-5 px-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-full grid place-items-center">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:block bg-white border border-slate-200 rounded-xl p-4 sticky top-20 self-start shadow-sm">
        {/* Blue header strip */}
        <div className="bg-blue-600 -mx-4 -mt-4 px-4 py-2.5 rounded-t-xl mb-4">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Filter Results
          </span>
        </div>
        <FilterSidebarContent filters={filters} setFilters={setFilters} />
      </aside>

      {/* ── Mobile drawer ── */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Sheet */}
          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] flex flex-col bg-white rounded-t-2xl shadow-xl">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="h-1 w-10 bg-slate-200 rounded-full" />
            </div>

            {/* Sheet header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={15} className="text-blue-500" />
                <span className="font-bold text-slate-900 text-sm">
                  Filter Results
                </span>
                {activeCount > 0 && (
                  <span className="h-5 min-w-5 px-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-full grid place-items-center">
                    {activeCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-5 py-2">
              <FilterSidebarContent filters={filters} setFilters={setFilters} />
            </div>

            {/* CTA */}
            <div className="px-5 py-4 border-t border-slate-100 shrink-0">
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FilterSidebar;
