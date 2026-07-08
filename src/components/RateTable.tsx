"use client";

import { useState, useMemo } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { lenders, type Lender } from "@/data/lenders";

const LOAN_TERMS = ["5 Year", "10 Year", "15 Year", "20 Year", "30 Year"];

function parseMaxAmount(s: string): number {
  const n = parseFloat(s.replace(/[^0-9.]/g, ""));
  return s.toUpperCase().includes("K") ? n * 1_000 : n * 1_000_000;
}

/* ── Thin vertical divider between stat sections ── */
function Divider() {
  return (
    <div
      style={{
        width: 1,
        background: "var(--brand-stat-divider)",
        alignSelf: "stretch",
        flexShrink: 0,
        margin: "10px 0",
      }}
    />
  );
}

/* ── One labeled stat section inside the card ── */
function StatSection({
  label,
  children,
  width,
}: {
  label: string;
  children: React.ReactNode;
  width?: number | string;
}) {
  return (
    <div
      style={{
        padding: "12px 22px",          /* ↓ 30% shorter than previous 20px 26px */
        flexShrink: width ? 0 : undefined,
        flex: width ? undefined : "1 1 0",
        width: width,
        minWidth: 0,
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          color: "#64748b",            /* darker — was #94a3b8 */
          marginBottom: 5,
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

/* ── Individual rate card ── */
function RateCard({ lender, index }: { lender: Lender; index: number }) {
  return (
    <div
      className="rate-card"
      style={{
        display: "flex",
        alignItems: "stretch",
        background: "#ffffff",
        border: "1px solid var(--brand-card-border)",
        borderRadius: 12,
        boxShadow: "none",
        overflow: "hidden",
        animation: "cardFadeIn 0.3s ease both",
        animationDelay: `${index * 40}ms`,
      }}
    >
      {/* Rate — black, not blue */}
      <StatSection label="Rate" width={160}>
        <p style={{ lineHeight: 1 }}>
          <span
            style={{
              fontSize: 24,            /* was 28 */
              fontWeight: 800,
              color: "#0f172a",        /* black — was brand blue */
              letterSpacing: "-0.03em",
            }}
          >
            {lender.rate}
          </span>
          <span
            style={{
              fontSize: 15,            /* was 17 */
              fontWeight: 700,
              color: "#0f172a",        /* black */
              marginLeft: 1,
            }}
          >
            %
          </span>
        </p>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="fees-link"
          style={{
            display: "inline-block",
            marginTop: 6,
            fontSize: 11,
            fontWeight: 600,
            color: "var(--brand-link-color)",
            textDecoration: "none",
          }}
        >
          Fees &amp; conditions
        </a>
      </StatSection>

      <Divider />

      {/* APR */}
      <StatSection label="APR">
        <p style={boldStatStyle}>{lender.apr}%</p>
      </StatSection>

      <Divider />

      {/* Loan term */}
      <StatSection label="Loan term">
        <p style={boldStatStyle}>{lender.loanTerm}</p>
      </StatSection>

      <Divider />

      {/* Loan amount */}
      <StatSection label="Loan amount">
        <p style={boldStatStyle}>
          {lender.loanAmountMin}–{lender.loanAmountMax}
        </p>
      </StatSection>

      {/* CTA — slides in on hover */}
      <div
        className="cta-cell"
        style={{
          display: "flex",
          alignItems: "center",
          paddingRight: 20,
          paddingLeft: 8,
          flexShrink: 0,
        }}
      >
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

/* ── Controls: loan term tabs + sort by ── */
function ControlsBar({
  activeTerm,
  onTermChange,
  sortBy,
  onSortChange,
}: {
  activeTerm: string | null;
  onTermChange: (t: string | null) => void;
  sortBy: string;
  onSortChange: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      {/* Loan term tabs */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#475569", marginRight: 2, whiteSpace: "nowrap" }}>
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
                padding: "5px 14px",
                borderRadius: 999,
                border: `1.5px solid ${active ? "var(--brand-primary)" : "#e2e8f0"}`,
                background: active ? "var(--brand-primary)" : "#ffffff",
                color: active ? "#ffffff" : "#475569",
                fontSize: 12,
                fontWeight: active ? 700 : 500,
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
                  el.style.color = "#475569";
                  el.style.background = "#ffffff";
                }
              }}
            >
              {term}
            </button>
          );
        })}
      </div>

      {/* Sort by */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b", whiteSpace: "nowrap" }}>
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
              fontWeight: 600,
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

const DEFAULT_VISIBLE = 6;

/* ── Main export ── */
export default function RateTable() {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("lowest-apr");
  const [showAll, setShowAll] = useState(false);

  const displayed = useMemo(() => {
    const termFilter = activeTerm?.toLowerCase() ?? null;
    const filtered = termFilter
      ? lenders.filter((l) => l.loanTerm.toLowerCase() === termFilter)
      : lenders;

    return [...filtered].sort((a, b) => {
      if (sortBy === "lowest-apr") return parseFloat(a.apr) - parseFloat(b.apr);
      if (sortBy === "highest-amount")
        return parseMaxAmount(b.loanAmountMax) - parseMaxAmount(a.loanAmountMax);
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
            padding: "48px 24px",
            textAlign: "center",
            color: "#64748b",
            fontSize: 14,
            fontWeight: 500,
            background: "#f8fafc",
            borderRadius: 12,
            border: "1px solid #e2e8f0",
          }}
        >
          No matching offers found.
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(showAll ? displayed : displayed.slice(0, DEFAULT_VISIBLE)).map(
              (lender, i) => (
                <RateCard key={lender.id} lender={lender} index={i} />
              )
            )}
          </div>

          {/* Show more / collapse toggle */}
          {displayed.length > DEFAULT_VISIBLE && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                width: "100%",
                marginTop: 10,
                padding: "12px",
                background: "transparent",
                border: "1px dashed #cbd5e1",
                borderRadius: 10,
                color: "var(--brand-primary)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                letterSpacing: "0.01em",
                transition: "background 0.15s ease, border-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "var(--brand-primary-light)";
                el.style.borderColor = "var(--brand-primary)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "transparent";
                el.style.borderColor = "#cbd5e1";
              }}
            >
              <ChevronDown
                size={15}
                style={{
                  transition: "transform 0.2s ease",
                  transform: showAll ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
              {showAll
                ? "Show fewer options"
                : `See more rate options (${displayed.length - DEFAULT_VISIBLE} more)`}
            </button>
          )}
        </>
      )}

      <p
        style={{
          marginTop: 16,
          fontSize: 11,
          color: "#64748b",             /* darker — was #b0b7c3 */
          lineHeight: 1.7,
          padding: "0 2px",
        }}
      >
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

const boldStatStyle: React.CSSProperties = {
  fontSize: 18,                        /* was 20 — proportionally reduced */
  fontWeight: 700,
  color: "#1e293b",
  letterSpacing: "-0.02em",
  lineHeight: 1.2,
};

const ctaStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: "var(--brand-cta-bg)",
  color: "var(--brand-cta-text)",
  borderRadius: "var(--brand-cta-radius)",
  fontWeight: 700,
  fontSize: 13,
  padding: "10px 20px",
  textDecoration: "none",
  whiteSpace: "nowrap",
  fontFamily: "inherit",
  letterSpacing: "0.01em",
  transition: "background 0.15s ease",
};
