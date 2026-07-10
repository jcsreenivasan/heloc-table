export interface LenderDetails {
  drawPeriod: string;
  repaymentPeriod: string;
  prepaymentPenalty: string;
  applicationFee: string;
  appraisalFee: string;
  annualFee: string;
  minCreditScore: string;
  maxLTV: string;
}

export interface Lender {
  id: number;
  productName: string;       // e.g. "Achieve Loans HELOC"
  lenderName: string;        // e.g. "Achieve Loans"
  logoInitials: string;      // e.g. "A"
  logoColor: string;         // brand hex color for logo placeholder
  nmls: string;
  rate: string;              // e.g. "5.625"
  apr: string;               // e.g. "5.630"
  loanTerm: string;          // e.g. "10 year"
  loanAmountMin: string;     // e.g. "$15K"
  loanAmountMax: string;     // e.g. "$700K"
  monthlyPayment: string;    // e.g. "$1,092/mo" — based on $100K loan
  score: number;             // e.g. 4.8
  ctaLabel?: string;         // override CTA text, defaults to "Next →"
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
    score: 4.8,
    details: {
      drawPeriod: "10 years",
      repaymentPeriod: "20 years",
      prepaymentPenalty: "None",
      applicationFee: "$0",
      appraisalFee: "$0",
      annualFee: "$0",
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
    score: 4.8,
    details: {
      drawPeriod: "10 years",
      repaymentPeriod: "25 years",
      prepaymentPenalty: "None",
      applicationFee: "$0",
      appraisalFee: "$0",
      annualFee: "$0",
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
    score: 4.5,
    details: {
      drawPeriod: "5 years",
      repaymentPeriod: "15 years",
      prepaymentPenalty: "None",
      applicationFee: "$0",
      appraisalFee: "$0 (automated)",
      annualFee: "$0",
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
    score: 4.5,
    details: {
      drawPeriod: "5 years",
      repaymentPeriod: "25 years",
      prepaymentPenalty: "None",
      applicationFee: "$0",
      appraisalFee: "$0 (automated)",
      annualFee: "$0",
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
    score: 4.6,
    details: {
      drawPeriod: "10 years",
      repaymentPeriod: "20 years",
      prepaymentPenalty: "None",
      applicationFee: "$0",
      appraisalFee: "Varies",
      annualFee: "$0",
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
    score: 4.7,
    details: {
      drawPeriod: "10 years",
      repaymentPeriod: "20 years",
      prepaymentPenalty: "None",
      applicationFee: "$65",
      appraisalFee: "$0",
      annualFee: "$65",
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
    score: 4.4,
    details: {
      drawPeriod: "10 years",
      repaymentPeriod: "20 years",
      prepaymentPenalty: "None",
      applicationFee: "$0",
      appraisalFee: "$0–$550",
      annualFee: "$99 (waived 1st yr)",
      minCreditScore: "660",
      maxLTV: "90%",
    },
  },
];
