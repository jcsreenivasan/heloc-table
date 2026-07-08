"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Info } from "lucide-react";
import { lenders, type Lender } from "@/data/lenders";

/* ---- Vertical divider between stat sections ---- */
function StatDivider() {
  return (
    <div
      style={{
        width: 1,
        alignSelf: "stretch",
        background: "var(--brand-stat-divider)",
        margin: "0 4px",
        flexShrink: 0,
      }}
    />
  );
}

/* ---- A single labeled stat block ---- */
function Stat({
  label,
  value,
  sub,
  tooltip,
  minWidth,
}: {
  label: string;
  value: string;
  sub?: React.ReactNode;
  tooltip?: string;
  minWidth?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "18px 24px",
        minWidth: minWidth ?? 110,
        flex: "1 1 auto",
      }}
    >
      {/* Label row */}
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "var(--brand-text-secondary)",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {label}
        {tooltip && (
          <span
            className="info-tooltip"
            data-tooltip={tooltip}
            style={{ cursor: "help" }}
          >
            <Info size={11} color="var(--brand-text-muted)" />
          </span>
        )}
      </span>

      {/* Value */}
      <span
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: "var(--brand-text-primary)",
          letterSpacing: "-0.025em",
          lineHeight: 1.15,
        }}
      >
        {value}
      </span>

      {/* Sub (fees link or extra text) */}
      {sub && (
        <span style={{ fontSize: 12, marginTop: 1 }}>{sub}</span>
      )}
    </div>
  );
}

/* ---- Expandable details grid ---- */
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
          gap: "14px 28px",
        }}
      >
        {items.map((item) => (
          <div key={item.label}>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--brand-text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 3,
              }}
            >
              {item.label}
            </p>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--brand-text-primary)",
              }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Single rate card ---- */
function RateCard({ lender }: { lender: Lender }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        borderRadius: 12,
        border: `1px solid var(--brand-card-border)`,
        background: "#ffffff",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* Main horizontal card row */}
      <div
        className="rate-card"
        style={{
          display: "flex",
          alignItems: "stretch",
          borderRadius: expanded ? "12px 12px 0 0" : 12,
        }}
      >
        {/* Rate */}
        <Stat
          label="Rate"
          value={`${lender.rate}%`}
          minWidth={130}
          sub={
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                color: "var(--brand-link-color)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Fees &amp; conditions
            </a>
          }
        />

        <StatDivider />

        {/* APR */}
        <Stat
          label="APR"
          tooltip="Annual Percentage Rate – includes fees and costs"
          value={`${lender.apr}%`}
          minWidth={110}
        />

        <StatDivider />

        {/* Loan term */}
        <Stat
          label="Loan term"
          value={lender.loanTerm}
          minWidth={100}
        />

        <StatDivider />

        {/* Loan amount */}
        <Stat
          label="Loan amount"
          tooltip="Min and max available loan amounts"
          value={`${lender.loanAmountMin}–${lender.loanAmountMax}`}
          minWidth={140}
          sub={
            <button
              onClick={() => setExpanded((v) => !v)}
              style={{
                background: "none",
                border: "none",
                color: "var(--brand-link-color)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 3,
                fontFamily: "inherit",
              }}
            >
              {expanded ? "Hide details" : "Show more details"}
              {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>
          }
        />

        {/* CTA — hidden by default, slides in on hover */}
        <div
          className="cta-cell"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 24px 0 12px",
            flexShrink: 0,
          }}
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "var(--brand-cta-bg)",
              color: "var(--brand-cta-text)",
              borderRadius: "var(--brand-cta-radius)",
              fontWeight: 700,
              fontSize: 14,
              padding: "11px 22px",
              textDecoration: "none",
              transition: "background 0.15s ease, transform 0.12s ease",
              whiteSpace: "nowrap",
              fontFamily: "inherit",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--brand-cta-hover-bg)";
              el.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--brand-cta-bg)";
              el.style.transform = "scale(1)";
            }}
          >
            Next
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
        </div>
      </div>

      {/* Expandable details */}
      <div
        style={{
          borderTop: expanded
            ? "1px solid var(--brand-stat-divider)"
            : "none",
          background: "#f8fafc",
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
      {/* Cards list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {lenders.map((lender) => (
          <RateCard key={lender.id} lender={lender} />
        ))}
      </div>

      {/* Disclaimer */}
      <p
        style={{
          marginTop: 16,
          fontSize: 11,
          color: "var(--brand-text-muted)",
          lineHeight: 1.6,
          padding: "0 4px",
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
