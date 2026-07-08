"use client";

import { useState } from "react";
import { Info, Star, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { lenders, type Lender } from "@/data/lenders";

/* ---- Column header with optional tooltip ---- */
function ColHeader({
  label,
  tooltip,
}: {
  label: string;
  tooltip?: string;
}) {
  return (
    <th
      style={{
        padding: "14px 16px",
        fontWeight: 600,
        fontSize: 13,
        color: "var(--brand-header-text)",
        textAlign: "left",
        whiteSpace: "nowrap",
        background: "transparent",
        border: "none",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
        {label}
        {tooltip && (
          <span
            className="info-tooltip"
            data-tooltip={tooltip}
            style={{ cursor: "help", opacity: 0.75 }}
          >
            <Info size={13} color="var(--brand-header-text)" />
          </span>
        )}
      </span>
    </th>
  );
}

/* ---- Lender logo placeholder ---- */
function LenderLogo({ lender }: { lender: Lender }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 56,
        height: 40,
        borderRadius: 8,
        background: lender.logoColor,
        color: "#fff",
        fontWeight: 800,
        fontSize: lender.logoInitials.length > 2 ? 11 : 15,
        letterSpacing: "0.02em",
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      {lender.logoInitials}
    </div>
  );
}

/* ---- Score stars display ---- */
function ScoreDisplay({ score }: { score: number }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <span
        style={{
          fontWeight: 700,
          fontSize: 16,
          color: "var(--brand-text-primary)",
        }}
      >
        {score.toFixed(1)}
        <span
          style={{
            fontWeight: 400,
            fontSize: 13,
            color: "var(--brand-text-secondary)",
          }}
        >
          /5
        </span>
      </span>
      <Star
        size={15}
        fill="var(--brand-star-color)"
        color="var(--brand-star-color)"
      />
    </span>
  );
}

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
    <tr
      style={{
        borderBottom: open
          ? `1px solid var(--brand-row-border)`
          : "none",
      }}
    >
      <td
        colSpan={7}
        style={{
          padding: 0,
          background: "#f8fafc",
        }}
      >
        <div
          className={`details-panel${open ? " expanded" : ""}`}
          style={{ padding: open ? "16px 24px" : "0 24px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px 24px",
            }}
          >
            {items.map((item) => (
              <div key={item.label}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--brand-text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: 2,
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    margin: 0,
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
      </td>
    </tr>
  );
}

/* ---- Single lender row ---- */
function RateRow({ lender }: { lender: Lender }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        className="rate-row"
        style={{
          borderBottom: expanded
            ? "none"
            : `1px solid var(--brand-row-border)`,
          cursor: "default",
        }}
      >
        {/* Lender */}
        <td style={{ padding: "16px 16px 16px 20px", verticalAlign: "middle" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span
              style={{
                fontSize: 12,
                color: "var(--brand-text-secondary)",
                fontWeight: 500,
              }}
            >
              {lender.productName}
            </span>
            <LenderLogo lender={lender} />
            <span
              style={{
                fontSize: 11,
                color: "var(--brand-text-muted)",
              }}
            >
              NMLS #{lender.nmls}
            </span>
          </div>
        </td>

        {/* Rate */}
        <td style={{ padding: "16px", verticalAlign: "middle" }}>
          <div>
            <p
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: 20,
                color: "var(--brand-text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              {lender.rate}%
            </p>
            <a
              href="#"
              style={{
                color: "var(--brand-link-color)",
                fontSize: 12,
                textDecoration: "none",
                fontWeight: 500,
              }}
              onClick={(e) => e.preventDefault()}
            >
              Fees &amp; conditions
            </a>
          </div>
        </td>

        {/* APR */}
        <td style={{ padding: "16px", verticalAlign: "middle" }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: 20,
              color: "var(--brand-text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            {lender.apr}%
          </span>
        </td>

        {/* Loan term */}
        <td style={{ padding: "16px", verticalAlign: "middle" }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: 16,
              color: "var(--brand-text-primary)",
            }}
          >
            {lender.loanTerm}
          </span>
        </td>

        {/* Loan amount */}
        <td style={{ padding: "16px", verticalAlign: "middle" }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: 16,
              color: "var(--brand-text-primary)",
            }}
          >
            {lender.loanAmountMin}–{lender.loanAmountMax}
          </span>
        </td>

        {/* Score */}
        <td style={{ padding: "16px", verticalAlign: "middle" }}>
          <ScoreDisplay score={lender.score} />
        </td>

        {/* CTA — hidden by default, slides in on row hover */}
        <td
          style={{
            padding: "16px 20px 16px 12px",
            verticalAlign: "middle",
            minWidth: 160,
          }}
        >
          <div
            className="cta-cell"
            style={{ display: "flex", flexDirection: "column", gap: 8 }}
          >
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                background: "var(--brand-cta-bg)",
                color: "var(--brand-cta-text)",
                borderRadius: "var(--brand-cta-radius)",
                fontWeight: "var(--brand-cta-font-weight)" as React.CSSProperties["fontWeight"],
                fontSize: 15,
                padding: "10px 20px",
                textDecoration: "none",
                transition: "background 0.15s ease, transform 0.12s ease",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--brand-cta-hover-bg)";
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--brand-cta-bg)";
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "scale(1)";
              }}
            >
              Next
              <ArrowRight size={15} strokeWidth={2.5} />
            </a>

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
                gap: 4,
                textDecoration: "none",
              }}
            >
              {expanded ? "Hide details" : "Show more details"}
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>
        </td>
      </tr>

      <DetailsPanel lender={lender} open={expanded} />
    </>
  );
}

/* ---- Main table component ---- */
export default function RateTable() {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        border: "1px solid var(--brand-row-border)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "var(--brand-header-bg)",
            }}
          >
            <ColHeader label="Lender" />
            <ColHeader label="Rate" />
            <ColHeader
              label="APR"
              tooltip="Annual Percentage Rate – includes fees and costs over the life of the loan"
            />
            <ColHeader label="Loan term" />
            <ColHeader
              label="Loan amount"
              tooltip="Minimum and maximum available loan amounts"
            />
            <ColHeader
              label="Score"
              tooltip="Our editorial score based on rates, fees, transparency, and customer reviews"
            />
            {/* Empty CTA column header */}
            <th style={{ padding: "14px 20px 14px 12px", background: "transparent", border: "none", minWidth: 160 }} />
          </tr>
        </thead>
        <tbody>
          {lenders.map((lender) => (
            <RateRow key={lender.id} lender={lender} />
          ))}
        </tbody>
      </table>

      {/* Footer note */}
      <div
        style={{
          padding: "14px 20px",
          borderTop: `1px solid var(--brand-row-border)`,
          background: "#f9fafb",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 11,
            color: "var(--brand-text-muted)",
            lineHeight: 1.5,
          }}
        >
          Rates shown are based on the personalized search criteria above. APR shown is for a $100,000 HELOC. Your actual rate may differ based on credit profile, loan-to-value ratio, and lender criteria. All rates as of {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
        </p>
      </div>
    </div>
  );
}
