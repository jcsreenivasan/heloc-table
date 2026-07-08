"use client";

import { useState, useMemo } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { lenders, type Lender } from "@/data/lenders";

/* ── Loan term tab options ── */
const LOAN_TERMS = ["5 Year", "10 Year", "15 Year", "20 Year", "30 Year"];

/* ── Parse "$700K" → 700000 for sort ── */
function parseMaxAmount(s: string): number {
  const n = parseFloat(s.replace(/[^0-9.]/g, ""));
  return s.toUpperCase().includes("K") ? n * 1_000 : n * 1_000_000;
}

/* ── Single secondary stat ── */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={secLabelStyle}>{label}</p>
      <p style={secValueStyle}>{value}</p>
    </div>
  );
}

/* ── Individual rate card ── */
function RateCard({ lender }: { lender: Lender }) {
  return (
    <div
      className="rate-card"
      style={{
        borderRadius: 12,
        border: "1px solid #ebebed",
        background: "#ffffff",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        display: "flex",
        alignItems: "center",
        padding: "20px 24px 20px 28px",
      }}
    >
      {/* Rate — hero number, only bold element */}
      <div style={{ flexShrink: 0, paddingRight: 32 }}>
        <p style={heroLabelStyle}>Rate</p>
        <p style={{ lineHeight: 1, margin: "5px 0 0" }}>
          <span style={heroNumberStyle}>{lender.rate}</span>
          <span style={heroUnitStyle}>%</span>
        </p>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          style={feesLinkStyle}
        >
          Fees &amp; conditions
        </a>
      </div>

      {/* Hairline separator */}
      <div style={{ width: 1, height: 42, background: "#ebebed", flexShrink: 0 }} />

      {/* Secondary stats — light, understated */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          flex: 1,
          paddingLeft: 32,
        }}
      >
        <Stat label="APR" value={`${lender.apr}%`} />
        <Stat label="Loan term" value={lender.loanTerm} />
        <Stat
          label="Loan amount"
          value={`${lender.loanAmountMin}–${lender.loanAmountMax}`}
        />
      </div>

      {/* CTA — hidden by default, slides in on hover */}
      <div className="cta-cell" style={{ flexShrink: 0, paddingLeft: 20 }}>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          style={ctaStyle}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.background =
              "var(--brand-cta-hover-bg)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.background =
              "var(--brand-cta-bg)")
          }
        >
          Check rate
          <ArrowRight size={14} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
}

/* ── Controls bar: loan term tabs + sort by ── */
function ControlsBar({
  activeTerm,
  onTermChange,
  sortBy,
  onSortChange,
}: {
  activeTerm: string | null;
  onTermChange: (term: string | null) => void;
  sortBy: string;
  onSortChange: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
        flexWrap: "wrap",
        gap: 10,
      }}
    >
      {/* Left: Loan term tabs */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#6b7280",
            marginRight: 4,
            whiteSpace: "nowrap",
          }}
        >
          Loan term:
        </span>
        {LOAN_TERMS.map((term) => {
          const active = activeTerm === term;
          return (
            <button
              key={term}
              type="button"
              onClick={() => onTermChange(active ? null : term)}
              style={{
                padding: "5px 13px",
                borderRadius: 999,
                border: `1px solid ${active ? "var(--brand-primary)" : "#e2e8f0"}`,
                background: active ? "var(--brand-primary)" : "#ffffff",
                color: active ? "#ffffff" : "#4b5563",
                fontSize: 12,
                fontWeight: active ? 600 : 500,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "var(--brand-primary)";
                  el.style.color = "var(--brand-primary)";
                  el.style.background = "var(--brand-primary-light)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "#e2e8f0";
                  el.style.color = "#4b5563";
                  el.style.background = "#ffffff";
                }
              }}
            >
              {term}
            </button>
          );
        })}
      </div>

      {/* Right: Sort by */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", whiteSpace: "nowrap" }}>
          Sort by
        </span>
        <div style={{ position: "relative" }}>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              height: 34,
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              padding: "0 28px 0 11px",
              fontSize: 12,
              fontWeight: 500,
              color: "#374151",
              background: "#ffffff",
              fontFamily: "inherit",
              cursor: "pointer",
              appearance: "none",
              outline: "none",
            }}
          >
            <option value="lowest-apr">Lowest APR</option>
            <option value="highest-amount">Highest Loan Amount</option>
          </select>
          <ChevronDown
            size={13}
            color="#9ca3af"
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Main export ── */
export default function RateTable() {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("lowest-apr");

  const displayed = useMemo(() => {
    // 1. Filter by loan term
    const termFilter = activeTerm?.toLowerCase() ?? null;
    const filtered = termFilter
      ? lenders.filter((l) => l.loanTerm.toLowerCase() === termFilter)
      : lenders;

    // 2. Sort
    return [...filtered].sort((a, b) => {
      if (sortBy === "lowest-apr") {
        return parseFloat(a.apr) - parseFloat(b.apr);
      }
      if (sortBy === "highest-amount") {
        return parseMaxAmount(b.loanAmountMax) - parseMaxAmount(a.loanAmountMax);
      }
      return 0;
    });
  }, [activeTerm, sortBy]);

  return (
    <div>
      <ControlsBar
        activeTerm={activeTerm}
        onTermChange={setActiveTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {displayed.length === 0 ? (
        <div
          style={{
            padding: "40px 24px",
            textAlign: "center",
            color: "#9ca3af",
            fontSize: 14,
            background: "#fafafa",
            borderRadius: 12,
            border: "1px solid #ebebed",
          }}
        >
          No lenders found for this loan term.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {displayed.map((lender) => (
            <RateCard key={lender.id} lender={lender} />
          ))}
        </div>
      )}

      <p style={disclaimerStyle}>
        Rates shown are based on the personalized search criteria above. APR
        shown is for a $100,000 HELOC. Your actual rate may differ based on
        credit profile, loan-to-value ratio, and lender criteria. All rates as
        of{" "}
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
        .
      </p>
    </div>
  );
}

/* ── Style constants ── */

const heroLabelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#b0b7c3",
  margin: 0,
};

const heroNumberStyle: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 800,
  color: "#0f172a",
  letterSpacing: "-0.03em",
};

const heroUnitStyle: React.CSSProperties = {
  fontSize: 19,
  fontWeight: 700,
  color: "#0f172a",
  letterSpacing: "-0.02em",
  marginLeft: 1,
};

const feesLinkStyle: React.CSSProperties = {
  display: "block",
  marginTop: 6,
  fontSize: 11,
  fontWeight: 500,
  color: "var(--brand-link-color)",
  textDecoration: "none",
};

const secLabelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  color: "#b0b7c3",
  margin: "0 0 5px",
};

const secValueStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 400,
  color: "#6b7280",
  letterSpacing: "-0.01em",
  margin: 0,
};

const ctaStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  background: "var(--brand-cta-bg)",
  color: "var(--brand-cta-text)",
  borderRadius: "var(--brand-cta-radius)",
  fontWeight: 600,
  fontSize: 13,
  padding: "10px 20px",
  textDecoration: "none",
  whiteSpace: "nowrap",
  fontFamily: "inherit",
  letterSpacing: "0.01em",
  transition: "background 0.15s ease",
};

const disclaimerStyle: React.CSSProperties = {
  marginTop: 16,
  fontSize: 11,
  color: "#c4c9d4",
  lineHeight: 1.7,
  padding: "0 2px",
};
