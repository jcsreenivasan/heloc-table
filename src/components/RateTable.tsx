"use client";

import { useState, useMemo, Fragment, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, Home, DollarSign, X, Info } from "lucide-react";
import { lenders, type Lender } from "@/data/lenders";

const LOAN_TERMS = ["5 Year", "10 Year", "15 Year", "20 Year", "30 Year"];

function parseMaxAmount(s: string): number {
  const n = parseFloat(s.replace(/[^0-9.]/g, ""));
  return s.toUpperCase().includes("K") ? n * 1_000 : n * 1_000_000;
}

/* ── Google colour icon (used in GetStartedModal) ── */
function GoogleColorIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

/* ── Fees & conditions modal ── */
function FeesModal({ lender, onClose }: { lender: Lender; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const { details } = lender;
  const fmt = (v: string) => (v === "$0" || v === "" ? "–" : v);

  const feeRows = [
    { label: "Origination fee",  value: fmt(details.originationFee) },
    { label: "Annual fee",       value: fmt(details.annualFee) },
    { label: "Application fee",  value: fmt(details.applicationFee) },
    { label: "Membership fee",   value: "–" },
    { label: "Underwriting fee", value: fmt(details.underwritingFee) },
    { label: "Other fees",       value: "–" },
  ];

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 200 }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(560px, 94vw)", maxHeight: "88vh", background: "#fff", borderRadius: 16, zIndex: 201, display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,0.22)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderBottom: "1px solid #e5e7eb", flexShrink: 0 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>Fees &amp; conditions</h2>
          <button onClick={onClose} style={{ background: "#f3f4f6", border: "none", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "background 0.15s ease" }} onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#e5e7eb")} onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#f3f4f6")}>
            <X size={16} color="#374151" strokeWidth={2.5} />
          </button>
        </div>
        <div style={{ overflow: "auto", padding: "24px 28px" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 12, marginTop: 0 }}>Finance charges</h3>
          {feeRows.map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f1f5f9", fontSize: 13, color: "#374151" }}>
              <span>{row.label}</span>
              <span style={{ fontWeight: 500 }}>{row.value}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 20px", fontSize: 14, fontWeight: 700, color: "#111827" }}>
            <span>Total upfront costs</span>
            <span>{details.totalUpfrontCosts}</span>
          </div>
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "16px 20px" }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Fees &amp; conditions</p>
            <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.75 }}>
              Offers may vary; all loan requests are subject to eligibility requirements, application review, loan amount, loan term, income verification, and lender approval. Product terms are subject to change at any time. Offers are a line of credit. Loans are not available to residents of all states and available loan terms/fees may vary by state where offered. Line amounts between {lender.loanAmountMin} and {lender.loanAmountMax}, and assigned based on credit score, debt-to-income ratio, and combined loan-to-value ratio. Minimum {details.minCreditScore} credit score applies. Fixed rate APRs are assigned based on underwriting requirements. Lowest APRs require a FICO score equal to or greater than 700, CLTV equal to or less than 50%, and DTI equal to or less than 15%. Rate discounts are removed if these parameters are not met. Property must be owner-occupied. Maximum combined loan-to-value is {details.maxLTV}. Prepayment penalty: {details.prepaymentPenalty}. All terms are subject to credit approval. Rates and terms are subject to change without notice.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Get Started modal ── */
