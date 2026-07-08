"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal, Grid2X2, Info } from "lucide-react";

export default function SearchFilters() {
  const [zipCode, setZipCode] = useState("32202");
  const [loanType, setLoanType] = useState("HELOC");
  const [propertyValue, setPropertyValue] = useState("515000");
  const [mortgageBalance, setMortgageBalance] = useState("270000");
  const [loanAmount, setLoanAmount] = useState("100000");

  const fmt = (val: string) => {
    const num = val.replace(/\D/g, "");
    return num ? Number(num).toLocaleString() : "";
  };

  const handleNum = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void
  ) => setter(e.target.value.replace(/\D/g, ""));

  return (
    /* No card wrapper — parent page container provides the card shell */
    <div>
      <p style={titleStyle}>PERSONALIZE YOUR SEARCH</p>

      <div style={rowStyle}>
        {/* ZIP Code */}
        <div style={{ flex: "0 0 150px" }}>
          <label style={labelStyle}>ZIP Code</label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.slice(0, 5))}
              maxLength={5}
              style={{ ...inputStyle, paddingRight: 38 }}
              placeholder="00000"
            />
            <button
              style={iconBtnStyle}
              title="Browse by location"
              type="button"
            >
              <Grid2X2 size={12} color="var(--brand-text-secondary)" />
            </button>
          </div>
        </div>

        {/* Loan type */}
        <div style={{ flex: "0 0 148px" }}>
          <label style={labelStyle}>
            Loan type&nbsp;
            <span
              className="info-tooltip"
              data-tooltip="Type of home equity loan product"
              style={{ cursor: "help" }}
            >
              <Info size={12} color="var(--brand-primary)" />
            </span>
          </label>
          <div style={{ position: "relative" }}>
            <select
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              style={{ ...inputStyle, appearance: "none", paddingRight: 32, cursor: "pointer" }}
            >
              <option value="HELOC">HELOC</option>
              <option value="Home Equity Loan">Home Equity Loan</option>
              <option value="Cash-Out Refinance">Cash-Out Refinance</option>
            </select>
            <ChevronDown
              size={15}
              color="var(--brand-primary)"
              style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            />
          </div>
        </div>

        {/* Property value */}
        <div style={{ flex: "1 1 150px", minWidth: 130 }}>
          <label style={labelStyle}>Property value</label>
          <div style={{ position: "relative" }}>
            <span style={prefixStyle}>$</span>
            <input
              type="text"
              value={fmt(propertyValue)}
              onChange={(e) => handleNum(e, setPropertyValue)}
              style={{ ...inputStyle, paddingLeft: 22 }}
              placeholder="0"
            />
          </div>
        </div>

        {/* Remaining mortgage balance */}
        <div style={{ flex: "1 1 190px", minWidth: 155 }}>
          <label style={labelStyle}>Remaining mortgage balance</label>
          <div style={{ position: "relative" }}>
            <span style={prefixStyle}>$</span>
            <input
              type="text"
              value={fmt(mortgageBalance)}
              onChange={(e) => handleNum(e, setMortgageBalance)}
              style={{ ...inputStyle, paddingLeft: 22 }}
              placeholder="0"
            />
          </div>
        </div>

        {/* Loan amount */}
        <div style={{ flex: "1 1 130px", minWidth: 110 }}>
          <label style={labelStyle}>Loan amount</label>
          <div style={{ position: "relative" }}>
            <span style={prefixStyle}>$</span>
            <input
              type="text"
              value={fmt(loanAmount)}
              onChange={(e) => handleNum(e, setLoanAmount)}
              style={{ ...inputStyle, paddingLeft: 22 }}
              placeholder="0"
            />
          </div>
        </div>

        {/* More filters */}
        <div style={{ flex: "0 0 auto", alignSelf: "flex-end" }}>
          <button
            type="button"
            style={moreFiltersStyle}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "var(--brand-primary-light)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "transparent")
            }
          >
            <SlidersHorizontal size={14} />
            More filters
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---- Shared style objects ---- */
const titleStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: "0.06em",
  color: "var(--brand-text-primary)",
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
  fontWeight: 600,
  fontSize: 12,
  color: "var(--brand-filter-label)",
  marginBottom: 5,
  whiteSpace: "nowrap",
  gap: 3,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 40,
  border: "1px solid var(--brand-filter-border)",
  borderRadius: 8,
  padding: "0 11px",
  fontSize: 14,
  color: "var(--brand-text-primary)",
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
  fontSize: 14,
  color: "var(--brand-text-secondary)",
  pointerEvents: "none",
  zIndex: 1,
};

const iconBtnStyle: React.CSSProperties = {
  position: "absolute",
  right: 7,
  top: "50%",
  transform: "translateY(-50%)",
  background: "#f3f4f6",
  border: "1px solid var(--brand-filter-border)",
  borderRadius: 5,
  padding: "3px 5px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};

const moreFiltersStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  height: 40,
  padding: "0 16px",
  border: "2px solid var(--brand-primary)",
  borderRadius: 8,
  background: "transparent",
  color: "var(--brand-primary)",
  fontWeight: 600,
  fontSize: 13,
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: "background 0.15s ease",
  fontFamily: "inherit",
};
