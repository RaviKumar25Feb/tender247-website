function TenderInfoCard({ label, value, accent = false, icon }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      {icon && (
        <span className="h-8 w-8 rounded-md bg-slate-50 grid place-items-center text-slate-400 shrink-0 mt-0.5">
          {icon}
        </span>
      )}
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className={`font-medium break-words ${accent ? "text-green-600" : "text-slate-800"}`}>
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

export default TenderInfoCard;