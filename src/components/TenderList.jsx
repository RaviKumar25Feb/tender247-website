import TenderCard from "./TenderCard";

function EmptyState() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-10 sm:p-14 text-center">
      <div className="h-14 w-14 rounded-full bg-slate-100 grid place-items-center mx-auto mb-4">
        <svg className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
      </div>
      <h3 className="text-slate-900 font-semibold text-lg">No tenders match these filters</h3>
      <p className="text-slate-500 text-sm mt-1.5 max-w-sm mx-auto">
        Try widening the value range, clearing the location filter, or searching a broader keyword.
      </p>
    </div>
  );
}

function TenderList({ tenders }) {
  if (!tenders?.length) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {tenders.map((tender) => (
        <TenderCard key={tender._id} tender={tender} />
      ))}
    </div>
  );
}

export default TenderList;