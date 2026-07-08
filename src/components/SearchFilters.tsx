"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal, Grid2X2, Info } from "lucide-react";

export default function SearchFilters() {
  const [zipCode, setZipCode] = useState("32202");
  const [loanType, setLoanType] = useState("HELOC");
  const [propertyValue, setPropertyValue] = useState("515000");
  const [mortgageBalance, setMortgageBalance] = useState("270000");
  const [loanAmount, setLoanAmount] = useState("100000");

  const formatNumber = (val: string) => {
    const num = val.replace(/\D/g, "");
    return num ? Number(num).toLocaleString() : "";
  };

  const handleNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void
  ) => {
    setter(e.target.value.replace(/\D/g, ""));
  };

  return (
    <div
      style={{
        background: "var(--brand-filter-bg)",
        border: "1px solid var(--brand-row-border)",
        borderRadius: 12,
        padding: "20px 24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
      }}
    >
      <p
        style={{
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.05em",
          color: "var(--brand-text-primary)",
          margin: "0 0 14px 0",
          textTransform: "uppercase",
        }}
      >
        PERSONALIZE YOUR SEARCH
      </p>

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "flex-end",
          flexWrap: "wrap",
        }}
      >
        {/* ZIP Code */}
        <div style={{ flex: "0 0 160px" }}>
          <label style={labelStyle}>ZIP Code</label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.slice(0, 5))}
              maxLength={5}
              style={{ ...inputStyle, paddingRight: 40 }}
              placeholder="00000"
            />
            <button
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "#f3f4f6",
                border: "1px solid var(--brand-filter-border)",
                borderRadius: 6,
                padding: "3px 6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              title="Browse by location"
            >
              <Grid2X2 size={13} color="var(--brand-text-secondary)" />
            </button>
          </div>
        </div>

        {/* Loan type */}
        <div style={{ flex: "0 0 160px" }}>
          <label style={labelStyle}>
            Loan type
            <span
              className="info-tooltip"
              data-tooltip="Type of home equity loan product"
              style={{ marginLeft: 5, cursor: "help" }}
            >
              <Info size={13} color="var(--brand-primary)" />
            </span>
          </label>
          <div style={{ position: "relative" }}>
            <select
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              style={{
                ...inputStyle,
                appearance: "none",
                paddingRight: 36,
                cursor: "pointer",
              }}
            >
              <option value="HELOC">HELOC</option>
              <option value="Home Equity Loan">Home Equity Loan</option>
              <option value="Cash-Out Refinance">Cash-Out Refinance</option>
            </select>
            <ChevronDown
              size={16}
              color="var(--brand-primary)"
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Property value */}
        <div style={{ flex: "1 1 160px", minWidth: 140 }}>
          <label style={labelStyle}>Property value</label>
          <div style={{ position: "relative" }}>
            <span style={prefixStyle}>$</span>
            <input
              type="text"
              value={formatNumber(propertyValue)}
              onChange={(e) => handleNumberInput(e, setPropertyValue)}
              style={{ ...inputStyle, paddingLeft: 24 }}
              placeholder="0"
            />
          </div>
        </div>

        {/* Remaining mortgage balance */}
        <div style={{ flex: "1 1 190px", minWidth: 160 }}>
          <label style={labelStyle}>Remaining mortgage balance</label>
          <div style={{ position: "relative" }}>
            <span style={prefixStyle}>$</span>
            <input
              type="text"
              value={formatNumber(mortgageBalance)}
              onChange={(e) => handleNumberInput(e, setMortgageBalance)}
              style={{ ...inputStyle, paddingLeft: 24 }}
              placeholder="0"
            />
          </div>
        </div>

        {/* Loan amount */}
        <div style={{ flex: "1 1 140px", minWidth: 120 }}>
          <label style={labelStyle}>Loan amount</label>
          <div style={{ position: "relative" }}>
            <span style={prefixStyle}>$</span>
            <input
              type="text"
              value={formatNumber(loanAmount)}
              onChange={(e) => handleNumberInput(e, setLoanAmount)}
              style={{ ...inputStyle, paddingLeft: 24 }}
              placeholder="0"
            />
          </div>
        </div>

        {/* More filters */}
        <div style={{ flex: "0 0 auto" }}>
          <label style={{ ...labelStyle, visibility: "hidden" }}>_</label>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 18px",
              border: "2px solid var(--brand-primary)",
              borderRadius: 8,
              background: "transparent",
              color: "var(--brand-primary)",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              whiteSpace: "nowrap",
              height: 42,
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "var(--brand-primary-light)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "transparent";
            }}
          >
            <SlidersHorizontal size={15} />
            More filters
          </button>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  fontWeight: 600,
  fontSize: 13,
  color: "var(--brand-filter-label)",
  marginBottom: 6,
  whiteSpace: "nowrap",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 42,
  border: "1px solid var(--brand-filter-border)",
  borderRadius: 8,
  padding: "0 12px",
  fontSize: 14,
  color: "var(--brand-text-primary)",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const prefixStyle: React.CSSProperties = {
  position: "absolute",
  left: 10,
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: 14,
  color: "var(--brand-text-secondary)",
  pointerEvents: "none",
  zIndex: 1,
};
