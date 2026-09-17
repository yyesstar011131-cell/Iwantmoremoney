"use client";

export default function FilterPanel({ dealType, onDealTypeChange, grades, onGradesChange }) {
  function toggleGrade(g) {
    if (grades.includes(g)) {
      onGradesChange(grades.filter((x) => x !== g));
    } else {
      onGradesChange([...grades, g]);
    }
  }

  return (
    <div className="mx-5 mb-4 flex flex-col gap-4 rounded-card bg-white p-4 hairline">
      <div>
        <p className="mb-2 text-xs text-muted">거래 방식</p>
        <div className="flex gap-2">
          {[
            { key: "all", label: "전체" },
            { key: "free", label: "무료나눔" },
            { key: "paid", label: "유료판매" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => onDealTypeChange(opt.key)}
              className={`flex-1 rounded-card py-2 text-[13px] font-medium hairline ${
                dealType === opt.key ? "border-primary bg-primary text-white" : "text-ink"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs text-muted">학년</p>
        <div className="flex gap-2">
          {[1, 2, 3].map((g) => (
            <button
              key={g}
              onClick={() => toggleGrade(g)}
              className={`flex-1 rounded-card py-2 text-[13px] font-medium hairline ${
                grades.includes(g) ? "border-primary bg-primary text-white" : "text-ink"
              }`}
            >
              {g}학년
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
