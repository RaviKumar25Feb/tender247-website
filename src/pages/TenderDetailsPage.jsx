import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTenderById } from "../api/tenderApi";
import Loader from "../components/Loader";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Calendar,
  Building2,
  Tag,
  Globe,
  Heart,
  Share2,
  Mail,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  IndianRupee,
  Briefcase,
  ShieldCheck,
  Hash,
} from "lucide-react";

// ── helpers ────────────────────────────────────────────────────────────────

function formatInr(value) {
  if (value == null || value === "") return "N/A";
  const num = Number(value);
  if (isNaN(num)) return "N/A";
  if (num === 0) return "Nil";
  if (num >= 1_00_00_000) return `₹${(num / 1_00_00_000).toFixed(2)} Cr.`;
  if (num >= 1_00_000) return `₹${(num / 1_00_000).toFixed(2)} Lac`;
  return `₹${num.toLocaleString("en-IN")}`;
}

function formatDateTime(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return "—";
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateOnly(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function daysLeft(dateStr) {
  if (!dateStr) return null;
  return Math.ceil((new Date(dateStr) - Date.now()) / (1000 * 60 * 60 * 24));
}

const STATUS_STYLES = {
  ACTIVE: {
    bg: "bg-green-100 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
  CLOSED: {
    bg: "bg-slate-100 text-slate-600 border-slate-200",
    dot: "bg-slate-400",
  },
  CANCELLED: {
    bg: "bg-red-100  text-red-700   border-red-200",
    dot: "bg-red-500",
  },
  AWARDED: {
    bg: "bg-blue-100 text-blue-700  border-blue-200",
    dot: "bg-blue-500",
  },
};

// ── sub-components ─────────────────────────────────────────────────────────

/** Single label → value row used in all info panels */
function InfoRow({ label, value, mono = false, highlight }) {
  if (value == null || value === "" || value === "—") return null;
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-400 font-medium w-40 shrink-0 pt-0.5">
        {label}
      </span>
      <span
        className={`text-sm break-words min-w-0 flex-1 ${
          mono
            ? "font-mono text-slate-600"
            : highlight
              ? "font-semibold text-blue-700"
              : "text-slate-700"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/** Collapsible section card */
function Section({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-100 hover:bg-slate-100 transition-colors"
      >
        <span className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
          <span className="text-blue-500">{icon}</span>
          {title}
        </span>
        {open ? (
          <ChevronUp size={15} className="text-slate-400" />
        ) : (
          <ChevronDown size={15} className="text-slate-400" />
        )}
      </button>
      {open && <div className="px-5 py-1">{children}</div>}
    </div>
  );
}

/** Not-found state */
function NotFound() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-lg mx-auto">
      <div className="h-14 w-14 rounded-full bg-slate-100 grid place-items-center mx-auto mb-4">
        <AlertCircle className="h-7 w-7 text-slate-400" />
      </div>
      <h2 className="text-slate-900 font-semibold text-lg">Tender not found</h2>
      <p className="text-slate-500 text-sm mt-1.5">
        This tender may have been removed or the link is incorrect.
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

// ── main page ──────────────────────────────────────────────────────────────

export default function TenderDetailsPage() {
  const { id } = useParams();
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getTenderById(id)
      .then((res) => setTender(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error || !tender) return <NotFound />;

  const {
    title,
    description,
    workDescription,
    estimatedCost,
    emdAmount,
    tenderFee,
    currency,
    emdPayableTo,
    emdPayableAt,
    submissionDate,
    closingDate,
    publishDate,
    openingDate,
    bidSubmissionStartDate,
    documentDownloadStartDate,
    documentDownloadEndDate,
    clarificationStartDate,
    clarificationEndDate,
    preBidMeetingDate,
    city,
    state,
    location,
    fullLocation,
    address,
    pincode,
    department,
    organization,
    category,
    subCategory,
    tenderCategory,
    tenderType,
    contractType,
    formOfContract,
    tenderReferenceNumber,
    sourceTenderId,
    sourcePortal,
    sourceUrl,
    status,
    bidValidity,
    periodOfWork,
    noOfCovers,
    authorityName,
    paymentMode,
    bidOpeningPlace,
    preBidMeetingPlace,
    preBidMeetingAddress,
    ndaPreQualification,
    keywords,
    documents,
    nitDocument,
    workItemDocuments,
    createdAt,
    updatedAt,
    lastScrapedAt,
  } = tender;

  const closingRaw = submissionDate || closingDate;
  const remaining = daysLeft(closingRaw);
  const isExpired = remaining !== null && remaining < 0;
  const isUrgent = remaining !== null && remaining >= 0 && remaining <= 7;

  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.CLOSED;
  const locationStr =
    fullLocation || [city, state].filter(Boolean).join(", ") || location || "—";

  // extract digits from sourceTenderId for the T247 style ID
  const tenderId247 = sourceTenderId
    ? sourceTenderId.replace(/\D/g, "").slice(-9)
    : (id || "").slice(-9).toUpperCase();

  return (
    <div className="space-y-5 pb-12">
      {/* ── Breadcrumb nav ─────────────────────────────────────────────── */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={15} />
        Back to all tenders
      </Link>

      {/* ── Hero header card ───────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {/* Top action bar — mirrors the list card meta bar */}
        <div className="flex flex-wrap items-center gap-x-0 px-5 py-2.5 bg-slate-50 border-b border-slate-100 text-[13px] text-slate-600">
          {/* Status badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyle.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
            {status || "UNKNOWN"}
          </span>

          <Sep />

          {/* Bid value */}
          <span className="px-2 whitespace-nowrap">
            Bid Value:{" "}
            <span className="font-semibold text-slate-800">
              {formatInr(estimatedCost)}
            </span>
          </span>
          <Sep />

          {/* EMD */}
          <span className="px-2 whitespace-nowrap">
            EMD:{" "}
            <span className="font-semibold text-slate-800">
              {formatInr(emdAmount)}
            </span>
          </span>
          <Sep />

          {/* Closing + days left */}
          <span className="flex items-center gap-1.5 px-2 whitespace-nowrap">
            <Clock
              size={13}
              className={isExpired ? "text-red-500" : "text-blue-500"}
            />
            <span
              className={`font-medium ${isExpired ? "text-red-600" : "text-blue-600"}`}
            >
              {formatDateOnly(closingRaw)}
            </span>
            {remaining !== null && (
              <span
                className={
                  isExpired
                    ? "text-red-500 font-medium"
                    : isUrgent
                      ? "text-orange-500 font-medium"
                      : "text-slate-500"
                }
              >
                {isExpired
                  ? `${Math.abs(remaining)} Days Overdue`
                  : `${remaining} Days Left`}
              </span>
            )}
          </span>
          <Sep />

          {/* T247 ID */}
          <span className="px-2 whitespace-nowrap text-slate-500">
            T247 ID-{" "}
            <span className="font-bold text-slate-800">{tenderId247}</span>
          </span>
          <Sep />

          {/* Send me on */}
          <span className="flex items-center gap-2 px-2 whitespace-nowrap text-slate-500">
            Send me on
            <button
              title="Send on WhatsApp"
              className="text-green-500 hover:text-green-600 transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[15px] h-[15px]"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </button>
            <button
              title="Send by Email"
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              <Mail size={14} />
            </button>
          </span>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-2 pl-3">
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold px-5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
              >
                BID NOW
                <ExternalLink size={12} />
              </a>
            )}
            <button
              onClick={() => setSaved((s) => !s)}
              className={`border rounded-lg p-1.5 transition-colors ${
                saved
                  ? "border-rose-300 text-rose-500 bg-rose-50"
                  : "border-slate-200 text-slate-400 hover:border-rose-300 hover:text-rose-400"
              }`}
            >
              <Heart size={14} fill={saved ? "currentColor" : "none"} />
            </button>
            <button className="border border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500 rounded-lg p-1.5 transition-colors">
              <Share2 size={14} />
            </button>
          </div>
        </div>

        {/* Title + org block */}
        <div className="px-5 pt-4 pb-5">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {title}
          </h1>

          {(organization || department) && (
            <p className="text-sm text-slate-500 mt-1.5 flex items-center gap-1.5">
              <Building2 size={13} className="text-slate-400 shrink-0" />
              {organization || department}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-[13px] text-slate-500">
            {locationStr !== "—" && (
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-slate-400 shrink-0" />
                {locationStr}
              </span>
            )}
            {category && (
              <span className="flex items-center gap-1">
                <Tag size={13} className="text-slate-400 shrink-0" />
                {category}
              </span>
            )}
            {tenderType && (
              <span className="flex items-center gap-1">
                <Briefcase size={13} className="text-slate-400 shrink-0" />
                {tenderType}
              </span>
            )}
            {sourcePortal && (
              <span className="flex items-center gap-1">
                <Globe size={13} className="text-slate-400 shrink-0" />
                {sourcePortal}
              </span>
            )}
          </div>

          {/* Keyword tags */}
          {keywords?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {keywords.map((kw, i) => (
                <span
                  key={i}
                  className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Key stats strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-slate-100">
          <StatCell
            label="Estimated Cost"
            value={formatInr(estimatedCost)}
            valueClass="text-green-600 font-bold"
          />
          <StatCell
            label="EMD Amount"
            value={formatInr(emdAmount)}
            valueClass="text-slate-800 font-bold"
          />
          <StatCell
            label="Submission Deadline"
            value={formatDateOnly(closingRaw)}
            sub={
              remaining !== null
                ? isExpired
                  ? `${Math.abs(remaining)} days overdue`
                  : isUrgent
                    ? `⚠ Only ${remaining} days left`
                    : `${remaining} days remaining`
                : undefined
            }
            subClass={
              isExpired
                ? "text-red-500"
                : isUrgent
                  ? "text-orange-500"
                  : "text-slate-400"
            }
          />
          <StatCell label="Published On" value={formatDateOnly(publishDate)} />
        </div>
      </div>

      {/* ── Content grid ───────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Tender Information */}
        <Section title="Tender Information" icon={<FileText size={15} />}>
          <InfoRow
            label="Reference No."
            value={tenderReferenceNumber}
            highlight
          />
          <InfoRow label="Source Tender ID" value={sourceTenderId} mono />
          <InfoRow label="Organization" value={organization} />
          <InfoRow label="Department" value={department} />
          <InfoRow label="Category" value={category} />
          <InfoRow
            label="Sub Category"
            value={subCategory === "NA" ? null : subCategory}
          />
          <InfoRow label="Tender Category" value={tenderCategory} />
          <InfoRow label="Tender Type" value={tenderType} />
          <InfoRow label="Contract Type" value={contractType} />
          <InfoRow label="Form of Contract" value={formOfContract} />
          <InfoRow label="Source Portal" value={sourcePortal} />
          <InfoRow
            label="No. of Covers"
            value={noOfCovers != null ? String(noOfCovers) : null}
          />
          <InfoRow
            label="Bid Validity"
            value={bidValidity != null ? `${bidValidity} Days` : null}
          />
          <InfoRow
            label="Period of Work"
            value={periodOfWork != null ? `${periodOfWork} Days` : null}
          />
        </Section>

        {/* Financial Details */}
        <Section title="Financial Details" icon={<IndianRupee size={15} />}>
          <InfoRow label="Estimated Cost" value={formatInr(estimatedCost)} />
          <InfoRow label="EMD Amount" value={formatInr(emdAmount)} />
          <InfoRow
            label="Tender Fee"
            value={tenderFee != null ? formatInr(tenderFee) : null}
          />
          <InfoRow label="Currency" value={currency} />
          <InfoRow label="EMD Payable To" value={emdPayableTo} />
          <InfoRow label="EMD Payable At" value={emdPayableAt} />
          <InfoRow label="Payment Mode" value={paymentMode} />
        </Section>

        {/* Important Dates */}
        <Section title="Important Dates" icon={<Calendar size={15} />}>
          <InfoRow label="Published Date" value={formatDateTime(publishDate)} />
          <InfoRow
            label="Bid Submission Start"
            value={formatDateTime(bidSubmissionStartDate)}
          />
          <InfoRow
            label="Submission / Closing"
            value={formatDateTime(closingRaw)}
          />
          <InfoRow
            label="Document Download Start"
            value={formatDateTime(documentDownloadStartDate)}
          />
          <InfoRow
            label="Document Download End"
            value={formatDateTime(documentDownloadEndDate)}
          />
          <InfoRow
            label="Pre-Bid Meeting"
            value={formatDateTime(preBidMeetingDate)}
          />
          <InfoRow label="Opening Date" value={formatDateTime(openingDate)} />
          <InfoRow
            label="Clarification Start"
            value={formatDateTime(clarificationStartDate)}
          />
          <InfoRow
            label="Clarification End"
            value={formatDateTime(clarificationEndDate)}
          />
        </Section>

        {/* Location Details */}
        <Section title="Location Details" icon={<MapPin size={15} />}>
          <InfoRow label="Full Location" value={fullLocation} />
          <InfoRow label="City" value={city} />
          <InfoRow label="State" value={state} />
          <InfoRow label="Location" value={location} />
          <InfoRow label="Address" value={address} />
          <InfoRow label="Pincode" value={pincode} />
        </Section>

        {/* Authority Details */}
        <Section title="Authority Details" icon={<ShieldCheck size={15} />}>
          <InfoRow label="Authority Name" value={authorityName} />
          <InfoRow label="Bid Opening Place" value={bidOpeningPlace} />
          <InfoRow label="Pre-Bid Meeting Place" value={preBidMeetingPlace} />
          <InfoRow label="Pre-Bid Meeting Addr." value={preBidMeetingAddress} />
          <InfoRow
            label="NDA / Pre-Qualification"
            value={ndaPreQualification}
          />
        </Section>

        {/* Source Information */}
        <Section title="Source Information" icon={<Globe size={15} />}>
          <InfoRow label="Source Portal" value={sourcePortal} />
          <InfoRow label="Source Tender ID" value={sourceTenderId} mono />
          <InfoRow label="Status" value={status} />
          {sourceUrl && (
            <div className="py-2.5">
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Open Original Tender
                <ExternalLink size={13} />
              </a>
            </div>
          )}
        </Section>
      </div>

      {/* ── Description (full width) ───────────────────────────────────── */}
      {(description || workDescription) && (
        <Section
          title="Description"
          icon={<FileText size={15} />}
          defaultOpen={true}
        >
          <div className="py-2 space-y-3">
            {description && (
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            )}
            {workDescription && workDescription !== description && (
              <>
                <hr className="border-slate-100" />
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {workDescription}
                </p>
              </>
            )}
          </div>
        </Section>
      )}

      {/* ── NIT Document ──────────────────────────────────────────────── */}
      {nitDocument && (
        <Section
          title="NIT Document"
          icon={<FileText size={15} />}
          defaultOpen={false}
        >
          <div className="py-2">
            <pre className="text-xs text-slate-600 whitespace-pre-wrap font-mono bg-slate-50 rounded-lg p-3">
              {nitDocument}
            </pre>
          </div>
        </Section>
      )}

      {/* ── Work Item Documents ───────────────────────────────────────── */}
      {workItemDocuments && (
        <Section
          title="Work Item Documents"
          icon={<FileText size={15} />}
          defaultOpen={false}
        >
          <div className="py-2">
            <pre className="text-xs text-slate-600 whitespace-pre-wrap font-mono bg-slate-50 rounded-lg p-3">
              {workItemDocuments}
            </pre>
          </div>
        </Section>
      )}

      {/* ── Downloadable Documents ────────────────────────────────────── */}
      {documents?.length > 0 && (
        <Section
          title={`Documents (${documents.length})`}
          icon={<FileText size={15} />}
        >
          <div className="py-2 space-y-2">
            {documents.map((doc, i) => (
              <a
                key={i}
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border border-slate-100 hover:border-blue-200 bg-slate-50 hover:bg-blue-50 rounded-lg px-4 py-3 transition-colors group"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 group-hover:text-blue-700 break-all">
                    {doc.name}
                  </p>
                  {doc.type && (
                    <p className="text-xs text-slate-400 mt-0.5">{doc.type}</p>
                  )}
                </div>
                <span className="ml-4 shrink-0 flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-800">
                  Open <ExternalLink size={12} />
                </span>
              </a>
            ))}
          </div>
        </Section>
      )}

      {/* ── Audit info (collapsed by default) ─────────────────────────── */}
      <Section
        title="Audit Information"
        icon={<Hash size={15} />}
        defaultOpen={false}
      >
        <InfoRow label="Created At" value={formatDateTime(createdAt)} />
        <InfoRow label="Updated At" value={formatDateTime(updatedAt)} />
        <InfoRow
          label="Last Scraped At"
          value={formatDateTime(lastScrapedAt)}
        />
      </Section>

      {/* ── Bottom CTA bar ─────────────────────────────────────────────── */}
      <div className="sticky bottom-4 z-10">
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm">
            <p className="font-semibold text-slate-800 truncate max-w-xs sm:max-w-md">
              {title}
            </p>
            <p
              className={`text-xs font-medium mt-0.5 ${
                isExpired
                  ? "text-red-500"
                  : isUrgent
                    ? "text-orange-500"
                    : "text-slate-500"
              }`}
            >
              {remaining === null
                ? ""
                : isExpired
                  ? `Closed ${Math.abs(remaining)} days ago`
                  : `${remaining} days left to bid`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved((s) => !s)}
              className={`flex items-center gap-1.5 text-xs font-semibold border rounded-lg px-3 py-2 transition-colors ${
                saved
                  ? "border-rose-300 text-rose-600 bg-rose-50"
                  : "border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-500"
              }`}
            >
              <Heart size={13} fill={saved ? "currentColor" : "none"} />
              {saved ? "Saved" : "Save"}
            </button>
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2 rounded-lg transition-colors"
              >
                BID NOW <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── micro helpers ──────────────────────────────────────────────────────────

function Sep() {
  return <span className="text-slate-300 select-none">|</span>;
}

function StatCell({
  label,
  value,
  sub,
  subClass = "text-slate-400",
  valueClass = "text-slate-800 font-bold",
}) {
  return (
    <div className="bg-white px-5 py-4 border-r border-slate-100 last:border-0 border-b sm:border-b-0">
      <p className="text-xs text-slate-400 font-medium">{label}</p>
      <p className={`text-sm mt-0.5 tabular-nums ${valueClass}`}>{value}</p>
      {sub && <p className={`text-xs mt-0.5 font-medium ${subClass}`}>{sub}</p>}
    </div>
  );
}