function GetStartedModal({ lender, onClose }: { lender: Lender; onClose: () => void }) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const reviewSources = [
    { label: "Zillow",    score: "5.0",  reviews: "4,333",  bg: "#006AFF", letter: "Z",  round: false },
    { label: "Bankrate",  score: "4.86", reviews: "16,342", bg: "#003087", letter: "B",  round: false },
    { label: "Yelp",      score: "4.7",  reviews: "56",     bg: "#FF1A1A", letter: "y",  round: true  },
    { label: "Google",    score: "4.3",  reviews: "2,580",  bg: null,      letter: "G",  round: false },
  ];

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200 }} />

      {/* Modal */}
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(860px, 94vw)", maxHeight: "90vh", background: "#fff", borderRadius: 16, zIndex: 201, display: "flex", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.24)" }}>

        {/* ── Left panel ── */}
        <div style={{ width: "42%", background: "#F0EDE8", padding: "36px 32px", display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>

          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: "0 0 6px", lineHeight: 1.3 }}>
            People ♥ FiveStar Home Loans
          </h2>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>
            Excellence proven by our outstanding reviews.
          </p>

          {/* Review scores */}
          <div style={{ background: "#fff", borderRadius: 10, padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: 28 }}>
            {reviewSources.map((r) => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {r.bg === null ? (
                  <GoogleColorIcon size={26} />
                ) : (
                  <div style={{ width: 26, height: 26, background: r.bg, borderRadius: r.round ? "50%" : 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>{r.letter}</span>
                  </div>
                )}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <span style={{ color: "#f59e0b", fontSize: 13 }}>★</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{r.score}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{r.reviews} reviews</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div style={{ fontSize: 52, color: "#C4B5A8", lineHeight: 0.8, marginBottom: 10, fontFamily: "Georgia, serif" }}>"</div>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.65, marginBottom: 22, flex: 1 }}>
            Very knowledgeable, friendly and was always available for my needs/questions.
            Highly recommend. Definitely would use again and do plan to when I need to refinance.
          </p>

          {/* Reviewer */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
            <div>
              <div style={{ color: "#f59e0b", fontSize: 14, marginBottom: 4, letterSpacing: 2 }}>★★★★★</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 2 }}>Rachel Stevenson</p>
              <p style={{ fontSize: 12, color: "#6b7280" }}>FiveStar Home Loans customer</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "flex-end", marginBottom: 3 }}>
                <div style={{ width: 18, height: 18, background: "#006AFF", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontSize: 10, fontWeight: 800 }}>Z</span>
                </div>
                <span style={{ fontSize: 12, color: "#374151" }}>
                  Posted on <span style={{ color: "#006AFF", fontWeight: 600 }}>Zillow</span>
                </span>
              </div>
              <p style={{ fontSize: 11, color: "#9ca3af" }}>16 days ago</p>
            </div>
          </div>

          {/* Pagination */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>Page 1 of 3</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? "var(--brand-primary)" : "#D1D5DB" }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div style={{ flex: 1, padding: "36px 36px", overflowY: "auto", position: "relative" }}>

          {/* Close button */}
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "#f3f4f6", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.15s ease" }} onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#e5e7eb")} onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#f3f4f6")}>
            <X size={15} color="#374151" strokeWidth={2.5} />
          </button>

          <h2 style={{ fontSize: 26, fontWeight: 700, color: "#111827", margin: "0 0 8px", lineHeight: 1.25 }}>
            You selected a great rate.
          </h2>
          <p style={{ fontSize: 14, color: "#374151", marginBottom: 28, lineHeight: 1.55 }}>
            Now let us help you get the mortgage ball rolling.
          </p>

          {/* Selected rate box */}
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
              Selected Rate
            </p>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
              Rate / APR: {lender.rate}% / {lender.apr}%
            </p>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>
              {lender.loanTerm}&nbsp;&nbsp;·&nbsp;&nbsp;{lender.loanAmountMin}–{lender.loanAmountMax}&nbsp;&nbsp;·&nbsp;&nbsp;P&amp;I {lender.monthlyPayment}
            </p>
          </div>

          {/* Email + Continue */}
          <div style={{ display: "flex", border: "1px solid #d1d5db", borderRadius: 8, overflow: "hidden", marginBottom: 14 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ flex: 1, border: "none", outline: "none", padding: "13px 14px", fontSize: 14, color: "#111827", fontFamily: "inherit", background: "transparent" }}
            />
            <button type="button" style={{ padding: "13px 20px", background: "#fff", border: "none", borderLeft: "1px solid #d1d5db", fontSize: 14, fontWeight: 600, color: "#374151", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "background 0.15s ease" }} onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#f9fafb")} onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#fff")}>
              Continue
            </button>
          </div>

          {/* "or" divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
            <span style={{ fontSize: 13, color: "#9ca3af" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          </div>

          {/* Google button */}
          <button type="button" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "13px 20px", background: "#4A72D5", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s ease" }} onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#3B63C6")} onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#4A72D5")}>
            <GoogleColorIcon size={20} />
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
}

/* ── Payment info tooltip ── */
const PAYMENT_TOOLTIP =
  "HELOC: Interest only — your payment covers the cost of borrowing but does not reduce your balance during the draw period.\n\nHELOAN: Principal and interest — your fixed payment reduces your loan balance every month until it is paid in full.";

