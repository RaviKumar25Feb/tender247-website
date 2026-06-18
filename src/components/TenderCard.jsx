import { Link } from "react-router-dom";
import { formatAmount } from "../utils/formatAmount";
import { formatDate } from "../utils/formatDate";
import { getUrgencyStatus } from "../utils/getUrgencyStatus";

const railTone = {
  critical: "bg-orange-500",
  warning: "bg-orange-300",
  normal: "bg-blue-500",
  closed: "bg-slate-300",
  neutral: "bg-slate-200",
};

const pillTone = {
  critical: "bg-orange-100 text-orange-700",
  warning: "bg-orange-50 text-orange-600",
  normal: "bg-blue-50 text-blue-700",
  closed: "bg-slate-100 text-slate-500",
  neutral: "bg-slate-100 text-slate-500",
};

const statusBadge = {
  ACTIVE: "bg-green-100 text-green-700",
  CLOSED: "bg-slate-100 text-slate-600",
  CANCELLED: "bg-red-100 text-red-700",
  AWARDED: "bg-blue-100 text-blue-700",
};

function TenderCard({ tender }) {
  const urgency = getUrgencyStatus(tender.submissionDate || tender.closingDate);

  return (
    <Link to={`/tender/${tender._id}`} className="block group">
      <div className="relative bg-white border border-slate-200 rounded-xl pl-5 pr-5 py-5 sm:pl-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden">
        {/* Urgency rail */}
        <span
          className={`absolute left-0 top-0 h-full w-1.5 ${railTone[urgency.tone]}`}
          aria-hidden="true"
        />

        {/* Header */}
        <div className="flex justify-between items-start gap-3 sm:gap-4">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-700 transition-colors">
              {tender.title}
            </h2>

            <p className="text-sm text-slate-500 mt-1 line-clamp-1">
              {tender.organization || tender.department || "Department not specified"}
            </p>
          </div>

          <span
            className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
              statusBadge[tender.status] || "bg-slate-100 text-slate-600"
            }`}
          >
            {tender.status || "UNKNOWN"}
          </span>
        </div>

        {/* Tender ID + urgency pill */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-xs text-slate-500">
            Tender ID:{" "}
            <span className="font-medium text-slate-700">
              {tender.sourceTenderId || "N/A"}
            </span>
          </span>

          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${pillTone[urgency.tone]}`}>
            {urgency.label}
          </span>
        </div>

        {/* Description */}
        {tender.brief && (
          <p className="text-sm text-slate-600 mt-3 line-clamp-2">{tender.brief}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tender.category && (
            <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-md">
              {tender.category}
            </span>
          )}

          {tender.state && (
            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-xs font-medium px-2 py-1 rounded-md">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {tender.state}
            </span>
          )}

          {tender.city && (
            <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2 py-1 rounded-md">
              {tender.city}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-5 pt-4 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-500">Estimated Cost</p>
            <p className="font-bold text-green-600 tabular-nums text-sm sm:text-base">
              {formatAmount(tender.estimatedCost)}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Submission Date</p>
            <p className="font-medium text-slate-800 text-sm sm:text-base">
              {formatDate(tender.submissionDate)}
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-xs text-slate-500">Department</p>
            <p className="font-medium text-slate-800 text-sm sm:text-base line-clamp-1">
              {tender.department || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TenderCard;