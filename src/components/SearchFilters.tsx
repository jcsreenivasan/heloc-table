"use client";

import { useState } from "react";
import { ChevronDown, Grid2X2, Info } from "lucide-react";

export default function SearchFilters() {
  // Row 1
  const [zipCode, setZipCode] = useState("32202");
  const [loanType, setLoanType] = useState("HELOC");
  const [propertyValue, setPropertyValue] = useState("515000");
  const [mortgageBalance, setMortgageBalance] = useState("270000");
  const [loanAmount, setLoanAmount] = useState("100000");

  // Row 2 — new filters
  const [creditScore, setCreditScore] = useState("good");
  const [propertyUse, setPropertyUse] = useState("primary");
  const [propertyType, setPropertyType] = useState("single");

  const fmt = (val: string) => {
    const num = val.replace(/\D/g, "");
    return num ? Number(num).toLocaleString() : "";
  };
  const handleNum = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void
  ) => setter(e.target.value.replace(/\D/g, ""));

  return (
    <div>
      <p style={titleStyle}>PERSONALIZE YOUR SEARCH</p>

      {/* ── Row 1: loan details ── */}
      <div style={rowStyle}>
        {/* ZIP Code */}
        <div style={{ flex: "0 0 142px" }}>
          <label style={labelStyle}>ZIP Code</label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.slice(0, 5))}
              maxLength={5}
              placeholder="00000"
              style={{ ...inputStyle, paddingRight: 36 }}
            />
            <button style={iconBtnStyle} type="button" title="Browse location">
              <Grid2X2 size={11} color="#9ca3af" />
            </button>
          </div>
        </div>

        {/* Loan type */}
        <div style={{ flex: "0 0 140px" }}>
          <label style={labelStyle}>
            Loan type
            <span
              className="info-tooltip"
              data-tooltip="Type of home equity loan product"
              style={{ cursor: "help" }}
            >
              <Info size={11} color="var(--brand-primary)" />
            </span>
          </label>
          <SelectWrapper
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
          >
            <option value="HELOC">HELOC</option>
            <option value="Home Equity Loan">Home Equity Loan</option>
            <option value="Cash-Out Refinance">Cash-Out Refinance</option>
          </SelectWrapper>
        </div>

        {/* Property value */}
        <div style={{ flex: "1 1 140px", minWidth: 120 }}>
          <label style={labelStyle}>Property value</label>
          <NumberInput
            value={fmt(propertyValue)}
            onChange={(e) => handleNum(e, setPropertyValue)}
          />
        </div>

        {/* Remaining mortgage balance */}
        <div style={{ flex: "1 1 185px", minWidth: 150 }}>
          <label style={labelStyle}>Remaining mortgage balance</label>
          <NumberInput
            value={fmt(mortgageBalance)}
            onChange={(e) => handleNum(e, setMortgageBalance)}
          />
        </div>

        {/* Loan amount */}
        <div style={{ flex: "1 1 125px", minWidth: 100 }}>
          <label style={labelStyle}>Loan amount</label>
          <NumberInput
            value={fmt(loanAmount)}
            onChange={(e) => handleNum(e, setLoanAmount)}
          />
        </div>
      </div>

      {/* ── Row 2: borrower & property context ── */}
      <div style={{ ...rowStyle, marginTop: 10 }}>
        {/* Credit score */}
        <div style={{ flex: "1 1 180px" }}>
          <label style={labelStyle}>Credit score</label>
          <SelectWrapper
            value={creditScore}
            onChange={(e) => setCreditScore(e.target.value)}
          >
            <option value="exceptional">Exceptional (800+)</option>
            <option value="very-good">Very good (740–799)</option>
            <option value="good">Good (670–739)</option>
            <option value="fair">Fair (580–669)</option>
            <option value="poor">Poor (below 580)</option>
          </SelectWrapper>
        </div>

        {/* Property use */}
        <div style={{ flex: "1 1 180px" }}>
          <label style={labelStyle}>Property use</label>
          <SelectWrapper
            value={propertyUse}
            onChange={(e) => setPropertyUse(e.target.value)}
          >
            <option value="primary">Primary Residence</option>
            <option value="second">Second Home</option>
            <option value="investment">Investment Property</option>
          </SelectWrapper>
        </div>

        {/* Property type */}
        <div style={{ flex: "1 1 180px" }}>
          <label style={labelStyle}>Property type</label>
          <SelectWrapper
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="single">Single Family</option>
            <option value="condo">Condo / Co-op</option>
            <option value="townhouse">Townhouse</option>
            <option value="multi">Multi-Family</option>
            <option value="manufactured">Manufactured</option>
          </SelectWrapper>
        </div>

        {/* Spacer so row 2 doesn't stretch to full width */}
        <div style={{ flex: "2 1 0" }} />
      </div>
    </div>
  );
}

/* ── Shared sub-components ── */

function SelectWrapper({
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
        style={{
          ...inputStyle,
          appearance: "none",
          paddingRight: 30,
          cursor: "pointer",
        }}
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

function NumberInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div style={{ position: "relative" }}>
      <span style={prefixStyle}>$</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        style={{ ...inputStyle, paddingLeft: 20 }}
        placeholder="0"
      />
    </div>
  );
}

/* ── Style constants ── */

const titleStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: "0.07em",
  color: "#9ca3af",
  textTransform: "uppercase",
  marginBottom: 14,
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "flex-end",
  flexWrap: "wrap",
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  fontWeight: 600,
  fontSize: 12,
  color: "#374151",
  marginBottom: 5,
  whiteSpace: "nowrap",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 38,
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  padding: "0 11px",
  fontSize: 13,
  color: "#111827",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const prefixStyle: React.CSSProperties = {
  position: "absolute",
  left: 9,
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: 13,
  color: "#9ca3af",
  pointerEvents: "none",
  zIndex: 1,
};

const iconBtnStyle: React.CSSProperties = {
  position: "absolute",
  right: 7,
  top: "50%",
  transform: "translateY(-50%)",
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: 5,
  padding: "3px 5px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};