function PaymentInfoIcon() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      style={{ position: "relative", display: "inline-flex", alignItems: "center", marginLeft: 5, verticalAlign: "middle" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Info size={12} color="#9ca3af" strokeWidth={2} style={{ cursor: "default" }} />
      {visible && (
        <div style={{ position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: "#1e293b", color: "#fff", borderRadius: 8, padding: "12px 14px", fontSize: 12, lineHeight: 1.65, whiteSpace: "pre-line", width: 280, zIndex: 50, pointerEvents: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.22)" }}>
          {PAYMENT_TOOLTIP}
          {/* Arrow */}
          <div style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid #1e293b" }} />
        </div>
      )}
    </div>
  );
}

/* ── Promotional banner ── */
function PersonalizeRateBanner({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", border: "1px solid #e5e7eb", borderRadius: 8, background: "#f9fafb", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 52, height: 52, borderRadius: 12, background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
          <Home size={26} color="var(--brand-primary)" strokeWidth={1.8} />
          <div style={{ position: "absolute", bottom: 7, right: 6, background: "var(--brand-primary)", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <DollarSign size={10} color="#fff" strokeWidth={2.5} />
          </div>
        </div>
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 3, lineHeight: 1.3 }}>Ready to start your application?</p>
          <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.4 }}>Get customized rates tailored to your needs.</p>
        </div>
      </div>
      <button type="button" onClick={onGetStarted} style={{ background: "var(--brand-primary)", color: "#ffffff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0, transition: "background 0.15s ease" }} onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--brand-primary-dark)")} onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--brand-primary)")}>
        Get started
      </button>
    </div>
  );
}

