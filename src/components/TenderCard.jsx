import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Share2,
  Clock,
  MapPin,
  Mail,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";

// ── helpers ────────────────────────────────────────────────────────────────

function formatInr(value) {
  if (value == null || value === "") return "N/A";
  const num = Number(value);
  if (isNaN(num)) return "N/A";
  if (num >= 1_00_00_000) return `₹${(num / 1_00_00_000).toFixed(2)} Cr.`;
  if (num >= 1_00_000) return `₹${(num / 1_00_000).toFixed(2)} Lac`;
  return `₹${num.toLocaleString("en-IN")}`;
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return "—";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

function daysLeft(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getTenderId(sourceTenderId, _id) {
  if (sourceTenderId) {
    const digits = sourceTenderId.replace(/\D/g, "");
    if (digits.length >= 6) return digits.slice(-9);
  }
  return (_id || "").slice(-9).toUpperCase();
}

// ── share helpers ──────────────────────────────────────────────────────────

function buildShareText(tender) {
  const {
    title,
    estimatedCost,
    submissionDate,
    closingDate,
    city,
    state,
    _id,
  } = tender;
  const closing = submissionDate || closingDate;
  const loc = [city, state].filter(Boolean).join(", ");
  const url = `${window.location.origin}/tender/${_id}`;

  return {
    title,
    url,
    text: [
      `📋 *${title}*`,
      estimatedCost ? `💰 Bid Value: ${formatInr(estimatedCost)}` : null,
      closing ? `📅 Closing: ${formatDate(closing)}` : null,
      loc ? `📍 ${loc}` : null,
      `🔗 ${url}`,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

function shareWhatsApp(tender, e) {
  e.stopPropagation();
  const { text } = buildShareText(tender);
  window.open(
    `https://wa.me/?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener,noreferrer",
  );
}

function shareEmail(tender, e) {
  e.stopPropagation();
  const { title, text, url } = buildShareText(tender);
  const subject = encodeURIComponent(`Tender: ${title}`);
  const body = encodeURIComponent(`${text}\n\nView full details: ${url}`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

async function shareGeneral(tender, e, setCopied) {
  e.stopPropagation();
  const { title, text, url } = buildShareText(tender);

  // Try native Web Share API first (mobile browsers support this)
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return;
    } catch {
      // user cancelled or API not available — fall through to clipboard
    }
  }

  // Fallback: copy link to clipboard
  try {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch {
    // last resort: prompt
    window.prompt("Copy this link:", url);
  }
}

// ── component ──────────────────────────────────────────────────────────────

export default function TenderCard({ tender, index }) {
  const [saved, setSaved] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  if (!tender) return null;

  const {
    _id,
    title,
    estimatedCost,
    emdAmount,
    submissionDate,
    closingDate,
    city,
    state,
    department,
    organization,
    category,
    sourcePortal,
    sourceTenderId,
    status,
    description,
  } = tender;

  const closingRaw = submissionDate || closingDate;
  const remaining = daysLeft(closingRaw);
  const isExpired = remaining !== null && remaining < 0;
  const isUrgent = remaining !== null && remaining >= 0 && remaining <= 7;
  const locationStr = [city, state, "India"].filter(Boolean).join(", ");
  const tenderId = getTenderId(sourceTenderId, _id);
  const num = index != null ? index + 1 : null;

  const goToDetail = () => navigate(`/tender/${_id}`);
  const stopProp = (e) => e.stopPropagation();

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200">
      {/* ── Top meta bar ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center px-4 py-2.5 bg-slate-50 border-b border-slate-100 text-[13px] text-slate-600">
        {/* Serial */}
        {num != null && (
          <>
            <span className="font-semibold text-slate-800 pr-2">{num}</span>
            <Sep />
          </>
        )}

        {/* Bid Value */}
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

        {/* Closing date + days left */}
        <span className="flex items-center gap-1.5 px-2 whitespace-nowrap">
          <Clock
            size={13}
            className={isExpired ? "text-red-500" : "text-blue-500"}
          />
          <span
            className={`font-medium ${isExpired ? "text-red-600" : "text-blue-600"}`}
          >
            {formatDate(closingRaw)}
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
          T247 ID- <span className="font-bold text-slate-800">{tenderId}</span>
        </span>
        <Sep />

        {/* ── Send me on ── */}
        <span className="flex items-center gap-2 px-2 whitespace-nowrap text-slate-500">
          Send me on
          {/* WhatsApp — opens wa.me with pre-filled message */}
          <button
            onClick={(e) => shareWhatsApp(tender, e)}
            title="Share on WhatsApp"
            className="text-green-500 hover:text-green-600 active:scale-90 transition-all"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-[15px] h-[15px]"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
          {/* Email — opens default mail client with pre-filled subject + body */}
          <button
            onClick={(e) => shareEmail(tender, e)}
            title="Share via Email"
            className="text-blue-500 hover:text-blue-600 active:scale-90 transition-all"
          >
            <Mail size={14} />
          </button>
        </span>

        {/* ── Right actions ── */}
        <div className="ml-auto flex items-center gap-2 pl-3">
          {/* BID NOW */}
          <button
            onClick={goToDetail}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap"
          >
            BID NOW
          </button>

          {/* Save / Favourite */}
          <button
            onClick={(e) => {
              stopProp(e);
              setSaved((s) => !s);
            }}
            title={saved ? "Unsave" : "Save"}
            className={`border rounded-lg p-1.5 transition-colors duration-150 ${
              saved
                ? "border-rose-300 text-rose-500 bg-rose-50"
                : "border-slate-200 text-slate-400 hover:border-rose-300 hover:text-rose-400"
            }`}
          >
            <Heart size={14} fill={saved ? "currentColor" : "none"} />
          </button>

          {/* Share — Web Share API on mobile, copies link on desktop */}
          <button
            onClick={(e) => shareGeneral(tender, e, setCopied)}
            title={copied ? "Link copied!" : "Share"}
            className={`border rounded-lg p-1.5 transition-colors duration-150 ${
              copied
                ? "border-green-300 text-green-600 bg-green-50"
                : "border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500"
            }`}
          >
            {copied ? <Check size={14} /> : <Share2 size={14} />}
          </button>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="px-4 py-3">
        {/* Title */}
        <p
          onClick={goToDetail}
          className="text-[14px] text-slate-800 leading-snug cursor-pointer hover:text-blue-700 transition-colors"
        >
          {title}
        </p>

        {/* Location + View Insights */}
        <div className="mt-2.5 flex flex-wrap items-center gap-x-6 gap-y-1">
          <span className="flex items-center gap-1 text-[13px] text-slate-500">
            <MapPin size={13} className="text-slate-400 shrink-0" />
            {locationStr}
          </span>

          <button
            onClick={() => setInsightsOpen((o) => !o)}
            className="flex items-center justify-center w-full gap-1 text-[13px] font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View Insights
            {insightsOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>

        {/* Expandable insights */}
        {insightsOpen && (
          <div className="mt-3 pt-3 border-t border-slate-100 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-[13px]">
            <InfoRow label="Department" value={department} />
            <InfoRow label="Category" value={category} />
            <InfoRow label="Portal" value={sourcePortal} />
            <InfoRow label="Tender Ref" value={sourceTenderId} />
            <InfoRow label="Status" value={status} />
            <InfoRow label="Organization" value={organization} />
            {description && (
              <div className="sm:col-span-2 mt-1">
                <span className="text-slate-400 font-medium">
                  Description:{" "}
                </span>
                <span className="text-slate-600 leading-relaxed">
                  {description}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── tiny helpers ───────────────────────────────────────────────────────────

function Sep() {
  return <span className="text-slate-300 select-none">|</span>;
}

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <span className="text-slate-400 font-medium">{label}: </span>
      <span className="text-slate-700">{value}</span>
    </div>
  );
}
