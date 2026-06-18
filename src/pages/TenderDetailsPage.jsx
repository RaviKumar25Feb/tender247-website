import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTenderById } from "../api/tenderApi";
import Loader from "../components/Loader";
import TenderInfoCard from "../components/TenderInfoCard";
import { formatAmount } from "../utils/formatAmount";
import { formatDate } from "../utils/formatDate";
import { getUrgencyStatus } from "../utils/getUrgencyStatus";

// Same data as formatDate but with a time component, only needed on this
// page, so it stays local instead of becoming a 4th utils file.
const formatDateTime = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const statusBadge = {
  ACTIVE: "bg-green-100 text-green-700",
  CLOSED: "bg-slate-100 text-slate-600",
  CANCELLED: "bg-red-100 text-red-700",
  AWARDED: "bg-blue-100 text-blue-700",
};

const pillTone = {
  critical: "bg-orange-100 text-orange-700",
  warning: "bg-orange-50 text-orange-600",
  normal: "bg-blue-50 text-blue-700",
  closed: "bg-slate-100 text-slate-500",
  neutral: "bg-slate-100 text-slate-500",
};

function NotFound() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
      <div className="h-14 w-14 rounded-full bg-slate-100 grid place-items-center mx-auto mb-4">
        <svg className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-slate-900 font-semibold text-lg">Tender not found</h2>
      <p className="text-slate-500 text-sm mt-1.5">
        It may have been removed, or the link could be incorrect.
      </p>
      <Link
        to="/"
        className="inline-block mt-5 text-sm font-semibold text-blue-600 hover:text-blue-800"
      >
        ← Back to all tenders
      </Link>
    </div>
  );
}

function TenderDetailsPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [tender, setTender] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadTender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadTender = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getTenderById(id);
      setTender(res.data);
    } catch (err) {
      console.error("Failed to load tender:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error || !tender) return <NotFound />;

  const urgency = getUrgencyStatus(tender.submissionDate || tender.closingDate);

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to all tenders
      </Link>

      {/* Header card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                statusBadge[tender.status] || "bg-slate-100 text-slate-600"
              }`}
            >
              {tender.status || "UNKNOWN"}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${pillTone[urgency.tone]}`}>
              {urgency.label}
            </span>
          </div>

          <span className="text-xs text-slate-500">
            Tender ID:{" "}
            <span className="font-semibold text-slate-700">{tender.sourceTenderId || "N/A"}</span>
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-4 leading-snug">
          {tender.title}
        </h1>

        <p className="text-slate-500 text-sm mt-2">
          {tender.organization || tender.department || "Department not specified"}
        </p>

        {tender.brief && (
          <p className="text-slate-600 text-sm mt-4 leading-relaxed">{tender.brief}</p>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {tender.category && (
            <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-md">
              {tender.category}
            </span>
          )}
          {tender.state && (
            <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-md">
              📍 {tender.state}
            </span>
          )}
          {tender.city && (
            <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-md">
              {tender.city}
            </span>
          )}
        </div>
      </div>

      {/* Key numbers strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-500">Estimated Cost</p>
          <p className="text-xl font-bold text-green-600 tabular-nums mt-1">
            {formatAmount(tender.estimatedCost)}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-500">Submission Deadline</p>
          <p className="text-xl font-bold text-slate-900 tabular-nums mt-1">
            {formatDate(tender.submissionDate)}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-500">EMD Amount</p>
          <p className="text-xl font-bold text-slate-900 tabular-nums mt-1">
            {formatAmount(tender.emdAmount)}
          </p>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
          <h3 className="font-semibold text-slate-900 mb-2">Tender Information</h3>
          <TenderInfoCard label="Department" value={tender.department} />
          <TenderInfoCard label="Organization" value={tender.organization} />
          <TenderInfoCard label="Category" value={tender.category} />
          <TenderInfoCard label="Tender Type" value={tender.tenderType} />
          <TenderInfoCard label="Reference No." value={tender.referenceNumber} />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
          <h3 className="font-semibold text-slate-900 mb-2">Key Dates</h3>
          <TenderInfoCard label="Published On" value={formatDateTime(tender.publishedDate)} />
          <TenderInfoCard label="Document Download Start" value={formatDateTime(tender.documentStart)} />
          <TenderInfoCard label="Bid Submission Closes" value={formatDateTime(tender.submissionDate)} />
          <TenderInfoCard label="Opening Date" value={formatDateTime(tender.openingDate)} />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
          <h3 className="font-semibold text-slate-900 mb-2">Location</h3>
          <TenderInfoCard label="State" value={tender.state} />
          <TenderInfoCard label="City" value={tender.city} />
          <TenderInfoCard label="Pin Code" value={tender.pinCode} />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
          <h3 className="font-semibold text-slate-900 mb-2">Contact &amp; Documents</h3>
          <TenderInfoCard label="Contact Person" value={tender.contactPerson} />
          <TenderInfoCard label="Contact Email" value={tender.contactEmail} />
          <TenderInfoCard label="Contact Phone" value={tender.contactPhone} />
          {tender.documentUrl && (
            <a
              href={tender.documentUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 mt-3"
            >
              View tender document
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default TenderDetailsPage;