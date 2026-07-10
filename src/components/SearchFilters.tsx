"use client";

import { useState } from "react";
import { ChevronDown, Grid2X2 } from "lucide-react";

interface Props {
  onSeeRates?: () => void;
}

export default function SearchFilters({ onSeeRates }: Props) {
  const [zipCode, setZipCode] = useState("32202");
  const [loanType, setLoanType] = useState("HELOC");
  const [propertyValue, setPropertyValue] = useState("515000");
  const [mortgageBalance, setMortgageBalance] = useState("270000");
  const [loanAmount, setLoanAmount] = useState("100000");
  const [creditScore, setCreditScore] = useState("good");
  const [propertyUse, setPropertyUse] = useState("primary");
  const [propertyType, setPropertyType] = useState("single");

  const fmt = (val: string) => {
    const n = val.replace(/\D/g, "");
    return n ? Number(n).toLocaleString() : "";
  };
  const handleNum = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: (v: string) => void
  ) => set(e.target.value.replace(/\D/g, ""));

  return (
    <div>
      <p style={titleStyle}>Personalize your search</p>

      <div style={gridStyle}>

        {/* 1 — ZIP Code */}
        <FloatingField label="ZIP Code">
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.slice(0, 5))}
              maxLength={5}
              placeholder="00000"
              style={flatInput}
            />
            <Grid2X2 size={13} color="#9ca3af" style={{ flexShrink: 0 }} />
          </div>
        </FloatingField>

        {/* 2 — Loan type */}
        <FloatingField label="Loan type">
          <FlatSelect value={loanType} onChange={(e) => setLoanType(e.target.value)}>
            <option value="HELOC">HELOC</option>
            <option value="Home Equity Loan">Home Equity Loan</option>
            <option value="Cash-Out Refinance">Cash-Out Refinance</option>
          </FlatSelect>
        </FloatingField>

        {/* 3 — Property value */}
        <FloatingField label="Property value">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={prefixStyle}>$</span>
            <input
              type="text"
              value={fmt(propertyValue)}
              onChange={(e) => handleNum(e, setPropertyValue)}
              placeholder="0"
              style={flatInput}
            />
          </div>
        </FloatingField>

        {/* 4 — Remaining mortgage balance */}
        <FloatingField label="Mortgage balance">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={prefixStyle}>$</span>
            <input
              type="text"
              value={fmt(mortgageBalance)}
              onChange={(e) => handleNum(e, setMortgageBalance)}
              placeholder="0"
              style={flatInput}
            />
          </div>
        </FloatingField>

        {/* 5 — HELOC amount */}
        <FloatingField label="HELOC amount">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={prefixStyle}>$</span>
            <input
              type="text"
              value={fmt(loanAmount)}
              onChange={(e) => handleNum(e, setLoanAmount)}
              placeholder="0"
              style={flatInput}
            />
          </div>
        </FloatingField>

        {/* 6 — Credit score */}
        <FloatingField label="Credit score">
          <FlatSelect value={creditScore} onChange={(e) => setCreditScore(e.target.value)}>
            <option value="exceptional">Exceptional (800+)</option>
            <option value="very-good">Very good (740–799)</option>
            <option value="good">Good (670–739)</option>
            <option value="fair">Fair (580–669)</option>
            <option value="poor">Poor (below 580)</option>
          </FlatSelect>
        </FloatingField>

        {/* 7 — Property use */}
        <FloatingField label="Property use">
          <FlatSelect value={propertyUse} onChange={(e) => setPropertyUse(e.target.value)}>
            <option value="primary">Primary Residence</option>
            <option value="second">Second Home</option>
            <option value="investment">Investment Property</option>
          </FlatSelect>
        </FloatingField>

        {/* 8 — Property type */}
        <FloatingField label="Property type">
          <FlatSelect value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="single">Single Family</option>
            <option value="condo">Condo / Co-op</option>
            <option value="townhouse">Townhouse</option>
            <option value="multi">Multi-Family</option>
            <option value="manufactured">Manufactured</option>
          </FlatSelect>
        </FloatingField>

        {/* 9 — See Rates button */}
        <div style={{ alignSelf: "stretch", display: "flex", alignItems: "flex-end" }}>
          <button
            type="button"
            onClick={onSeeRates}
            style={seeRatesStyle}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "var(--brand-primary-dark)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "var(--brand-primary)")
            }
          >
            See Rates
          </button>
        </div>

      </div>
    </div>
  );
}

/* ── Sub-components ── */

function FloatingField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="floating-field"
      style={{
        position: "relative",
        border: "1px solid #d1d5db",
        borderRadius: 6,
        padding: "13px 11px 8px",
        transition: "border-color 0.15s ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: -8,
          left: 10,
          fontSize: 11,
          color: "#6b7280",
          background: "#fff",
          padding: "0 3px",
          lineHeight: 1,
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function FlatSelect({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
      <select
        value={value}
        onChange={onChange}
        style={{
          ...flatInput,
          appearance: "none",
          paddingRight: 18,
          cursor: "pointer",
        }}
      >
        {children}
      </select>
      <ChevronDown
        size={13}
        color="#9ca3af"
        style={{
          position: "absolute",
          right: 0,
          pointerEvents: "none",
          flexShrink: 0,
        }}
      />
    </div>
  );
}

/* ── Styles ── */

const titleStyle: React.CSSProperties = {
  fontWeight: 500,
  fontSize: 13,
  color: "#6b7280",
  marginBottom: 20,
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "20px 12px",
};

const flatInput: React.CSSProperties = {
  width: "100%",
  border: "none",
  outline: "none",
  fontSize: 14,
  color: "#111827",
  background: "transparent",
  fontFamily: "inherit",
  padding: 0,
  lineHeight: "22px",
};

const prefixStyle: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: 14,
  marginRight: 2,
  flexShrink: 0,
  lineHeight: "22px",
};

const seeRatesStyle: React.CSSProperties = {
  width: "100%",
  height: 48,
  background: "var(--brand-primary)",
  color: "#ffffff",
  border: "none",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "inherit",
  letterSpacing: "0.02em",
  transition: "background 0.15s ease",
};
