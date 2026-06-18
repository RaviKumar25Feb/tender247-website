function StatCard({ label, value, accent, icon }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex items-center gap-4">
      <div className={`h-11 w-11 rounded-lg grid place-items-center shrink-0 ${accent.bg}`}>
        <span className={accent.text}>{icon}</span>
      </div>
      <div>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">{label}</p>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
          {value}
        </h2>
      </div>
    </div>
  );
}

function StatsCards({ stats, loading }) {
  const cards = [
    {
      label: "Total Tenders",
      value: stats?.totalTenders ?? "—",
      accent: { bg: "bg-blue-50", text: "text-blue-600" },
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: "Active Tenders",
      value: stats?.activeTenders ?? "—",
      accent: { bg: "bg-green-50", text: "text-green-600" },
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: "States Covered",
      value: stats?.totalStates ?? "—",
      accent: { bg: "bg-orange-50", text: "text-orange-600" },
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-xl p-5 h-[76px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}

export default StatsCards;