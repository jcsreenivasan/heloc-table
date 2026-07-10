"use client";

import { useState } from "react";
import { ChevronDown, Grid2X2, Info } from "lucide-react";

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
      {/* Title — black */}
      <p style={titleStyle}>PERSONALIZE YOUR SEARCH</p>

      {/* 5-column grid — all fields equal 1fr width */}
      <div style={gridStyle}>

        {/* 1 — ZIP Code */}
        <div>
          <label style={labelStyle}>ZIP Code</label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.slice(0, 5))}
              maxLength={5}
              placeholder="00000"
              style={{ ...inputBase, paddingRight: 36 }}
            />
            <button style={iconBtnStyle} type="button">
              <Grid2X2 size={12} color="#9ca3af" />
            </button>
          </div>
        </div>

        {/* 2 — Loan type */}
        <div>
          <label style={labelStyle}>
            Loan type
            <span
              className="info-tooltip"
              data-tooltip="Type of home equity loan"
              style={{ cursor: "help" }}
            >
              <Info size={11} color="var(--brand-primary)" />
            </span>
          </label>
          <SelectField value={loanType} onChange={(e) => setLoanType(e.target.value)}>
            <option value="HELOC">HELOC</option>
            <option value="Home Equity Loan">Home Equity Loan</option>
            <option value="Cash-Out Refinance">Cash-Out Refinance</option>
          </SelectField>
        </div>

        {/* 3 — Property value */}
        <div>
          <label style={labelStyle}>Property value</label>
          <MoneyField value={fmt(propertyValue)} onChange={(e) => handleNum(e, setPropertyValue)} />
        </div>

        {/* 4 — Remaining mortgage balance */}
        <div>
          <label style={labelStyle}>Remaining mortgage balance</label>
          <MoneyField value={fmt(mortgageBalance)} onChange={(e) => handleNum(e, setMortgageBalance)} />
        </div>

        {/* 5 — HELOC amount */}
        <div>
          <label style={labelStyle}>HELOC amount</label>
          <MoneyField value={fmt(loanAmount)} onChange={(e) => handleNum(e, setLoanAmount)} />
        </div>

        {/* 6 — Credit score */}
        <div>
          <label style={labelStyle}>Credit score</label>
          <SelectField value={creditScore} onChange={(e) => setCreditScore(e.target.value)}>
            <option value="exceptional">Exceptional (800+)</option>
            <option value="very-good">Very good (740–799)</option>
            <option value="good">Good (670–739)</option>
            <option value="fair">Fair (580–669)</option>
            <option value="poor">Poor (below 580)</option>
          </SelectField>
        </div>

        {/* 7 — Property use */}
        <div>
          <label style={labelStyle}>Property use</label>
          <SelectField value={propertyUse} onChange={(e) => setPropertyUse(e.target.value)}>
            <option value="primary">Primary Residence</option>
            <option value="second">Second Home</option>
            <option value="investment">Investment Property</option>
          </SelectField>
        </div>

        {/* 8 — Property type */}
        <div>
          <label style={labelStyle}>Property type</label>
          <SelectField value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="single">Single Family</option>
            <option value="condo">Condo / Co-op</option>
            <option value="townhouse">Townhouse</option>
            <option value="multi">Multi-Family</option>
            <option value="manufactured">Manufactured</option>
          </SelectField>
        </div>

        {/* 9 — See Rates button (aligns to bottom of cell, same height as inputs) */}
        <div style={{ alignSelf: "end" }}>
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

function SelectField({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={onChange}
        style={{ ...inputBase, appearance: "none", paddingRight: 28, cursor: "pointer" }}
      >
        {children}
      </select>
      <ChevronDown
        size={14}
        color="#9ca3af"
        style={{
          position: "absolute",
          right: 9,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function MoneyField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div style={{ position: "relative" }}>
      <span
        style={{
          position: "absolute",
          left: 10,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 13,
          color: "#9ca3af",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        $
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="0"
        style={{ ...inputBase, paddingLeft: 20 }}
      />
    </div>
  );
}

/* ── Styles ── */

const titleStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#111827",   /* black */
  marginBottom: 16,
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "14px 12px",
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  fontWeight: 600,
  fontSize: 12,
  color: "#374151",
  marginBottom: 6,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const inputBase: React.CSSProperties = {
  width: "100%",
  height: 40,
  border: "1px solid var(--brand-filter-border)",
  borderRadius: 8,
  padding: "0 11px",
  fontSize: 13,
  color: "#111827",
  background: "#fff",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const iconBtnStyle: React.CSSProperties = {
  position: "absolute",
  right: 7,
  top: "50%",
  transform: "translateY(-50%)",
  background: "#f9fafb",
  border: "1px solid var(--brand-filter-border)",
  borderRadius: 5,
  padding: "3px 5px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};

const seeRatesStyle: React.CSSProperties = {
  width: "100%",
  height: 40,
  background: "var(--brand-primary)",
  color: "#ffffff",
  border: "none",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "inherit",
  letterSpacing: "0.02em",
  transition: "background 0.15s ease",
};
