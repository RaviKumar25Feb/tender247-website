import { FileText, Zap, MapPin, RefreshCw } from "lucide-react";

function StatCard({
  label,
  value,
  icon,
  borderColor,
  iconBg,
  iconColor,
  valueColor,
}) {
  return (
    <div
      className={`bg-white border-l-4 ${borderColor} border-t border-r border-b border-slate-200 rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm`}
    >
      <div
        className={`h-11 w-11 rounded-lg grid place-items-center shrink-0 ${iconBg}`}
      >
        <span className={iconColor}>{icon}</span>
      </div>
      <div>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className={`text-2xl font-bold tabular-nums mt-0.5 ${valueColor}`}>
          {value ?? "—"}
        </p>
      </div>
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm animate-pulse">
      <div className="h-11 w-11 rounded-lg bg-slate-100 shrink-0" />
      <div className="space-y-2 flex-1">
        <div className="h-3 bg-slate-100 rounded w-24" />
        <div className="h-6 bg-slate-100 rounded w-16" />
      </div>
    </div>
  );
}

function StatsCards({ stats, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: "Total Tenders",
      value: stats?.totalTenders?.toLocaleString("en-IN"),
      icon: <FileText size={20} />,
      borderColor: "border-l-blue-500",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      valueColor: "text-blue-700",
    },
    {
      label: "Active Tenders",
      value: stats?.activeTenders?.toLocaleString("en-IN"),
      icon: <Zap size={20} />,
      borderColor: "border-l-green-500",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      valueColor: "text-green-700",
    },
    {
      label: "States Covered",
      value: stats?.totalStates?.toLocaleString("en-IN"),
      icon: <MapPin size={20} />,
      borderColor: "border-l-orange-500",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      valueColor: "text-orange-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}

export default StatsCards;