/* ── Individual rate card ── */
function RateCard({ lender, index, onShowFees, onGetStarted }: { lender: Lender; index: number; onShowFees: () => void; onGetStarted: () => void }) {
  return (
    <div className="rate-card" style={{ display: "flex", alignItems: "stretch", background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", animation: "cardFadeIn 0.3s ease both", animationDelay: `${index * 40}ms` }}>

      {/* Left sidebar */}
      <div style={{ width: 30, background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: 9, fontWeight: 800, letterSpacing: "0.12em", color: "#7c3aed", textTransform: "uppercase", userSelect: "none" }}>HELOC</span>
      </div>

      {/* Rate / APR */}
      <div style={{ padding: "16px 26px", minWidth: 210, flexShrink: 0 }}>
        <p style={valueStyle}>{lender.rate}% / {lender.apr}%</p>
        <p style={sublabelStyle}>Rate / APR</p>
        <button type="button" onClick={onShowFees} className="fees-link" style={{ display: "inline-block", marginTop: 5, fontSize: 11, fontWeight: 600, color: "var(--brand-link-color)", textDecoration: "none", background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "inherit" }}>
          Fees &amp; conditions
        </button>
      </div>

      {/* Loan amount */}
      <div style={{ padding: "16px 26px", flex: 1, minWidth: 0 }}>
        <p style={valueStyle}>{lender.loanAmountMin}–{lender.loanAmountMax}</p>
        <p style={sublabelStyle}>Loan amount</p>
      </div>

      {/* Monthly payment */}
      <div style={{ padding: "16px 26px", flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ ...valueStyle, margin: 0 }}>{lender.monthlyPayment}</p>
          <PaymentInfoIcon />
        </div>
        <p style={sublabelStyle}>Est. payment</p>
      </div>

      {/* Loan term */}
      <div style={{ padding: "16px 26px", flex: 1, minWidth: 0 }}>
        <p style={valueStyle}>{lender.loanTerm}</p>
        <p style={sublabelStyle}>Term</p>
      </div>

      {/* CTA — slides in on hover */}
      <div className="cta-cell" style={{ display: "flex", alignItems: "center", paddingRight: 20, paddingLeft: 8, flexShrink: 0 }}>
        <button type="button" onClick={onGetStarted} style={ctaStyle} onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--brand-cta-hover-bg)")} onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--brand-cta-bg)")}>
          Get started
          <ArrowRight size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

/* ── Controls: loan term tabs + sort by ── */
function ControlsBar({ activeTerm, onTermChange, sortBy, onSortChange }: { activeTerm: string | null; onTermChange: (t: string | null) => void; sortBy: string; onSortChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, gap: 12, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#475569", marginRight: 2, whiteSpace: "nowrap" }}>Loan term:</span>
        {LOAN_TERMS.map((term) => {
          const active = activeTerm === term;
          return (
            <button key={term} type="button" onClick={() => onTermChange(active ? null : term)} style={{ padding: "6px 14px", borderRadius: 6, border: "none", background: active ? "var(--brand-primary)" : "#f1f5f9", color: active ? "#ffffff" : "#475569", fontSize: 12, fontWeight: active ? 700 : 500, cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s ease, color 0.15s ease", whiteSpace: "nowrap" }} onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "#e2e8f0"; }} onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "#f1f5f9"; }}>
              {term}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>Sort By:</span>
        <div style={{ position: "relative" }}>
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} style={{ border: "none", background: "transparent", fontSize: 13, fontWeight: 600, color: "var(--brand-primary)", appearance: "none", paddingRight: 18, cursor: "pointer", fontFamily: "inherit", outline: "none" }}>
            <option value="lowest-apr">Low Rate</option>
            <option value="highest-amount">Highest Loan Amount</option>
          </select>
          <ChevronDown size={13} color="var(--brand-primary)" style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
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
  const [selectedFees, setSelectedFees] = useState<Lender | null>(null);
  const [selectedGetStarted, setSelectedGetStarted] = useState<Lender | null>(null);

  const displayed = useMemo(() => {
    const termFilter = activeTerm?.toLowerCase() ?? null;
    const filtered = termFilter
      ? lenders.filter((l) => l.loanTerm.toLowerCase() === termFilter)
      : lenders;
    return [...filtered].sort((a, b) => {
      if (sortBy === "lowest-apr") return parseFloat(a.apr) - parseFloat(b.apr);
      if (sortBy === "highest-amount") return parseMaxAmount(b.loanAmountMax) - parseMaxAmount(a.loanAmountMax);
      return 0;
    });
  }, [activeTerm, sortBy]);

  return (
    <>
      {selectedFees && <FeesModal lender={selectedFees} onClose={() => setSelectedFees(null)} />}
      {selectedGetStarted && <GetStartedModal lender={selectedGetStarted} onClose={() => setSelectedGetStarted(null)} />}

      <div>
        <ControlsBar activeTerm={activeTerm} onTermChange={setActiveTerm} sortBy={sortBy} onSortChange={setSortBy} />

        {displayed.length === 0 ? (
          <div style={{ padding: "48px 24px", textAlign: "center", color: "#64748b", fontSize: 14, fontWeight: 500, background: "#f8fafc", borderRadius: 8, border: "1px solid #e5e7eb" }}>
            No matching offers found.
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {(showAll ? displayed : displayed.slice(0, DEFAULT_VISIBLE)).map((lender, i) => (
                <Fragment key={lender.id}>
                  <RateCard
                    lender={lender}
                    index={i}
                    onShowFees={() => setSelectedFees(lender)}
                    onGetStarted={() => setSelectedGetStarted(lender)}
                  />
                  {i === 2 && (
                    <PersonalizeRateBanner
                      onGetStarted={() => setSelectedGetStarted(displayed[0])}
                    />
                  )}
                </Fragment>
              ))}
            </div>

            {displayed.length > DEFAULT_VISIBLE && (
              <button type="button" onClick={() => setShowAll((v) => !v)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", marginTop: 10, padding: "12px", background: "transparent", border: "1px dashed #cbd5e1", borderRadius: 8, color: "var(--brand-primary)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.01em", transition: "background 0.15s ease, border-color 0.15s ease" }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "var(--brand-primary-light)"; el.style.borderColor = "var(--brand-primary)"; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "transparent"; el.style.borderColor = "#cbd5e1"; }}>
                <ChevronDown size={15} style={{ transition: "transform 0.2s ease", transform: showAll ? "rotate(180deg)" : "rotate(0deg)" }} />
                {showAll ? "Show fewer options" : `See more rate options (${displayed.length - DEFAULT_VISIBLE} more)`}
              </button>
            )}
          </>
        )}

        <p style={{ marginTop: 16, fontSize: 11, color: "#64748b", lineHeight: 1.7, padding: "0 2px" }}>
          Rates shown are based on the personalized search criteria above. APR shown is for a $100,000 HELOC. Your actual rate may differ based on credit profile, loan-to-value ratio, and lender criteria. All rates as of{" "}
          {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
        </p>
      </div>
    </>
  );
}

/* ── Style constants ── */

const valueStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  color: "#111827",
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
  margin: 0,
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
  border: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",
  fontFamily: "inherit",
  letterSpacing: "0.01em",
  transition: "background 0.15s ease",
};
