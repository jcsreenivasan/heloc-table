"use client";

import { useState, useMemo, Fragment } from "react";
import { ArrowRight, ChevronDown, Home, DollarSign } from "lucide-react";
import { lenders, type Lender } from "@/data/lenders";

const LOAN_TERMS = ["5 Year", "10 Year", "15 Year", "20 Year", "30 Year"];

function parseMaxAmount(s: string): number {
  const n = parseFloat(s.replace(/[^0-9.]/g, ""));
  return s.toUpperCase().includes("K") ? n * 1_000 : n * 1_000_000;
}

/* ── Promotional banner ── */
function PersonalizeRateBanner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 24px",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        background: "#f9fafb",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Icon block */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 12,
            background: "#dbeafe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <Home size={26} color="var(--brand-primary)" strokeWidth={1.8} />
          <div
            style={{
              position: "absolute",
              bottom: 7,
              right: 6,
              background: "var(--brand-primary)",
              borderRadius: "50%",
              width: 18,
              height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DollarSign size={10} color="#fff" strokeWidth={2.5} />
          </div>
        </div>

        {/* Text */}
        <div>
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#111827",
              marginBottom: 3,
              lineHeight: 1.3,
            }}
          >
            Want more personalized rates?
          </p>
          <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.4 }}>
            Get customized rates tailored to your needs.
          </p>
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        style={{
          background: "var(--brand-primary)",
          color: "#ffffff",
          border: "none",
          borderRadius: 8,
          padding: "12px 24px",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
          whiteSpace: "nowrap",
          flexShrink: 0,
          transition: "background 0.15s ease",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background =
            "var(--brand-primary-dark)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background =
            "var(--brand-primary)")
        }
      >
        Personalize my rate
      </button>
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
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        overflow: "hidden",
        animation: "cardFadeIn 0.3s ease both",
        animationDelay: `${index * 40}ms`,
      }}
    >
      {/* Left sidebar */}
      <div
        style={{
          width: 30,
          background: "#ede9fe",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.12em",
            color: "#7c3aed",
            textTransform: "uppercase",
            userSelect: "none",
          }}
        >
          HELOC
        </span>
      </div>

      {/* Rate / APR */}
      <div style={{ padding: "16px 26px", minWidth: 210, flexShrink: 0 }}>
        <p style={valueStyle}>
          {lender.rate}% / {lender.apr}%
        </p>
        <p style={sublabelStyle}>Rate / APR</p>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="fees-link"
          style={{
            display: "inline-block",
            marginTop: 5,
            fontSize: 11,
            fontWeight: 600,
            color: "var(--brand-link-color)",
            textDecoration: "none",
          }}
        >
          Fees &amp; conditions
        </a>
      </div>

      {/* Loan amount */}
      <div style={{ padding: "16px 26px", flex: 1, minWidth: 0 }}>
        <p style={valueStyle}>
          {lender.loanAmountMin}–{lender.loanAmountMax}
        </p>
        <p style={sublabelStyle}>Loan amount</p>
      </div>

      {/* Monthly payment */}
      <div style={{ padding: "16px 26px", flex: 1, minWidth: 0 }}>
        <p style={valueStyle}>{lender.monthlyPayment}</p>
        <p style={sublabelStyle}>Est. payment</p>
      </div>

      {/* Loan term */}
      <div style={{ padding: "16px 26px", flex: 1, minWidth: 0 }}>
        <p style={valueStyle}>{lender.loanTerm}</p>
        <p style={sublabelStyle}>Term</p>
      </div>

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
          Get started
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
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#475569",
            marginRight: 2,
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
                padding: "6px 14px",
                borderRadius: 6,
                border: "none",
                background: active ? "var(--brand-primary)" : "#f1f5f9",
                color: active ? "#ffffff" : "#475569",
                fontSize: 12,
                fontWeight: active ? 700 : 500,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.15s ease, color 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#e2e8f0";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#f1f5f9";
                }
              }}
            >
              {term}
            </button>
          );
        })}
      </div>

      {/* Sort by — inline text style */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#374151",
            whiteSpace: "nowrap",
          }}
        >
          Sort By:
        </span>
        <div style={{ position: "relative" }}>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--brand-primary)",
              appearance: "none",
              paddingRight: 18,
              cursor: "pointer",
              fontFamily: "inherit",
              outline: "none",
            }}
          >
            <option value="lowest-apr">Low Rate</option>
            <option value="highest-amount">Highest Loan Amount</option>
          </select>
          <ChevronDown
            size={13}
            color="var(--brand-primary)"
            style={{
              position: "absolute",
              right: 0,
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
            borderRadius: 8,
            border: "1px solid #e5e7eb",
          }}
        >
          No matching offers found.
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(showAll ? displayed : displayed.slice(0, DEFAULT_VISIBLE)).map(
              (lender, i) => (
                <Fragment key={lender.id}>
                  <RateCard lender={lender} index={i} />
                  {i === 2 && <PersonalizeRateBanner />}
                </Fragment>
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
                borderRadius: 8,
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
          color: "#64748b",
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

const valueStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: "#111827",
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
};

const sublabelStyle: React.CSSProperties = {
  fontSize: 11,
  color: "#6b7280",
  marginTop: 5,
  fontWeight: 400,
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
