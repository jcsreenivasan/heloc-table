export interface LenderDetails {
  drawPeriod: string;
  repaymentPeriod: string;
  prepaymentPenalty: string;
  applicationFee: string;
  appraisalFee: string;
  annualFee: string;
  originationFee: string;
  underwritingFee: string;
  totalUpfrontCosts: string;
  fundsAvailableIn: string;
  minCreditScore: string;
  maxLTV: string;
}

export interface Lender {
  id: number;
  productName: string;
  lenderName: string;
  logoInitials: string;
  logoColor: string;
  nmls: string;
  rate: string;
  apr: string;
  loanTerm: string;
  loanAmountMin: string;
  loanAmountMax: string;
  monthlyPayment: string;
  highlights: string[];
  score: number;
  ctaLabel?: string;
  details: LenderDetails;
}

export const lenders: Lender[] = [
  {
    id: 1,
    productName: "Achieve Loans HELOC",
    lenderName: "Achieve Loans",
    logoInitials: "A",
    logoColor: "#2563eb",
    nmls: "1810501",
    rate: "5.625",
    apr: "5.630",
    loanTerm: "10 year",
    loanAmountMin: "$15K",
    loanAmountMax: "$700K",
    monthlyPayment: "$1,092/mo",
    highlights: [
      "Consolidate high-interest debt into a single lower monthly payment",
      "Pre-qualify in minutes with no impact to your credit score",
      "No refinance required — access up to $700K of your equity",
    ],
    score: 4.8,
    details: {
      drawPeriod: "10 years",
      repaymentPeriod: "20 years",
      prepaymentPenalty: "None",
      applicationFee: "$0",
      appraisalFee: "$0",
      annualFee: "$0",
      originationFee: "$0",
      underwritingFee: "$0",
      totalUpfrontCosts: "$0",
      fundsAvailableIn: "7–10 business days",
      minCreditScore: "640",
      maxLTV: "85%",
    },
  },
  {
    id: 2,
    productName: "Achieve Loans HELOC",
    lenderName: "Achieve Loans",
    logoInitials: "A",
    logoColor: "#2563eb",
    nmls: "1810501",
    rate: "5.875",
    apr: "5.880",
    loanTerm: "15 year",
    loanAmountMin: "$15K",
    loanAmountMax: "$700K",
    monthlyPayment: "$837/mo",
    highlights: [
      "Consolidate high-interest debt into a single lower monthly payment",
      "Pre-qualify in minutes with no impact to your credit score",
      "No refinance required — access up to $700K of your equity",
    ],
    score: 4.8,
    details: {
      drawPeriod: "10 years",
      repaymentPeriod: "25 years",
      prepaymentPenalty: "None",
      applicationFee: "$0",
      appraisalFee: "$0",
      annualFee: "$0",
      originationFee: "$0",
      underwritingFee: "$0",
      totalUpfrontCosts: "$0",
      fundsAvailableIn: "7–10 business days",
      minCreditScore: "640",
      maxLTV: "85%",
    },
  },
  {
    id: 3,
    productName: "Figure HELOC",
    lenderName: "Figure",
    logoInitials: "FIG",
    logoColor: "#0f172a",
    nmls: "1717824",
    rate: "6.050",
    apr: "6.050",
    loanTerm: "10 year",
    loanAmountMin: "$15K",
    loanAmountMax: "$750K",
    monthlyPayment: "$1,113/mo",
    highlights: [
      "100% online application — no in-person visits required",
      "Some of the fastest funding in the industry",
      "Automated appraisal means no appraisal fee",
    ],
    score: 4.5,
    details: {
      drawPeriod: "5 years",
      repaymentPeriod: "15 years",
      prepaymentPenalty: "None",
      applicationFee: "$0",
      appraisalFee: "$0 (automated)",
      annualFee: "$0",
      originationFee: "$0",
      underwritingFee: "$0",
      totalUpfrontCosts: "$0",
      fundsAvailableIn: "As few as 5 business days",
      minCreditScore: "680",
      maxLTV: "90%",
    },
  },
  {
    id: 4,
    productName: "Figure HELOC",
    lenderName: "Figure",
    logoInitials: "FIG",
    logoColor: "#0f172a",
    nmls: "1717824",
    rate: "6.050",
    apr: "6.050",
    loanTerm: "15 year",
    loanAmountMin: "$15K",
    loanAmountMax: "$750K",
    monthlyPayment: "$847/mo",
    highlights: [
      "100% online application — no in-person visits required",
      "Some of the fastest funding in the industry",
      "Automated appraisal means no appraisal fee",
    ],
    score: 4.5,
    details: {
      drawPeriod: "5 years",
      repaymentPeriod: "25 years",
      prepaymentPenalty: "None",
      applicationFee: "$0",
      appraisalFee: "$0 (automated)",
      annualFee: "$0",
      originationFee: "$0",
      underwritingFee: "$0",
      totalUpfrontCosts: "$0",
      fundsAvailableIn: "As few as 5 business days",
      minCreditScore: "680",
      maxLTV: "90%",
    },
  },
  {
    id: 5,
    productName: "Spring EQ HELOC",
    lenderName: "Spring EQ",
    logoInitials: "SE",
    logoColor: "#059669",
    nmls: "2053823",
    rate: "6.250",
    apr: "6.280",
    loanTerm: "10 year",
    loanAmountMin: "$25K",
    loanAmountMax: "$500K",
    monthlyPayment: "$1,123/mo",
    highlights: [
      "Access up to 89.99% of your home's equity",
      "Flexible draw options with no prepayment penalties",
      "Loan amounts ranging from $25K to $500K",
    ],
    score: 4.6,
    details: {
      drawPeriod: "10 years",
      repaymentPeriod: "20 years",
      prepaymentPenalty: "None",
      applicationFee: "$0",
      appraisalFee: "Varies",
      annualFee: "$0",
      originationFee: "$0",
      underwritingFee: "$0",
      totalUpfrontCosts: "Varies by state",
      fundsAvailableIn: "14–21 business days",
      minCreditScore: "680",
      maxLTV: "89.9%",
    },
  },
  {
    id: 6,
    productName: "Third Federal HELOC",
    lenderName: "Third Federal",
    logoInitials: "TF",
    logoColor: "#dc2626",
    nmls: "449724",
    rate: "6.490",
    apr: "6.490",
    loanTerm: "10 year",
    loanAmountMin: "$10K",
    loanAmountMax: "$200K",
    monthlyPayment: "$1,135/mo",
    highlights: [
      "Rate match guarantee — we'll beat any competitor's rate",
      "Low-cost option with no closing costs on select products",
      "Family-owned lender serving customers since 1938",
    ],
    score: 4.7,
    details: {
      drawPeriod: "10 years",
      repaymentPeriod: "20 years",
      prepaymentPenalty: "None",
      applicationFee: "$65",
      appraisalFee: "$0",
      annualFee: "$65",
      originationFee: "$0",
      underwritingFee: "$0",
      totalUpfrontCosts: "$65",
      fundsAvailableIn: "21–30 business days",
      minCreditScore: "620",
      maxLTV: "80%",
    },
  },
  {
    id: 7,
    productName: "PenFed HELOC",
    lenderName: "PenFed Credit Union",
    logoInitials: "PF",
    logoColor: "#7c3aed",
    nmls: "401822",
    rate: "6.625",
    apr: "6.625",
    loanTerm: "20 year",
    loanAmountMin: "$25K",
    loanAmountMax: "$500K",
    monthlyPayment: "$753/mo",
    highlights: [
      "Open to everyone — no military affiliation required to join",
      "Competitive credit union rates with no hidden fees",
      "Annual fee waived for the first year",
    ],
    score: 4.4,
    details: {
      drawPeriod: "10 years",
      repaymentPeriod: "20 years",
      prepaymentPenalty: "None",
      applicationFee: "$0",
      appraisalFee: "$0–$550",
      annualFee: "$99 (waived 1st yr)",
      originationFee: "$0",
      underwritingFee: "$0",
      totalUpfrontCosts: "$99",
      fundsAvailableIn: "14–21 business days",
      minCreditScore: "660",
      maxLTV: "90%",
    },
  },
];
