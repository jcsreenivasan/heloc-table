"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { lenders, type Lender } from "@/data/lenders";

/* ---- Expandable details panel ---- */
function DetailsPanel({ lender, open }: { lender: Lender; open: boolean }) {
  const items = [
    { label: "Draw period", value: lender.details.drawPeriod },
    { label: "Repayment period", value: lender.details.repaymentPeriod },
    { label: "Prepayment penalty", value: lender.details.prepaymentPenalty },
    { label: "Application fee", value: lender.details.applicationFee },
    { label: "Appraisal fee", value: lender.details.appraisalFee },
    { label: "Annual fee", value: lender.details.annualFee },
    { label: "Min. credit score", value: lender.details.minCreditScore },
    { label: "Max LTV", value: lender.details.maxLTV },
  ];

  return (
    <div className={`details-panel${open ? " open" : ""}`}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px 32px",
        }}
      >
        {items.map((item) => (
          <div key={item.label}>
            <p style={detailLabelStyle}>{item.label}</p>
            <p style={detailValueStyle}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Single secondary stat (APR / Term / Amount) ---- */
function SecondaryStatItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p style={secLabelStyle}>{label}</p>
      <p style={secValueStyle}>{value}</p>
    </div>
  );
}

/* ---- Single rate card ---- */
function RateCard({ lender }: { lender: Lender }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rate-card"
      style={{
        borderRadius: 14,
        border: "1px solid #ebebed",
        background: "#ffffff",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* ── Main content row ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "22px 24px 22px 28px",
          gap: 0,
        }}
      >
        {/* Rate — the only hero number */}
        <div style={{ flexShrink: 0, paddingRight: 36 }}>
          <p style={heroLabelStyle}>Rate</p>
          <p style={{ lineHeight: 1, margin: "6px 0 0" }}>
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

        {/* Thin hairline between hero rate and secondary stats */}
        <div
          style={{
            width: 1,
            height: 44,
            background: "#ebebed",
            flexShrink: 0,
          }}
        />

        {/* Secondary stats — light, understated */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            flex: 1,
            paddingLeft: 36,
          }}
        >
          <SecondaryStatItem label="APR" value={`${lender.apr}%`} />
          <SecondaryStatItem label="Loan term" value={lender.loanTerm} />
          <SecondaryStatItem
            label="Loan amount"
            value={`${lender.loanAmountMin}–${lender.loanAmountMax}`}
          />
        </div>

        {/* CTA — hidden by default, slides in from right on hover */}
        <div
          className="cta-cell"
          style={{ flexShrink: 0, paddingLeft: 20 }}
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={ctaStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "var(--brand-cta-hover-bg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "var(--brand-cta-bg)";
            }}
          >
            Check rate
            <ArrowRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      </div>

      {/* ── Footer: expand toggle ── */}
      <div
        style={{
          borderTop: "1px solid #f4f4f6",
          padding: "7px 28px",
        }}
      >
        <button
          onClick={() => setExpanded((v) => !v)}
          style={toggleStyle}
        >
          {expanded ? "Hide details" : "Show more details"}
          {expanded ? (
            <ChevronUp size={11} strokeWidth={2} />
          ) : (
            <ChevronDown size={11} strokeWidth={2} />
          )}
        </button>
      </div>

      {/* ── Expandable details ── */}
      <div
        style={{
          borderTop: expanded ? "1px solid #f0f0f3" : "none",
          background: "#fafafa",
        }}
      >
        <DetailsPanel lender={lender} open={expanded} />
      </div>
    </div>
  );
}

/* ---- Main export ---- */
export default function RateTable() {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {lenders.map((lender) => (
          <RateCard key={lender.id} lender={lender} />
        ))}
      </div>

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

/* ================================================================
   Style constants — all in one place for easy tuning
   ================================================================ */

/** The only bold element — the rate percentage */
const heroNumberStyle: React.CSSProperties = {
  fontSize: 34,
  fontWeight: 800,
  color: "#0f172a",
  letterSpacing: "-0.03em",
};

const heroUnitStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: "#0f172a",
  letterSpacing: "-0.02em",
  marginLeft: 1,
};

const heroLabelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#b0b7c3",
  margin: 0,
};

const feesLinkStyle: React.CSSProperties = {
  display: "block",
  marginTop: 7,
  fontSize: 11,
  fontWeight: 500,
  color: "var(--brand-link-color)",
  textDecoration: "none",
};

/** Secondary stats — intentionally lightweight */
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

const toggleStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  padding: 0,
  color: "#b0b7c3",
  fontSize: 11,
  fontWeight: 400,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 4,
  fontFamily: "inherit",
  letterSpacing: "0.01em",
  transition: "color 0.15s ease",
};

const detailLabelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  color: "#b0b7c3",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  margin: "0 0 4px",
};

const detailValueStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: "#374151",
  margin: 0,
};

const disclaimerStyle: React.CSSProperties = {
  marginTop: 16,
  fontSize: 11,
  color: "#c4c9d4",
  lineHeight: 1.7,
  padding: "0 2px",
};
