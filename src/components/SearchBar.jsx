import { useState, useEffect } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";

function SearchBar({ onSearch, initialValue = "" }) {
  const [keyword, setKeyword] = useState(initialValue);

  useEffect(() => {
    setKeyword(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword.trim());
  };

  const handleClear = () => {
    setKeyword("");
    onSearch("");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Top label bar — Tender247 style eyebrow */}
      <div className="bg-blue-600 px-4 py-2 flex items-center gap-2">
        <SlidersHorizontal size={13} className="text-blue-200" />
        <span className="text-xs font-semibold text-blue-100 uppercase tracking-wider">
          Search Tenders
        </span>
      </div>

      <form onSubmit={handleSubmit} className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-2.5">
          {/* Input */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by title, department, keyword…"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full border border-slate-200 rounded-lg pl-10 pr-9 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white"
            />
            {keyword && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shrink-0 text-sm"
          >
            <Search size={15} />
            Search
          </button>
        </div>

        {/* Quick keyword chips */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {[
            "Road Construction",
            "Civil Works",
            "Electrical",
            "IT Services",
            "Medical Equipment",
          ].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => {
                setKeyword(chip);
                onSearch(chip);
              }}
              className="text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 px-2.5 py-1 rounded-full transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
