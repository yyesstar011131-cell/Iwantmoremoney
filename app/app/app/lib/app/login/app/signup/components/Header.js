"use client";

import Link from "next/link";

const CATEGORIES = ["최신순", "학용품", "교재"];

export default function Header({
  profileName,
  query,
  onQueryChange,
  category,
  onCategoryChange,
  filterOpen,
  onToggleFilter,
  activeFilterCount,
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/95 px-5 pt-5 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-card bg-white px-3.5 py-2.5 hairline">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5.2" stroke="#8B8578" strokeWidth="1.4" />
            <path d="M11 11L14.2 14.2" stroke="#8B8578" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="찾는 물건을 검색해보세요"
            className="w-full bg-transparent text-[14px] outline-none placeholder:text-muted"
          />
        </div>

        <Link href="/profile" className="flex flex-col items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-white">
            {profileName ? profileName[0] : "?"}
          </div>
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-between pb-3">
        <div className="flex gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => onCategoryChange(c)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                category === c
                  ? "bg-ink text-white"
                  : "bg-white text-muted hairline"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <button
          onClick={onToggleFilter}
          className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-medium hairline ${
            filterOpen || activeFilterCount > 0
              ? "border-accent text-accent"
              : "bg-white text-muted"
          }`}
        >
          필터
          {activeFilterCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
